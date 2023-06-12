import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState<any>("**Hello world!!!**");

  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
};

export default TextEditor;
