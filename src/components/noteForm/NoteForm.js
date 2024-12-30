import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import "./form.css";
import NoteContext from "../../NoteContext";
import Button from '@mui/material/Button';
import { IoMdArrowBack } from "react-icons/io";

// import TextArea from "antd/es/input/TextArea";

const NoteForm = () => {
  const { addNote, slideOn } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required to add note!");
      return;
    }
    const newNote = { title, content, createdAt: new Date() };
    try {
      const response = await axios.post("http://localhost:8000/", newNote);
      if (response.status === 200) {
        addNote(response.data.note);
        setTitle("");
        setContent("");
        alert("Note Added SuccessFully");
      }
    } catch (err) {
      console.error("Error adding Note", err);
      alert("Failed to add note, Try again later");
    }
    slideOn();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-btns">
          <Button variant="contained" onClick={slideOn}>cancel</Button>
          {/* <IoMdArrowBack className="form-cancel" onClick={slideOn} /> */}
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </div>
        <input
          type="Text"
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
      </form>
    </>
  );
};

export default NoteForm;
