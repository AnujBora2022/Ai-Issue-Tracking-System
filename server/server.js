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

app.use(cors());
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
