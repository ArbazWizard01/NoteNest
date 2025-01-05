import React, { createContext, useState, useEffect, useCallback } from "react";
import { apiClient } from "./apiClient";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isSlideOn, setIsSlideOn] = useState(false);

  const getNotes = async () => {
    try {
      const response = await apiClient.get("/");
      console.log("API Response:", response.data);
      if (response.status === 200 && Array.isArray(response.data)) {
        setNotes(response.data);
      } else if (response.data.notes) {
        setNotes(response.data.notes || []);
      } else {
        console.error("Unexpected API response format");
        setNotes([]);
      }
    } catch (err) {
      console.error("Error getting notes:", err);
      setNotes([]);
    }
  };

  const addNote = (note) => {
    setNotes((prevNotes = []) => [...prevNotes, note]);
  };

  const deleteNote = async (id) => {
    try {
      const response = await apiClient.delete(`/${id}`);
      console.log("Delete Response:", response.data); // Add this line to check the response from the server
      if (response.status === 200) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        alert("Note is Deleted Successfully");
      }
    } catch (err) {
      console.error("Error Deleting Note: ", err);
      alert("Failed to delete note, try again later!");
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await apiClient.put(`/${id}`, updatedNote);
      if (response.status === 200) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, ...updatedNote } : note
          )
        );
        alert("Note updated successfully");
      }
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note! Try again later!");
    }
  };
  
  const slideOn = useCallback(() => {
    setIsSlideOn((bool) => !bool);
  }, []);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, slideOn, isSlideOn }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
