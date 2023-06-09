import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string, ev: any): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <MonacoEditor
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
