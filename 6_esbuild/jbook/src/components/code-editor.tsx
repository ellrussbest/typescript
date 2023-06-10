import "./code-editor.css";
import MonacoEditor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { format } from "prettier";
import * as parser from "prettier/parser-babel";
import { useCallback, useEffect, useState } from "react";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";


interface CodeEditorProps {
  value: string;
  onChange(
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const [formatted, setFormatted] = useState<string>(value);

  useEffect(() => {
    setFormatted(value);
  }, [value]);

  const onFormatClick = useCallback(() => {
    setFormatted(
      format(formatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        // singleQuote: true,
      }).replace(/\n$/, "")
    );
  }, [formatted]);

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={onChange}
        value={formatted}
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
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
