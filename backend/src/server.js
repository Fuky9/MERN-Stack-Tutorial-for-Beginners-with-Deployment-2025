import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Middleware
app.use(express.json()); // this middleware will parse JSON bodies: req.body

// Simple middleware for practice
// app.use((req, res, next) => {
//   console.log(`Used method: ${req.method} Used URL: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("SERVER started on PORT:", PORT);
});
