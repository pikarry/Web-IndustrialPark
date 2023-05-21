import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { authReducer, AuthState } from "./auth";
import { myInfoEpic, myInfoReducer, MyInfoState } from "./my-info";

const rootReducer = combineReducers<GlobalState>({
  auth: authReducer,
  myInfo: myInfoReducer,
});

const rootEpic = combineEpics(myInfoEpic);

const epicMiddleware = createEpicMiddleware();
const store = legacy_createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export interface GlobalState {
  auth: AuthState;
  myInfo: MyInfoState;
}

export default store;
