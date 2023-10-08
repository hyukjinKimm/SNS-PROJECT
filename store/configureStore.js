import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };
const configureStore = () => {
  const middlewares = [loggerMiddleware];
  const enhancer =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares)) // 배포용
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", // true 면 redux 에 관한 자세한 설명이 나옴. 개발할때는 true 가 코딩하기 편함.
});

export default wrapper;
