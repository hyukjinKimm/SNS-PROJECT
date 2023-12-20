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

  followLoading: false,
  followError: null,
  followDone: false,

  getUserInfoLoading: false,
  getUserInfoDone: false,
  getUserInfoError: null,

  addProfileImageLoading: false,
  addProfileImageDone: false,
  addProfileImageError: null,

  profileEditLoading: false,
  profileEditDone: false,
  profileEditError: null,

  signOutLoading: false,
  signOutDone: false,
  signOutError: null,

  emailCheckLoading: false,
  emailCheckDone: false,
  emailCheckError: null,

  emailVarificationLoading: false,
  emailVarificationDone: false,
  emailVarificationError: null,

  isLoggedIn: false,
  me: null,
  profileImagePath: "",
  user: null,
}; // 초기 상태 정의

export const emailVarification = createAsyncThunk(
  "user/emailVarification",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/emailVarification", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const emailCheck = createAsyncThunk(
  "user/emailCheck",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/emailCheck", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (nickname, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${encodeURIComponent(nickname)}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/logout");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const signOut = createAsyncThunk(
  "user/signOut",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/signout", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const Follow = createAsyncThunk(
  "user/follow",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/user/${id}/follow`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const unFollow = createAsyncThunk(
  "user/unfollow",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/user/${id}/unfollow`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addProfileImage = createAsyncThunk(
  "user/addProfileImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/image", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const profileEdit = createAsyncThunk(
  "user/profileEdit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/edit", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUserState: (state, action) => {
      state.getMyInfoLoading = false;
      state.getMyInfoDone = false;
      state.getMyInfoError = null;

      state.logInLoading = false;
      state.logInError = null;
      state.logInDone = false;

      state.signUpLoading = false;
      state.signUpError = null;
      state.signUpDone = false;

      state.followLoading = false;
      state.followDone = false;
      state.followError = null;

      state.logOutLoading = false;
      state.logOutError = null;
      state.logOutDone = false;

      state.getUserInfoLoading = false;
      state.getUserInfoDone = false;
      state.getUserInfoError = null;

      state.profileImagePath = "";

      state.profileEditLoading = false;
      state.profileEditDone = false;
      state.profileEditError = null;

      state.signOutLoading = false;
      state.signOutDone = false;
      state.signOutError = null;

      state.emailCheckLoading = false;
      state.emailCheckDone = false;
      state.emailCheckError = null;

      state.emailVarificationLoading = false;
      state.emailVarificationDone = false;
      state.emailVarificationError = null;

      state.isLoggedIn = false;
      state.me = null;
      state.user = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.user,
      }))
      .addCase(emailVarification.pending, (state, action) => {
        state.emailVarificationLoading = true;
        state.emailVarificationDone = false;
        state.emailVarificationError = null;
      })
      .addCase(emailVarification.fulfilled, (state, action) => {
        state.emailVarificationLoading = false;
        state.emailVarificationDone = true;
        state.emailVarificationError = null;
      })
      .addCase(emailVarification.rejected, (state, action) => {
        state.emailVarificationError =
          action.payload.code == 401
            ? "인증번호를 새로 받아주세요"
            : "인증번호가 일치하지 않습니다.";
      })
      .addCase(emailCheck.pending, (state, action) => {
        state.emailCheckLoading = true;
        state.emailCheckDone = false;
        state.emailCheckError = null;
        state.emailVarificationError = null;
      })
      .addCase(emailCheck.fulfilled, (state, action) => {
        state.emailCheckLoading = false;
        state.emailCheckDone = true;
        state.emailCheckError = null;
      })
      .addCase(emailCheck.rejected, (state, action) => {
        state.emailCheckError = action.payload;
      })
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
        state.getMyInfoError = action.payload;
      })
      .addCase(Follow.pending, (state, action) => {
        state.followLoading = true;
        state.followDone = false;
        state.followError = null;
      })
      .addCase(Follow.fulfilled, (state, action) => {
        state.followLoading = false;
        state.followDone = true;
        state.followError = null;
        state.me.Followings.push({ id: action.payload.id });
      })
      .addCase(Follow.rejected, (state, action) => {
        state.followError = action.payload;
      })
      .addCase(unFollow.pending, (state, action) => {
        state.followLoading = true;
        state.followDone = false;
        state.followError = null;
      })
      .addCase(unFollow.fulfilled, (state, action) => {
        state.followLoading = false;
        state.followDone = true;
        state.followError = null;
        state.me.Followings = state.me.Followings.filter((following) => {
          if (following.id != action.payload.id) return true;
        });
      })
      .addCase(unFollow.rejected, (state, action) => {
        state.followError = action.payload;
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
        state.getUserInfoError = action.payload;
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
        state.isLoggedIn = true;
        state.me = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.logInLoading = false;
        state.logInDone = false;
        state.logInError = action.payload;
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
        state.logOutError = action.payload;
      })
      .addCase(signUp.pending, (state, action) => {
        state.signUpLoading = true;
        state.signUpDone = false;
        state.signUpError = null;
        state.logInError = null;
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
        state.signUpDone = false;
        state.signUpError = action.payload;
      })
      .addCase(addProfileImage.pending, (state, action) => {
        state.addProfileImageLoading = true;
        state.addProfileImageDone = false;
        state.addProfileImageError = null;
      })
      .addCase(addProfileImage.fulfilled, (state, action) => {
        state.addProfileImageLoading = false;
        state.addProfileImageDone = true;
        state.addProfileImageError = null;
        state.profileImagePath = action.payload.imagePath;
        state.me.src = action.payload.imagePath;
      })
      .addCase(addProfileImage.rejected, (state, action) => {
        state.addProfileImageLoading = false;
        state.addProfileImageError = action.payload;
      })
      .addCase(profileEdit.pending, (state, action) => {
        state.profileEditLoading = true;
        state.profileEditDone = false;
        state.profileEditError = null;
      })
      .addCase(profileEdit.fulfilled, (state, action) => {
        state.profileEditLoading = false;
        state.profileEditDone = true;
        state.profileEditError = null;
        state.profileImagePath = "";
      })
      .addCase(profileEdit.rejected, (state, action) => {
        state.profileEditLoading = false;
        state.profileEditError = action.payload;
      })
      .addCase(signOut.pending, (state, action) => {
        state.signOutLoading = true;
        state.signOutDone = false;
        state.signOutError = null;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.signOutLoading = false;
        state.signOutDone = true;
        state.signOutError = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOutLoading = false;
        state.signOutError = action.payload;
      }),
});
export const { initializeUserState } = userSlice.actions; // 액션 생성함수
export default userSlice.reducer; // 리듀서
