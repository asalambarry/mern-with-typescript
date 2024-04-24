import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import * as NoteApi from "../network/notes_api";
import { NoteInputProps } from "../network/notes_api";
interface AddNoteDialogProps {
	onclose: () => void;
	onSave: (note : Note) => void;
	noteToEdit?: Note;
}

const AddNoteDialog = ({ onclose, onSave, noteToEdit }: AddNoteDialogProps) => {

	const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<NoteInputProps>({
		defaultValues: {
			title: noteToEdit?.title || "",
			text: noteToEdit?.text || "",
		}
	});


	async function onSubmit(data: NoteInputProps) {
		try {
			// Pour la sumission de notre formulaire avec modif de la note
			let newResponse: Note;
			if(noteToEdit) {
				newResponse = await NoteApi.updateNote(noteToEdit._id, data);
				onSave(newResponse);
				return;
			}else{
				newResponse = await NoteApi.createNote(data);
			}
			const noteResponse = await NoteApi.createNote(data);
			onSave(noteResponse);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Modal show onHide={onclose}>
			<Modal.Header closeButton>
				<Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="nb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter title"
							isInvalid={!!errors.title}
							{...register("title", {required: "Title is required"})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.title?.message}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="nb-3">
						<Form.Label>Text</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter text"
							{...register("text")}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button type="submit" form="addNoteForm" disabled={isSubmitting} variant="primary">Save</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default AddNoteDialog;
