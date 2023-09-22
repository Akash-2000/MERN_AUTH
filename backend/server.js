import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
const port = process.env.PORT || 5000;
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();
//to access the req.body values
app.use(express.json());
9//to acces the form data
app.use(express.urlencoded({extended:true}))


app.use(cookieParser())

 app.use("/api/users", userRoutes);

app.get("/hello", (req, res) => {
  console.log("im ready")
  res.send("Server is ready");
});

 app.use(notFound);
 app.use(errorHandler);
app.listen(port, () => console.log("Server started on port" + port));
