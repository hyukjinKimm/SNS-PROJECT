export const initialState = {
  collapsed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "COLLAPSED_EVENT":
      return {
        ...state,
        collapsed: !state.collapsed,
      };

    default:
      return state;
  }
};

export default reducer;
