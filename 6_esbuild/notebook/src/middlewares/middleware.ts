// in this file we will see the default structure of how a middleware should look like
// spoiler alert, middle ware should return a function... hehe
// middlewares will allow us to intercept some actions and we can dispatch the necessary
// payloads to different states that need to use the action.

import { Middlware } from "./middlewareTypeDefinition";

export const middleware: Middlware = (store) => {
  // store can be accessed at all the three levels
  return (next) => {
    // next() => which returns void
    // at this level, we can call as many nexts as we like
    // before we dispatch an action
    return (action) => {
      // we can dispatch an action here
    };
  };
};

// export const middleware_2 = (store) => {
//   return async () => {};
// };
let timer: any;

export const implementMiddleware: Middlware = ({ getState }) => {
  return (next) => {
    return (action) => {
      next(action);

      // checks
      // if (action.type !== ActionType.UPDATE_CELL) return
      // const {
      //   cells: { data },
      // } = getState();
      // const cell = data[action.payload.id]
      // if (cell.type === 'text') return

      clearTimeout(timer);

      timer = setTimeout(async () => {
        // bundling code goes here
        console.log("Timer expired");
      }, 750);
    };
  };
};
