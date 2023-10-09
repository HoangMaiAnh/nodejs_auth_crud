import express from "express";
require("dotenv").config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import initWebRoutes from "./routes/webRoutes";
import configViewEngine from "./configs/viewEngine";
import connectDB from "./configs/connectDB";
import { checkUser } from "./middlewares/authMiddleware";

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// public
app.use(express.static(path.join(__dirname, "public")));

// cookies
app.use(cookieParser());

// connect db
connectDB();

// routes
initWebRoutes(app);

// view engine
configViewEngine(app);

// port
const port = process.env.PORT || 4444;

// run server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
