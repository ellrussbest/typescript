import { useState, useEffect } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

export default function CodeCell() {
  const [input, setInput] = useState('console.log("Hello World")');
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <Resizable direction="vertical">
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              value={input}
              onChange={(value, ev) => {
                value !== undefined && setInput(value);
              }}
            />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
    </div>
  );
}
