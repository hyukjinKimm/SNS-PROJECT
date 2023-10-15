export const initialState = {
  isLoggedIn: false,
  me: null,
};

export const logInAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
export const logOutAction = () => {
  return {
    type: "LOG_OUT",
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: { id: 1, ...action.data },
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };

    default:
      return state;
  }
};

export default reducer;
