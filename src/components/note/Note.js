import React, { useContext, useState } from "react";
import "./note.css";
import NoteContext from "../../NoteContext";
import { MdDelete, MdCancelPresentation } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";

const Note = () => {
  const { notes, deleteNote, updateNote } =
    useContext(NoteContext);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState({ title: "", content: "" });

  const handleEditClick = (note) => {
    setEditingId(note._id);
    setEditNote({ title: note.title, content: note.content });
  };

  const handleSaveEdit = (id) => {
    console.log("Editing ID:", id);
    console.log("Edit Note State:", editNote);
    const updatedNote = { title: editNote.title, content: editNote.content };
    updateNote(id, updatedNote);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="container">
      <div className="note-container">
        
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note">
              {editingId === note._id ? (
                <>
                  <div className="note-edit-buttons">
                    <MdCancelPresentation
                      className="cancel-edit"
                      onClick={() => handleCancelEdit()}
                    />
                    <BsSave2
                      className="save-edit"
                      onClick={() => handleSaveEdit(note._id)}
                    />
                  </div>
                  <input
                    type="text"
                    value={editNote.title}
                    onChange={(e) => {
                      setEditNote({ ...editNote, title: e.target.value });
                    }}
                    className="edit-title"
                  />
                  <textarea
                    value={editNote.content}
                    onChange={(e) => {
                      setEditNote({ ...editNote, content: e.target.value });
                    }}
                    className="edit-content"
                  />
                </>
              ) : (
                <>
                  <div className="title">{note.title}</div>
                  <p className="content">{note.content}</p>
                  <div className="note-buttons">
                    <FaRegEdit
                      className="edit-button"
                      onClick={() => handleEditClick(note)}
                    />
                    <MdDelete
                      className="delete-button"
                      onClick={() => deleteNote(note._id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
};

export default Note;
