import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
import post from "./post";
import user from "./user";
import screen from "./screen";
axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    user,
    post,
    screen,
    // 여기에 추가
  })(state, action);
};
//cotak.tistory.com/164 [TaxFree:티스토리]

export default rootReducer;
