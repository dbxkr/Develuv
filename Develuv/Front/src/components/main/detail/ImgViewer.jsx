import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

function ImgViewer({ imgRoute }) {
  return (
    <div>
      <img src={imgRoute} alt="" />
    </div>
  );
}

export default ImgViewer;
