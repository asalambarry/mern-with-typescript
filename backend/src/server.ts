import "dotenv/config";
import express from 'express';
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import notesRoutes from './routes/notes';
// const port = 8080;

// app.get('/', (req, res) => {
//   res.send('Hello salam!');
// });

// app.get('/', async (req, res, next) => {
// 	try {
// 		// throw Error("This is an error!");
// 		const notes = await NoteModel.find().exec();
// 		res.status(200).json(notes);
// 	} catch (error) {
// 		next(error);
// 	}
// });
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/notes", notesRoutes);

app.use((req, res, next) => {
	next(createHttpError(404, "Endpoint not found........!"));
});

app.use((error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log(error);
	let errorMessage = "An error occurred!";
	let statusCode = 500;
	if (isHttpError(error)) {
		statusCode = error.status
		errorMessage = error.message;
	}
	// if (error instanceof Error) {
	// 	errorMessage = error.message;
	// }
	// res.status(500).json({ message: errorMessage });
	res.status(statusCode).json({ message: errorMessage });
})
const port = process.env.PORT

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
	.then(() => {
		console.log("Mongoose connected..........")

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch(console.error)


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });