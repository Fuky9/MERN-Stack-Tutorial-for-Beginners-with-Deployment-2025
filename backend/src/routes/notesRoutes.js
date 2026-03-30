import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getOneNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getOneNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
