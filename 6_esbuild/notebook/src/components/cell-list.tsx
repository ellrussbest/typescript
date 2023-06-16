import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cell-list-item";
import { BasicFunction } from "./test";

const CellList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.cells);

  return (
    <>
      <BasicFunction />
      {/* <div>
        {order.map((id) => (
          <CellListItem key={id} cell={data[id]} />
        ))}
      </div> */}
    </>
  );
};

export default CellList;
