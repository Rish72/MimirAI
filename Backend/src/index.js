import express from "express";
import dotenv from "dotenv";
import { getDataOfSite, getSummary } from "./controller/bookmark.controller.js";
import {connectDB} from "./db/db.js"
import authRoutes from "./auth.route.js"
import cookieParser  from "cookie-parser"
import jwtAuth from "./jwt.auth.js";

dotenv.config();
const app = express();
app.use(express.json());

//middlware 
app.use(cookieParser())

//auth routes
app.use("/auth", authRoutes)


app.post("/fetch-data", jwtAuth, getDataOfSite);

app.listen(3000, () => {
  connectDB();
  console.log("LISTENING");
});
