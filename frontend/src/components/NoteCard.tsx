import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Note } from "../models/note";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
interface NoteProps {
    note: Note;
    className?: string;
    onDeleteNoteClicked: (note: Note) => void,
    onNoteClicked: (note: Note) => void,
}

const NoteCard = ({ note, className,  onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
    const { title, text, createdAt,  updatedAt } = note;
    let createdUpdatedText: string;

    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated : " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created : " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.noteCard} ${className}`} onClick={()=> onNoteClicked(note)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete className="text-muted ms-auto" onClick={(e)=>{
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    }}/>
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
                <Card.Footer className="text-muted">
                    {createdUpdatedText}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default NoteCard;
