import { produce } from "immer";
export const initialState = {
  getUserLoading: false, // 유저 정보 가져오기
  getUserDone: false,
  getUserError: null,

  isLogInLoading: false, // 로그인 시도중
  isLogInError: null,
  isLogInDone: false,

  isSignUpLoading: false, // 회원가입 시도중
  isSignUpError: null,
  isSignUpDone: false,

  isLogOutLoading: false, // 로그아웃 시도중
  isLogOutError: null,
  isLogOutDone: false,

  loadProfileOwnerLoading: false,
  loadProfileOwnerDone: false,
  loadProfileOwnerError: null,

  isLoggedIn: false,
  me: null,
  profileOwner: null,
};
export const LOAD_PROFILE_OWNER_REQUEST = "LOAD_PROFILE_OWNER_REQUEST";
export const LOAD_PROFILE_OWNER_SUCCESS = "LOAD_PROFILE_OWNER_SUCCESS";
export const LOAD_PROFILE_OWNER_FAILURE = "LOAD_PROFILE_OWNER_FAILURE";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CLEAR_USER_ERROR = "CLEAR_USER_ERROR";
export const userRequestAction = () => {
  return {
    type: GET_USER_REQUEST,
  };
};
export const clearUserErrorAction = () => {
  return {
    type: CLEAR_USER_ERROR,
  };
};
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
export const loadProfileOwnerRequestAction = (nickname) => ({
  type: LOAD_PROFILE_OWNER_REQUEST,
  nickname,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_USER_ERROR:
        draft.getUserError = null;
        draft.isLogInError = null;
        draft.isSignUpError = null;
        draft.isLogInError = null;
        draft.loadProfileOwnerError = null;
        break;
      case GET_USER_REQUEST:
        draft.getUserLoading = true;
        draft.getUserDone = false;
        draft.getUserError = null;
        break;
      case GET_USER_SUCCESS:
        draft.getUserLoading = false;
        draft.getUserDone = true;
        draft.getUserError = null;
        draft.isLoggedIn = action.data ? true : false;
        draft.me = action.data ? action.data : null;
        break;
      case GET_USER_FAILURE:
        draft.isLoggedIn = false;
        draft.getUserError = action.error;
        break;
      case LOAD_PROFILE_OWNER_REQUEST:
        draft.loadProfileOwnerLoading = true;
        draft.loadProfileOwnerDone = false;
        draft.loadProfileOwnerError = null;
        break;
      case LOAD_PROFILE_OWNER_SUCCESS:
        draft.loadProfileOwnerLoading = false;
        draft.loadProfileOwnerDone = true;
        draft.loadProfileOwnerError = null;
        draft.profileOwner = action.data;
        break;
      case LOAD_PROFILE_OWNER_FAILURE:
        draft.loadProfileOwnerError = action.error;
        break;
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
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.isLoggedIn = false;

        draft.isLogInLoading = false;
        draft.isLogInError = action.error;
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
        draft.isLogOutError = action.error;
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
        draft.isSignUpError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
