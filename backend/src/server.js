import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend's URL and port
  }),
);
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// Simple middleware for practice
// app.use((req, res, next) => {
//   console.log(`Used method: ${req.method} Used URL: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

// Connect to the database and then start the server
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("SERVER started on PORT:", PORT);
  });
});
