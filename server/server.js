import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./backend/config/db.js";

// 👇 match your plural route file names
import contactRoutes from "./backend/routes/contactRoutes.js";
import projectRoutes from "./backend/routes/projectRoutes.js";
import qualificationRoutes from "./backend/routes/qualificationRoutes.js";
import userRoutes from "./backend/routes/userRoutes.js";
import authRoutes from "./backend/routes/authRoutes.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true,
})
);
// test message
app.get("/", (req, res) => {
  res.send("COMP229 Portfolio Backend is running ✅");
});


app.use("/api/contact", contactRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/qualification", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ MongoDB connected & server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
