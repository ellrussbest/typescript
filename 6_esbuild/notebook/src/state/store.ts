import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";
import defaultCellValue from "../utils/defaultCellValue";

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
    content: "# Markdown Editor, Click to Edit",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
    content: defaultCellValue,
  },
});