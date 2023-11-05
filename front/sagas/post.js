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
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAILURE,
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

function addImageAPI(data) {
  return axios.post(`/post/image`, data);
}
function* addImage(action) {
  try {
    const result = yield call(addImageAPI, action.data);

    yield put({ type: ADD_IMAGE_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: ADD_IMAGE_FAILURE, error: err.response.data });
  }
}

function* watchAddImage() {
  yield takeLatest(ADD_IMAGE_REQUEST, addImage);
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

function deleteCommentAPI(data) {
  return axios.delete(`/post/${data.postId}/comment/${data.commentId}/`);
}
function* deleteComment(action) {
  try {
    const result = yield call(deleteCommentAPI, action.data);
    yield put({ type: DELETE_COMMENT_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: DELETE_COMMENT_FAILURE, error: err.response.data });
  }
}

function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

function likeCommentAPI(data) {
  return axios.patch(`/user/likecomment`, data);
}
function* likeComment(action) {
  try {
    const result = yield call(likeCommentAPI, action.data);

    yield put({ type: LIKE_COMMENT_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LIKE_COMMENT_FAILURE, error: err.response.data });
  }
}

function* watchLikeComment() {
  yield takeLatest(LIKE_COMMENT_REQUEST, likeComment);
}
function unLikeCommentAPI(data) {
  return axios.patch(`/user/unlikecomment`, data);
}
function* unLikeComment(action) {
  try {
    const result = yield call(unLikeCommentAPI, action.data);

    yield put({ type: UNLIKE_COMMENT_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: UNLIKE_COMMENT_FAILURE, error: err.response.data });
  }
}

function* watchunLikeComment() {
  yield takeLatest(UNLIKE_COMMENT_REQUEST, unLikeComment);
}
export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddImage),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchAddComment),
    fork(watchDeleteComment),
    fork(watchLikeComment),
    fork(watchunLikeComment),
    fork(watchDeletePost),
    fork(watchLoadPost),
  ]);
}
