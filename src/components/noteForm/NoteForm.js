import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import "./form.css"
import NoteContext from "../../NoteContext";
import { Button } from "antd";
// import TextArea from "antd/es/input/TextArea";

const NoteForm = () => {
  const { addNote } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!title.trim()) {
      alert("Title is required to add note!");
      return;
    }
    const newNote = {title, content, createdAt: new Date()};
    try{
      const response = await axios.post("http://localhost:8000/", newNote);
      if(response.status === 200){
        addNote(response.data.note);
        setTitle("");
        setContent("");
        alert("Note Added SuccessFully");
      }
    } catch(err) {
      console.error("Error adding Note", err)
      alert("Failed to add note, Try again later");
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
          <input 
            type="Text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="TITLE"
            required
          />
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write Your Note here..."
          />
          <Button onClick={handleSubmit}>Create Note</Button>
          
        </form>
    </>
  )
};

export default NoteForm;
