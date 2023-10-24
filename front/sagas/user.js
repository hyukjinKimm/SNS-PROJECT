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
  call,
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
import { CHANGE_MENU, CLICK_LOGIN_MENU } from "../reducers/screen";

function logInAPI(data) {
  return axios.post("/api/login", data);
}
// const l = logIn({typse: LOG_IN_REQUEST, data: { id: "asdaddad"}});
// l.next()
// l.next()   ---> break point 처럼 순차적으로 테스트가 가능.
function* logIn(action) {
  try {
    //const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({ type: LOG_IN_SUCCESS, data: action.data }); // put 은 dispatch 와 동일.
  } catch (err) {
    yield put({ type: LOG_IN_FAILURE, error: err.response.data }); //  실패 결과는 err.response.data 에 들어있음
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    //const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
  }
}
function signUpAPI(data) {
  return axios.post("http://localhost:3065/user", data);
}
function* signUp(action) {
  try {
    console.log("here", action.data);
    const result = yield call(signUpAPI, action.data);
    console.log(result);

    // throw new Error(' ')
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (err) {
    console.log(err);
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLogin() {
  // yield take("LOG_IN_REQUEST", logIn); // LOG_IN 액션 실행시 logIn 함수 실행. action 을 logIn 함수의 인자로 전달해줌 , take 는 1회용이다.
  // yield takeEvery("LOG_IN_REQUEST", logIn);
  yield takeLatest(LOG_IN_REQUEST, logIn);
  // yield throttle("LOG_IN_REQUEST", logIn, 2000); // 2초동안 LOG_IN_REQUEST 는 한번만 가능
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSage() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchSignUp)]);
}
