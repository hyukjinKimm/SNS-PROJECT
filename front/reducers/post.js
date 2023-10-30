import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";
faker.seed(123);
export const initialState = {
  mainPosts: [],

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  clearPostLoading: false,
  clearPostDone: false,
  clearPostError: null,
  hasMorePost: true,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const CLEAR_POST_REQUEST = "CLEAR_POST_REQUEST";
export const CLEAR_POST_SUCCESS = "CLEAR_POST_SUCCESS";
export const CLEAR_POST_FAILURE = "CLEAR_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";
export const ADD_POST = "ADD_POST";

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  data,
});
export const unLikePostRequestAction = (data) => ({
  type: UNLIKE_POST_REQUEST,
  data,
});
export const deletePostRequestAction = (data) => ({
  type: DELETE_POST_REQUEST,
  data,
});
export const loadPostRequestAction = (lastId) => ({
  type: LOAD_POST_REQUEST,
  lastId: lastId,
});
export const clearPostRequestAction = (data) => ({
  type: CLEAR_POST_REQUEST,
  data,
});
export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => {
  return {
    id: shortId.generate(),
    ...data,
    Image: [],
    Comments: [],
  };
};

export const loadMorePosts = (number) => {
  return Array(number)
    .fill()
    .map((v, i) => {
      return {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: faker.person.firstName(),
        },
        content: faker.lorem.paragraph(),
        Images: [{ src: faker.image.url() }, { src: faker.image.url() }],
        Comments: [
          {
            User: {
              id: shortId.generate(),
              nickname: faker.person.firstName(),
            },
            content: faker.lorem.sentence(),
          },
        ],
      };
    });
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        //draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS:
        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.likePostError = null;
        draft.mainPosts.find((post) => post.id == action.data.id).Likers =
          action.data.Likers.map((p) => {
            return {
              id: p.id,
            };
          });

        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case UNLIKE_POST_SUCCESS:
        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.likePostError = null;
        draft.mainPosts.find((post) => post.id == action.data.id).Likers =
          action.data.Likers.map((p) => {
            return {
              id: p.id,
            };
          });

        break;
      case UNLIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;

      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = true;
        draft.deletePostDone = true;
        draft.deletePostError = null;
        draft.mainPosts = draft.mainPosts.filter((post) => {
          if (post.id != action.data) return true;
        });
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostError = true;
        draft.deletePostLoading = false;
        draft.deletePostError = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        draft.mainPosts = draft.mainPosts.concat(
          Array(10)
            .fill()
            .map(() => {
              return {
                loading: true,
                name: {},
                picture: {},
              };
            })
        );

        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostError = null;
        draft.mainPosts = draft.mainPosts.slice(0, -10).concat(action.data);

        draft.hasMorePost = action.data.length == 10;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case CLEAR_POST_REQUEST:
        draft.mainPosts = [];

        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentDone = true;
        draft.addCommentLoading = false;

        const post = draft.mainPosts.find(
          (post) => post.id == action.data.PostId
        );
        post.Comments.unshift(action.data);
        break;

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
