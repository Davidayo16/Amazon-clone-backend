import express from "express";
import products from "./Data/Product.js";
import dotenv from "dotenv";
import connectDatabase from "./Config/MongoDb.js";
import importData from "./DataImport.js";
import productRoute from "./Routes/ProductRoute.js";
import morgan from "morgan";
import { notFound } from "./Middleware/Error.js";
import { errorHandler } from "./Middleware/Error.js";
import userRoute from "./Routes/UserRoute.js";
import categoryRoute from "./Routes/CategoryRoute.js";
import orderRouter from "./Routes/OrderRoute.js";
import stripeRouter from "./Routes/Stripe.js";
import blogRoute from "./Routes/BlogRoute.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

dotenv.config();

const app = express();
app.use(cors());

app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/import", importData);
app.use("/api/products", productRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/orders", orderRouter);
app.use("/api/stripe", stripeRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// Catch-all route handler for non-API routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 1000;
const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URL);
    app.listen(PORT, console.log(`server is running on port ${PORT}.......`));
    console.log("Database connected");
    console.log("Directory:", path.join(__dirname, "..", "frontend", "build"));
  } catch (error) {
    console.log(error);
  }
};
start();
