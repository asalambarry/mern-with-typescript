import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import * as NoteApi from '../src/network/notes_api';
import AddNoteDialog from "./components/AddNoteDialog";
import NoteCard from "./components/NoteCard";
import { Note } from "./models/note";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";

function App() {

    const [notes, setNotes] = useState<Note[]>([]);
    const [noteLoading, setNoteLoading] = useState<boolean>(true);
    const [errorLoading, setErrorLoading] = useState<boolean>(false);

    const [showAddNote, setShowAddNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

    useEffect(() => {
        async function loadNotes() {
            try {
                // const response = await fetch("http://localhost:8080/notes", {
                //     method: "GET",
                //     headers: { "Content-Type": "application/json" },
                // });
                // const note = await response.json();
                setErrorLoading(false);
                setNoteLoading(true);
                const note = await NoteApi.fetchNotes();
                setNotes(note);
            } catch (error) {
                console.log(error);
                // alert("Failed to load notes");
            } finally {
                setNoteLoading(false);
            }
        }
        loadNotes();
    }, []);

    async function deleteNote(note: Note) {
        try {

            await NoteApi.deleteNote(note._id);
            setNotes(notes.filter((n) => n._id !== note._id));
        } catch (error) {
            console.log(error);
            // alert("Failed to delete note");
        }
    }
    let noteGid =

        <Row xs={1} md={2} xl={3} className="g-4">
            {notes.map((note, index) => (
                <Col key={index}>
                    <NoteCard note={note} className={styles.note} onDeleteNoteClicked={deleteNote} onNoteClicked={setNoteToEdit} />
                </Col>
            ))}
        </Row>

    return (
        <Container className={styles.notesPage}>

            <Button onClick={() => setShowAddNote(true)} className={`mb-4 ${stylesUtils.blockCenter}`}>Add new note</Button>

            {noteLoading && <Spinner animation="border" variant='primary' />}

            {errorLoading && <div>Failed to load notes</div>}

            {!noteLoading && !errorLoading &&
                <>
                    {notes.length > 0 ? noteGid  : <div>No notes</div>}
                </>
            }

            {showAddNote && <AddNoteDialog onclose={() => setShowAddNote(false)} onSave={(newNote) => {
                setNotes([...notes, newNote]);
                setShowAddNote(false);
            }}
            />}

            {noteToEdit && <AddNoteDialog noteToEdit={noteToEdit} onclose={() => setNoteToEdit(null)} onSave={(updatedNote) => {
                setNotes(notes.map((note) => note._id === updatedNote._id ? updatedNote : note));
                setNoteToEdit(null);
            }}
            />}
        </Container>
    );
}

export default App;
