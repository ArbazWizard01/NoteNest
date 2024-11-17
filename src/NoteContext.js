import React, { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);


  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, {...note, id: Date.now()}]);
  };

  const deleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((item) => item.id !== index));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext