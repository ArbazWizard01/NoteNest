import React, { useState, useCallback } from "react";
import "./nav.css";
import { FileAddOutlined } from "@ant-design/icons";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import NoteForm from "../noteForm/NoteForm";

const Nav = () => {
  const [isSlideOn, setIsSlideOn] = useState(false);

  const slideOn = useCallback(() => {
    setIsSlideOn((bool) => !bool);
  }, []);
  return (
    <>
      <div className={`note-form-container ${isSlideOn ? "form-slide" : ""}`}>
        <NoteForm />
      </div>
      <nav>
        <div className="web-name">
          <img
            className="logo"
            src="https://storage.googleapis.com/note-nest-data/images/NoteNest-logo.png"
            alt="logo"
          />
          <div className="nav-name">NoteNest</div>
        </div>
        <div className="nav-icons">
          <FileAddOutlined className="icon" onClick={slideOn} />
          <IoSearch className="icon" />
          <CgProfile className="icon" />
        </div>
      </nav>
    </>
  );
};

export default Nav;
