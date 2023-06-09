import { useActions } from "../hooks/useAction";
import "./add-cell.css";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fa-sharp fa-solid fa-plus"></i>
          </span>
          <span>code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fa-sharp fa-solid fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
