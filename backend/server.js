import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/dbconnect/dbconfig.js";
import appointmentRoute from "./src/routes/appointmentRoute.js";
import adminRoute from "./src/routes/adminRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/admin',adminRoute);
app.use('/api',appointmentRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

dbConnect().then(()=>{
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
