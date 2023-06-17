import { useState, useEffect } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useAction";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <div>
      <Resizable direction="vertical">
        <div
          style={{
            height: "calc(100% - 10px)",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              value={cell.content}
              onChange={(value, ev) => {
                value !== undefined && updateCell(cell.id, value);
              }}
            />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
