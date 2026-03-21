import React from 'react'
import Editor from "@monaco-editor/react";

function EditorPage() {
  const handlechange=(value)=>{
     console.log(value);
  }
  return (
      <Editor
        height="100%"
        defaultLanguage="javascript"
      defaultValue="// start coding..."
      theme="vs-dark"
      onChange={handlechange}
      />
  )
}

export default EditorPage
