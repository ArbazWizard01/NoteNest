import React, { useContext } from "react";
import "./note.css";
import NoteContext from "../../NoteContext";

const Note = () => {
  const { notes, deleteNote } = useContext(NoteContext);
  console.log(deleteNote)
  return (
    <>
      <div className="note-container">
        {notes.map((note) => (
          <div key={note.id} className="note">
            {console.log(note.id)}
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Note;
