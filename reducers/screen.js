export const initialState = {
  collapsed: false,
  selectedMenu: "HOME",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "COLLAPSED_EVENT":
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    case "CHANGE_MENU":
      return {
        ...state,
        selectedMenu: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
