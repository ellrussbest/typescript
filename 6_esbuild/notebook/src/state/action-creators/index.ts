import { ActionType } from "../action-types";
import { /*Action,*/ Direction, DragCellAction } from "../actions";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
} from "../actions";
import { CellTypes } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string | null,
  type: CellTypes,
  content: string = ""
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type,
      content,
    },
  };
};

export const dragCell = (
  from_index: number,
  to_index: number,
  order: string[]
): DragCellAction => {
  const value = order[from_index];

  let arr: string[] = [];

  if (from_index === to_index)
    return {
      type: ActionType.DRAG_CELL,
      payload: order,
    };

  for (let i = 0; i < order.length; i++) {
    if (arr.length === order.length) break;

    if (i === from_index) {
      // ignore value
      continue;
    } else if (i === to_index) {
      if (from_index < to_index) {
        arr.push(order[i]);
        arr.push(value);
      } else {
        arr.push(value);
        arr.push(order[i]);
      }
    } else {
      arr.push(order[i]);
    }
  }

  return {
    type: ActionType.DRAG_CELL,
    payload: arr,
  };
};
