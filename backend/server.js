import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import fooRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config.js';
import cartRouter from "./routes/CardRoute.js";
import orderRouter from "./routes/OrderRoute.js";
// App configuration
const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Corrected the cors usage

// DB connection
connectDB();

//api end point
// app.use("/api/food", fooRouter);
app.use("/api/instruments", fooRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// API route
app.get('/', (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
