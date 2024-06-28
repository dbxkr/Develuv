import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

function MarkDownViewer({ lang, text }) {
  return (
    <div>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, "")}
                style={prism}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {`\`\`\`${lang}\n${text}`}
      </ReactMarkdown>
    </div>
  );
}
export default MarkDownViewer;
