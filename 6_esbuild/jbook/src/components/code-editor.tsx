import MonacoEditor from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface CodeEditorProps {
  initialValue: string;
  onChange(
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ): void;
}



const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  return (
    <MonacoEditor
      onChange={onChange}
      // this will be the initial value, after initialization, value is not used anymore
      value={initialValue}
      language="javascript"
      height="500px"
      /*theme="dark"*/ options={{
        wordWrap: "on",
        // minimap: {enabled: false},
        // showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
