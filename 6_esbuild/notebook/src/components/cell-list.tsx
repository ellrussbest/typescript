import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.cells);

  return (
    <div>
      {order.map((id) => (
        <CellListItem key={id} cell={data[id]} />
      ))}
    </div>
  );
};

export default CellList;
