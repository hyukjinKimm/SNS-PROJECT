import { all, fork } from "redux-saga/effects";
// fork: 비동기 함수 호출 ( 논 블록킹)
// call: 동기 함수 호출 ( 블록킹)
// yield 는 await 과 비슷한 역할
// takeLatest 클릭을 실수로 여러번 했을때 마지막 요청만 실행. ( 요청은 back 으로 전부 보냄. back 으로 오는 요청을 하나 남기고 전부 취소. 즉 요청은 취소하지 않고 응답을 취소. 서버에서 검사 필요)
// takeLeading 클릭을 실수로 여러변 했을대 첫번째 요청만 실행.
// throttle

import postSaga from "./post";
import userSage from "./user";
import screenSage from "./screen";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSage), fork(screenSage)]); // all 은 배열 안의 함수들을 동시에 실행함.
}
