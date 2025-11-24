import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

await sequelize.sync({ alter: true }).then(() => {
  console.log("Tables synced");
});

app.get("/", (req, res) => {
  res.send("Node + Express Server Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));