import express from 'express';
import * as NotesController from '../controllers/notesControllers';


const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNoteId);

router.post("/", NotesController.createNote);

export default router;
