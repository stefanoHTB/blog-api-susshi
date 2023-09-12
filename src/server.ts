require('dotenv').config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
const connectDB = require('./config/dbConn');


const port = process.env.PORT || 3000;

connectDB();

const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());


app.use("/api/blog", blogRoutes);


mongoose.connection.once('open', () => {
console.log('Connected to MongoDB');
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
