import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";

import axios from "axios";
const initialState = {
  getMyInfoLoading: false, // 유저 정보 가져오기
  getMyInfoDone: false,
  getMyInfoError: null,

  logInLoading: false, // 로그인 시도중
  logInError: null,
  logInDone: false,

  signUpLoading: false, // 회원가입 시도중
  signUpError: null,
  signUpDone: false,

  logOutLoading: false, // 로그아웃 시도중
  logOutError: null,
  logOutDone: false,

  getUserInfoLoading: false,
  getUserInfoDone: false,
  getUserInfoError: null,

  isLoggedIn: false,
  me: null,
  user: null,
}; // 초기 상태 정의

export const getMyInfo = createAsyncThunk("user/getMyInfo", async (data) => {
  const response = await axios.get("/user");
  return response.data;
});
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (nickname) => {
    const response = await axios.get(`/user/${encodeURIComponent(nickname)}`);
    return response.data;
  }
);

export const logIn = createAsyncThunk("user/logIn", async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
});
export const logOut = createAsyncThunk("user/logOut", async (data) => {
  const response = await axios.get("/auth/logout");
  return response.data;
});
export const signUp = createAsyncThunk("user/signUp", async (data) => {
  const response = await axios.post("/user", data);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state, action) => {
      state.getMyInfoError = null;
      state.logInError = null;
      state.signUpError = null;
      state.logInError = null;
      state.getUserInfoError = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.user,
      }))
      .addCase(getMyInfo.pending, (state, action) => {
        state.getMyInfoLoading = true;
        state.getMyInfoDone = false;
        state.getMyInfoError = null;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.getMyInfoLoading = false;
        state.getMyInfoDone = true;
        state.getMyInfoError = null;
        state.isLoggedIn = action.payload ? true : false;
        state.me = action.payload ? action.payload : null;
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.getMyInfoError = action.error;
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.getUserInfoLoading = true;
        state.getUserInfoDone = false;
        state.getUserInfoError = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.getUserInfoLoading = false;
        state.getUserInfoDone = true;
        state.getUserInfoError = null;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.getUserInfoError = action.error;
      })
      .addCase(logIn.pending, (state, action) => {
        state.logInLoading = true;
        state.logInDone = false;
        state.logInError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.logInLoading = false;
        state.logInDone = true;
        state.logInError = null;
        state.me = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.logInLoading = false;
        state.logInDone = true;
        state.logInError = action.error;
      })
      .addCase(logOut.pending, (state, action) => {
        state.logOutLoading = true;
        state.logOutDone = false;
        state.logOutError = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.logOutLoading = false;
        state.logOutDone = true;
        state.logOutError = null;
        state.me = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.logOutLoading = false;
        state.logOutDone = true;
        state.logOutError = action.error;
      })
      .addCase(signUp.pending, (state, action) => {
        state.signUpLoading = true;
        state.signUpDone = false;
        state.signUpError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpLoading = false;
        state.signUpDone = true;
        state.signUpError = null;
        state.me = null;
        state.isLoggedIn = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpDone = true;
        state.signUpError = action.error;
      }),
});
export const { clearUserError } = userSlice.actions; // 액션 생성함수
export default userSlice.reducer; // 리듀서
