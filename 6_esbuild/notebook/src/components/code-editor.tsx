import "./code-editor.css";
// import "./styntax.css";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { format } from "prettier";
import * as parser from "prettier/parser-babel";
import { useCallback, useEffect, useState } from "react";
import Highlighter from "monaco-jsx-highlighter";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

interface CodeEditorProps {
  value: string;
  onChange(
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ): void;
}
type Monaco = typeof monaco;

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const [formatted, setFormatted] = useState<string>(value);
  const [isCtrl, setIsCtrl] = useState(false);

  useEffect(() => {
    setFormatted(value);
  }, [value]);

  function onMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco): void {
    const highlighter = new Highlighter(monaco, parse, traverse, editor);
    highlighter.highlightOnDidChangeModelContent();
    highlighter.addJSXCommentCommand();
  }

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

  useEffect(() => {
    document.onkeyup = (e) => {
      if (e.keyCode === 17) setIsCtrl(false);
    };

    document.onkeydown = (e) => {
      if (e.keyCode === 17) setIsCtrl(true);
      if (e.keyCode === 83 && isCtrl === true) {
        onFormatClick();
        return false;
      }
    };
  }, [isCtrl, onFormatClick]);

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onMount}
        onChange={onChange}
        value={formatted}
        language="javascript"
        height="100%"
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
