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
    <div>
      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "15px",
          border: "1px solid black",
        }}
      >
        {view === "image" && <ImgViewer imgRoute={imgRoute} />}
        {view === "markdown" && (
          <MarkdownViewer
            lang={"python"}
            text={'print("hello wolrd")'}
            style={{ Height: "100%", overflow: "auto" }}
          />
        )}
        <button
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "transparent",
            color: "black",
          }}
          onClick={toggleView}
        >
          전환
        </button>
      </div>
    </div>
  );
}

export default ImgMdSwitch;
