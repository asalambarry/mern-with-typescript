import { NextFunction, Request, RequestHandler, Response } from 'express';
import NoteModel from '../models/notes';

// Pour recuperer toutes les notes
const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const notes = await NoteModel.find().exec();
		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};
// Pour recuperer une note
const getNoteId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	// const noteId = req.params.noteId;
	// try {
	// 	const note = await NoteModel.findById(noteId).exec();
	// 	res.status(200).json(note);
	// }
	// catch (error) {
	// 	next(error)
	// }
	const noteId = req.params.noteId;

	if (!noteId) {
		res.status(400).json({ message: "No note ID provided." });
		return;
	}

	try {
		const note = await NoteModel.findById(noteId).exec();
		if (!note) {
			res.status(404).json({ message: "Note not found!" });
			return;
		}
		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};
// Pour creer une note
const createNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const title = req.body.title;
	const text = req.body.text;
	try {
		const newNote = await NoteModel.create({ title: title, text: text });
		res.status(201).json(newNote);
	} catch (error) {
		next(error)
	}
};

export { createNote, getNoteId, getNotes };
