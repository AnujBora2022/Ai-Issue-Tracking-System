import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// import issueRoutes from "./routes/issueRoutes.js";


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-issue-tracking-system.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/issues", issueRoutes);
app.use("/comments", commentRoutes);
app.use("/ai", aiRoutes);

// routes
// app.use("/api/issues", issueRoutes);
connectDB();






app.get("/", (req, res) => {  
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});