import React, { useEffect, useState, useContext } from "react";
import "./form.css";
import NoteContext from "../../NoteContext";
import Button from "@mui/material/Button";
import { apiClient } from "../../apiClient";
// import { useDebounce } from "../../hooks/useDebounce"; // Import debounce hook

const NoteForm = () => {
  const {
    addNote,
    slideOn,
    updateNote,
    editingNote,
    setEditingNote,
    addedAlert,
    noTitleAlert,
  } = useContext(NoteContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [aiSuggestion, setAiSuggestion] = useState(""); 
  // const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  // Fetch AI suggestion when debouncedContent changes
  // useEffect(() => {
  //   if (debouncedContent.trim()) {
  //     fetchAiSuggestion(debouncedContent);
  //   } else {
  //     setAiSuggestion("");
  //   }
  // }, [debouncedContent]);

  // const fetchAiSuggestion = async (text) => {
  //   try {
  //     const response = await apiClient.post("/", {
  //       userInput: text,
  //     });

  //     if (response.status === 200) {
  //       setAiSuggestion(response.data.response); // Update suggestion
  //     }
  //   } catch (err) {
  //     console.error("Error fetching AI prediction:", err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingNote) {
      const updatedNote = {
        title: title,
        content: content,
        updatedAt: new Date(),
      };
      updateNote(editingNote._id, updatedNote);
      setTitle("");
      setContent("");
      setEditingNote(null);
    } else {
      if (!title.trim()) {
        noTitleAlert();
        slideOn();
        return;
      }
      const newNote = { title, content, createdAt: new Date() };
      try {
        const response = await apiClient.post("/", newNote);
        if (response.status === 200) {
          addNote(response.data.note);
          setTitle("");
          setContent("");
          addedAlert();
        }
      } catch (err) {
        console.error("Error adding Note", err);
        alert("Failed to add note, Try again later");
      }
    }
    slideOn();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-btns">
          <Button
            style={{ backgroundColor: "gray" }}
            variant="contained"
            onClick={() => {
              slideOn();
              setEditingNote(null);
            }}
          >
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            {editingNote ? "Update Note" : "Add Note"}
          </Button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write Your Note here..."
        />
        
        {/* {aiSuggestion && (
          <div className="ai-suggestion">
            <strong>Suggestion:</strong> {aiSuggestion}
          </div>
        )} */}
      </form>
    </>
  );
};

export default NoteForm;
