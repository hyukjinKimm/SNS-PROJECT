import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  collapsed: false,
  selectedMenu: "HOME",
  logInOrSignUp: true,
}; // 초기 상태 정의

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    collapsed: (state, action) => {
      state.collapsed = !state.collapsed;
    },
    changeMenu: (state, action) => {
      state.selectedMenu = action.payload;
      state.logInOrSignUp = true;
    },
    changeLogInToSignUp: (state, action) => {
      state.logInOrSignUp = !state.logInOrSignUp;
    },
  },
});
export const { collapsed, changeMenu, changeLogInToSignUp } =
  screenSlice.actions; // 액션 생성함수
export default screenSlice.reducer; // 리듀서
