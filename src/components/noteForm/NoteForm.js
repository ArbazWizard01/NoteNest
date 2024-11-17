import React from "react";
import { useState, useContext } from "react";
import "./form.css"
import NoteContext from "../../NoteContext";
import { Button } from "antd";
// import TextArea from "antd/es/input/TextArea";

const NoteForm = () => {
  const { addNote } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title.trim()) {
      alert("Title is required to add note!");
      return;
    }
    addNote({title, content});
    setTitle('');
    setContent('');
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
