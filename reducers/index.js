import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";
import screen from "./screen";
// (이전상태, action) 통해서  => 다음상태를 만들어냄.
const rootReducer = combineReducers({
  // Reducers 를 합침.
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
  screen,
});

export default rootReducer;
