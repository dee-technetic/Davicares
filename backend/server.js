import express from "express";
import httpstatus from "http-status";
import dotenv from "dotenv";
import { dbConnect } from "./src/dbconnect/dbconfig.js";
import appointmentRoute from "./src/routes/appointmentRoute.js";
import adminRoute from "./src/routes/adminRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/admin',adminRoute);
app.use('/api',appointmentRoute);

app.get("/", (req, res) => {
  res
    .status(httpstatus.OK)
    .json({ status: "200", message: "Welcome to Davicares API" });
});

dbConnect().then(()=>{
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
