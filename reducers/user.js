export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isSignUpIng: false, // 회원가입 시도중
  isLoggingOut: false, // 로그아웃 시도중
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
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "gugugu", id: 1 },
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggedIn: false,
        me: null,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSignUpIng: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignUpIng: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSignUpIng: false,
      };

    default:
      return state;
  }
};

export default reducer;
