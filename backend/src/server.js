import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Production setup requires absolute path, so we need to get the current directory path

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Adjust this to match your frontend's URL and port
    }),
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// Simple middleware for practice
// app.use((req, res, next) => {
//   console.log(`Used method: ${req.method} Used URL: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

// Production setup

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // If no API route matches, serve the React app's index.html for client-side routing to work
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Connect to the database and then start the server
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("SERVER started on PORT:", PORT);
  });
});
