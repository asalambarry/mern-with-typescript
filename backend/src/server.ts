import MongoStore from "connect-mongo";
import cors from 'cors';
import "dotenv/config";
import express from 'express';
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import notesRoutes from './routes/notes';
import userRoutes from "./routes/users";
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

// Gestion de la session


//Vérifiez que les variables d'environnement nécessaires sont définies
// if (!process.env.SESSION_SECRET) {
// 	throw new Error('SESSION_SECRET is not defined in the environment variables');
// }

// if (!process.env.MONGO_CONNECTION_STRING) {
// 	throw new Error('MONGO_CONNECTION_STRING is not defined in the environment variables');
// }

// app.use(session({
// 	secret: process.env.SESSION_SECRET,
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		maxAge: 60 * 60 * 1000 // Cookie expirant après 1 heure
// 	},
// 	rolling: true, // Renouvelle la durée de vie du cookie à chaque requête
// 	store: MongoStore.create({
// 		mongoUrl: process.env.MONGO_CONNECTION_STRING,
// 		// collection: 'sessions' // Nom optionnel de la collection, par défaut c'est 'sessions'
// 	}),
// }));

app.use(session({
	secret: '1234', // Utilisez une chaîne secrète pour signer l'ID de session.
	resave: false, // N'enregistrez pas la session si elle n'a pas été modifiée
	saveUninitialized: false, // Ne créez pas de session jusqu'à ce que quelque chose soit stocké
	store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/' }), // Utilisation de MongoDB pour le stockage de session
	cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // Options pour les cookies
}));


app.use(cors());

// app.get('/notes', cors(), (req, res) => {
//   res.json({ notes: "Your notes data" });
// });


app.use("/users", userRoutes);

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