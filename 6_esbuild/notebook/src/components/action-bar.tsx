import "./action-bar.css";
import { useActions } from "../hooks/useAction";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span>
          <i className="fa-sharp fa-solid fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        <span>
          <i className="fa-sharp fa-solid fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span>
          <i className="fa-solid fa-trash"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
