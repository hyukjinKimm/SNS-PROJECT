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
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  CLEAR_POST_REQUEST,
  CLEAR_POST_SUCCESS,
  CLEAR_POST_FAILURE,
} from "../reducers/post";
function addPostAPI(data) {
  return axios.post(`/post`, data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({ type: ADD_POST_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, error: err.response.data });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function likePostAPI(data) {
  return axios.post(`/post/${data.postId}/like`);
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);

    yield put({ type: LIKE_POST_SUCCESS, data: result.data }); // 좋아요 갯수를 넘겨줌.
  } catch (err) {
    yield put({ type: LIKE_POST_FAILURE, error: err.response.data });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function unLikePostAPI(data) {
  return axios.post(`/post/${data.postId}/unlike`);
}
function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);

    yield put({ type: UNLIKE_POST_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: UNLIKE_POST_FAILURE, error: err.response.data });
  }
}

function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function deletePostAPI(postId) {
  return axios.delete(`post/${postId}`);
}
function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.data);
    yield put({ type: DELETE_POST_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: DELETE_POST_FAILURE, error: err.response.data });
  }
}

function loadPostAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.lastId);
    yield put({ type: LOAD_POST_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_POST_FAILURE, error: err.response.data });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: ADD_COMMENT_FAILURE, error: err.response.data });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchAddComment),
    fork(watchDeletePost),
    fork(watchLoadPost),
  ]);
}
