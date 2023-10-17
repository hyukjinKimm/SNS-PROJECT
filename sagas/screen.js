import {
  all,
  fork,
  //call,
  put,
  //take,
  //takeEvery,
  takeLatest,
  //takeLeading,
  //throttle,
  delay,
} from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../reducers/post";
import { CHANGE_MENU } from "../reducers/screen";

function* LoginToHome(action) {
  yield put({ type: CHANGE_MENU, data: "HOME" });
}

function* watchLoginToHome() {
  yield takeLatest(LOG_IN_SUCCESS, LoginToHome);
}

function* LogOutToHome(action) {
  yield put({ type: CHANGE_MENU, data: "HOME" });
}

function* watchLogOutToHome() {
  yield takeLatest(LOG_OUT_SUCCESS, LogOutToHome);
}

function* SignUpToLogIn(action) {
  yield put({ type: CHANGE_MENU, data: "LOGIN" });
}

function* watchSignUpToLogIn() {
  yield takeLatest(SIGN_UP_SUCCESS, SignUpToLogIn);
}
function* addPostToHome(action) {
  yield put({ type: CHANGE_MENU, data: "HOME" });
}
function* watchAddPostToHome() {
  yield takeLatest(ADD_POST_SUCCESS, addPostToHome);
}

export default function* userSage() {
  yield all([
    fork(watchLoginToHome),
    fork(watchSignUpToLogIn),
    fork(watchLogOutToHome),
    fork(watchAddPostToHome),
  ]);
}
