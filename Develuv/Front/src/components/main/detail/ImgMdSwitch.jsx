import React, { useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import ImgViewer from "./ImgViewer";

function ImgMdSwitch({ imgRoute }) {
  const [view, setView] = useState("image"); // 초기 상태는 'image'
  const [text, setText] = useState("");

  const toggleView = () => {
    setView((prevView) => (prevView === "image" ? "markdown" : "image"));
  };
  return (
    <div
      style={{
        width: "180px",
        height: "180px",
        borderRadius: "15px",
        border: "1px solid black",
      }}
      onClick={toggleView}
    >
      {view === "image" && (
        <img
          src={imgRoute}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
            border: "1px solid black",
          }}
          alt="User Profile"
          onContextMenu={(event) => {
            event.preventDefault();
          }}
        />
      )}
      {view === "markdown" && (
        <MarkdownViewer
          lang={"python"}
          text={'print("hello wolrd")'}
          style={{ Height: "100%", overflow: "auto" }}
        />
      )}
    </div>
  );
}

export default ImgMdSwitch;
