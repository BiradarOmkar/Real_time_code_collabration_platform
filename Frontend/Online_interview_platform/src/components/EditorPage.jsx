import React from 'react'
import Editor from "@monaco-editor/react";

function EditorPage({code,setCode}) {
  return (
      <Editor
        height="100%"
        defaultLanguage="javascript"
      defaultValue="// start coding..."
      theme="vs-dark"
      value={code}
      onChange={(val)=>setCode(val)}
      />
  )
}
export default EditorPage
