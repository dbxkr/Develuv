import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

function MarkdownEditor({ lang, text, onChange }) {
  const [code, setCode] = useState(text);

  const handleChange = (e) => {
    const newText = e.target.value;
    setCode(newText);
    onChange(newText); // 부모 컴포넌트에 변경된 코드 전달
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={handleChange}
        style={{ width: '100%', height: '200px', fontFamily: 'monospace' }}
      />
      <SyntaxHighlighter language={lang} style={prism}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default MarkdownEditor;
