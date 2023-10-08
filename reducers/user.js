export const initialState = {
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpDate: {},
  loginData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        me: action.data,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        me: null,
      };
    case "SIGNUP_REQUEST":
      return {
        ...state,
        me: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
