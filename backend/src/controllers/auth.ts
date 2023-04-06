import type { Errback, Request, Response } from "express";
import { Customer } from "../models/customer";
import bycrypt from "bcrypt";

export const CustomerSignup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // handle existing customer
    const isExistingCustomer = await Customer.findOne({ username });
    if (isExistingCustomer) {
      return res.status(400).json({ error: "username already exists" });
    }

    // create new customer
    const customer = new Customer({ username, password });
    await customer.save();
    const token = customer.generateAuthToken();
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const CustomerLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // handle non-existing customer
    const customer = await Customer.findOne({ username });
    if (!customer) {
      return res.status(400).json({ error: "invalid username or password" });
    }

    // check password
    const passwordMatch = await bycrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "invalid username or password" });
    }

    // generate & return token
    const token = customer.generateAuthToken();
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const EmployeeSignup = async (req: Request, res: Response) => {
  return;
};

export const EmployeeLogin = async (req: Request, res: Response) => {
  return;
};
