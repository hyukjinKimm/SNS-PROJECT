export const initialState = {
  collapsed: false,
  selectedMenu: "HOME",
  logInOrSignUp: true,
};

import { SIGN_UP_SUCCESS } from "./user";
export const COLLAPSED_EVENT = "COLLAPSED_EVENT";
export const CHANGE_MENU = "CHANGE_MENU";
export const CHANGE_LOGIN_TO_SIGN_UP = "CHANGE_LOGIN_TO_SIGN_UP";
export const CLICK_LOGIN_MENU = "CLICK_LOGIN_MENU";
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLAPSED_EVENT:
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    case CHANGE_MENU:
      return {
        ...state,
        selectedMenu: action.data,
        logInOrSignUp: true,
      };

    case CHANGE_LOGIN_TO_SIGN_UP:
      return {
        ...state,
        logInOrSignUp: !state.logInOrSignUp,
      };

    default:
      return state;
  }
};

export default reducer;
