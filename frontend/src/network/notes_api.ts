import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
	const response = await fetch(input, init);
	if (response.ok) {
		return response
	} else {
		const errorBody = await response.json();
		const errorMesssage = errorBody.console.error;
		throw Error(errorMesssage);
	}
}

export async function fetchNotes(): Promise<Note[]> {
	const response = await fetchData("http://localhost:8080/notes", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	return response.json();
}

export interface NoteInputProps {
	title: string;
	text?: string;

}

export async function createNote(note: NoteInputProps): Promise<Note> {
	const response = await fetchData("http://localhost:8080/notes", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
	return response.json();
}

export async function deleteNote(noteId: string): Promise<void> {
	try {
		const response = await fetch(`http://localhost:8080/notes/${noteId}`, {
			method: "DELETE"
		});

		if (!response.ok) {
			const errorResponse = await response.text(); // Utilisez text() si la réponse pourrait ne pas être du JSON
			throw new Error(`Failed to delete note: ${errorResponse}`);
		}

		// Logique supplémentaire si nécessaire, ex. mise à jour de l'état local
	} catch (error) {
		console.error(error);
		// Logique de gestion des erreurs
	}
}

export async function updateNote(noteId: string, note: NoteInputProps): Promise<Note> {
	const response = await fetchData(`http://localhost:8080/notes/${noteId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
	return response.json();
}