import { React, useContext } from "react";
import "./App.css";
import NoteForm from "./components/noteForm/NoteForm";
import Note from "./components/note/Note";
import NoteContext from "./NoteContext";
import PopAlerts from "./PopAlerts";
import { MdAddBox } from "react-icons/md";


function App() {
  const { isSlideOn, slideOn } = useContext(NoteContext);
  return (
    <div className="App">
      <div className="web-name">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/NoteNest-logo.png"}
          alt="logo"
        />
        <div className="nav-name">NoteNest</div>
      </div>
      <div className={`note-form-container ${isSlideOn ? "form-slide" : ""}`}>
        <NoteForm />
      </div>
      <Note />
      <MdAddBox className="add-note" onClick={slideOn} />
      <PopAlerts />
    </div>
  );
}

export default App;
