import { RootState } from "../state";
import { Action } from "../state/actions";

interface MiddlewareAPI<S, A> {
  getState(): S;
  dispatch(action: A): void;
}

interface _Middleware<S, A> {
  (api: MiddlewareAPI<S, A>): (
    next: (action: A) => void
  ) => (action: A) => void;
}

export type Middlware = _Middleware<RootState, Action>;
