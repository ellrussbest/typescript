import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/useAction";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(value) =>
            typeof value === "string" && updateCell(cell.id, value)
          }
        />
      </div>
    );
  }

  return (
    <div className="card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <div className="content">
          <MDEditor.Markdown
            source={
              cell.content === "" ? "# Click to Start Editing" : cell.content
            }
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
