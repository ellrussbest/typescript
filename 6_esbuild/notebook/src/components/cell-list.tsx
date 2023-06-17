import { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.cells);

  return (
    <div>
      {/* {order.map((id) => (
        <Fragment key={id}>
          <AddCell nextCellId={id} />
          <CellListItem cell={data[id]} />
        </Fragment>
      ))}
      <AddCell forceVisible={order.length === 0} nextCellId={null} /> */}

      {Array.from({ length: order.length + 1 }, (i, j) => {
        return (
          <Fragment key={j}>
            {order[j] !== undefined ? (
              <>
                <AddCell nextCellId={order[j]} />
                <CellListItem cell={data[order[j]]} />
              </>
            ) : (
              <AddCell forceVisible={order.length === 0} nextCellId={null} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default CellList;
