import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
import post from "./post";
import user from "./user";
import screen from "./screen";
import { BACK_URL, FRONT_URL } from "../url";

axios.defaults.baseURL = BACK_URL;
axios.defaults.withCredentials = true;
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        screen,
      });
      return combinedReducer(state, action);
    }
  }
};

//cotak.tistory.com/164 [TaxFree:티스토리]

export default rootReducer;
