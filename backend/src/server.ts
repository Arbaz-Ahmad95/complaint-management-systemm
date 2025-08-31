import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import complaintRoutes from "./routes/complaints";

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on this port ${PORT}`);
});
