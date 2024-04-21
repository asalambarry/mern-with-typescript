import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
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
		if(!mongoose.isValidObjectId(noteId)){
			throw createHttpError(400, "ID n'existe pas !");
		}
		const note = await NoteModel.findById(noteId).exec();
		// if (!note) {
		// 	res.status(404).json({ message: "Note not found!" });
		// 	return;
		// }
		if(!note){
			throw createHttpError(404, "Note not found!");
		}
		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};
// Pour creer une note
interface CreateNoteInterface {
	title?: string;
	text?: string;
}
const createNote: RequestHandler<unknown, unknown, CreateNoteInterface, unknown> = async (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;
	try {
		if(!title){
			throw createHttpError(400, "Title is required!");
		}
		const newNote = await NoteModel.create({ title: title, text: text });
		res.status(201).json(newNote);
	} catch (error) {
		next(error)
	}
};

export { createNote, getNoteId, getNotes };
