import { produce } from "immer";
export const initialState = {
  isLogInLoading: false, // 로그인 시도중
  isLogInError: null,
  isLogInDone: false,

  isSignUpLoading: false, // 회원가입 시도중
  isSignUpError: null,
  isSignUpDone: false,

  isLogOutLoading: false, // 로그아웃 시도중
  isLogOutError: null,
  isLogOutDone: false,

  isLoggedIn: false,
  me: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const logInRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const logOutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.isLogInLoading = true;
        draft.isLogInDone = false;
        draft.isLogInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.isLogInLoading = false;
        draft.isLogInDone = true;
        draft.isLogInError = null;
        draft.isLoggedIn = true;
        draft.me = { ...action.data, nickname: "gugugu", id: 1 };
        break;
      case LOG_IN_FAILURE:
        draft.isLoggedIn = false;

        draft.isLogInLoading = false;
        draft.isLogInError = action.data;
        draft.isLogInDone = true;
        break;
      case LOG_OUT_REQUEST:
        draft.isLogOutLoading = true;
        draft.isLogOutDone = false;
        draft.isLogOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.isLogOutLoading = false;
        draft.isLogOutDone = true;
        draft.isLogOutError = null;
        draft.me = null;
        draft.isLoggedIn = false;
        break;

      case LOG_OUT_FAILURE:
        draft.isLogOutLoading = false;
        draft.isLogOutDone = true;
        draft.isLogOutError = action.data;
        break;
      case SIGN_UP_REQUEST:
        draft.isSignUpLoading = true;
        draft.isSignUpDone = false;
        draft.isSignUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.isSignUpLoading = false;
        draft.isSignUpDone = true;
        draft.isSignUpError = null;
        break;
      case SIGN_UP_FAILURE:
        draft.isSignUpLoading = false;
        draft.isSignUpDone = true;
        draft.isSignUpError = action.data;
        break;

      default:
        break;
    }
  });
};

export default reducer;
