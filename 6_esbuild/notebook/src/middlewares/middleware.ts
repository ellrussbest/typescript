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
