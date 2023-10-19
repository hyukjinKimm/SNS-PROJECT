export const initialState = {
  collapsed: false,
  selectedMenu: "HOME",
  logInOrSignUp: true,
};

import { produce } from "immer";
import { SIGN_UP_SUCCESS } from "./user";
export const COLLAPSED_EVENT = "COLLAPSED_EVENT";
export const CHANGE_MENU = "CHANGE_MENU";
export const CHANGE_LOGIN_TO_SIGN_UP = "CHANGE_LOGIN_TO_SIGN_UP";
export const CLICK_LOGIN_MENU = "CLICK_LOGIN_MENU";
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case COLLAPSED_EVENT:
        draft.collapsed = !draft.collapsed;
        break;
      case CHANGE_MENU:
        draft.selectedMenu = action.data;
        draft.logInOrSignUp = true;
        break;
      case CHANGE_LOGIN_TO_SIGN_UP:
        draft.logInOrSignUp = !draft.logInOrSignUp;
        break;

      default:
        break;
    }
  });
};

export default reducer;
