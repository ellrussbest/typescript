import { swapDown, swapUp } from "../../utils/swap";
import { v4 as uuid } from "uuid";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  let { data, order } = state;
  let cell: Cell;
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      cell = data[action.payload.id];
      cell = { ...cell, content: action.payload.content };
      data = { ...data, [action.payload.id]: cell };
      return { ...state, data };
    case ActionType.DELETE_CELL:
      delete data[action.payload];
      order = order.filter((id) => id !== action.payload);
      return { ...state, data, order };
    case ActionType.MOVE_CELL:
      if (action.payload.direction === "up") {
        order = swapUp(action.payload.id, order);
      } else {
        order = swapDown(action.payload.id, order);
      }
      return { ...state, order };
    case ActionType.INSERT_CELL_BEFORE:
      const id = uuid();
      cell = {
        id,
        type: action.payload.type,
        content: action.payload.content ?? "",
      };

      if (action.payload.id === null) {
        order.push(id);
      } else {
        const index = order.indexOf(action.payload.id);
        index !== -1 && order.splice(index, 0, id);
      }

      data = { ...data, [id]: cell };
      return { ...state, data, order };
    case ActionType.DRAG_CELL:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default reducer;
