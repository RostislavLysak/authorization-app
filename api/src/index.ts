import "dotenv/config";
import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import errorMiddleware from "./middlewares/error-middleware";

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "");

    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
