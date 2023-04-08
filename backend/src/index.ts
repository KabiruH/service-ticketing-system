import express, { type Request, type Response } from "express";
import "dotenv/config";
import { json } from "body-parser";
import { AuthRouter } from "./routes/auth";
import { connectDB } from "./db/connect";
import { RequestFormRouter } from "./routes/requestForm";
import { TasksRouter } from "./routes/tasks";

const app = express();
app.use(json());

// enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes

app.use("/welcome/api", (req: Request, res: Response) => {
  res.send(
    "Welcome to the Service Ticketing System API! Refer to the DOCS here: https://documenter.getpostman.com/view/22237577/2s93RZNqMd"
  );
});

app.use("/auth", AuthRouter);
app.use("/customer", RequestFormRouter);
app.use("/tasks", TasksRouter);

const start = async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB(process.env.MONGODB_URI as string);
    console.log("Connected to DB!");

    app.listen(3000, () => {
      console.log("server is listening on port 3000!");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
