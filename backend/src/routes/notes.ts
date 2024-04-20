import { NextFunction, Request, RequestHandler, Response } from 'express';
import NoteModel from '../models/notes';

const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const notes = await NoteModel.find().exec();
		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};
