import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";
faker.seed(123);
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  hasMorePost: true,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

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
export const deletePostRequestAction = (data) => ({
  type: DELETE_POST_REQUEST,
  data,
});
export const loadPostRequestAction = (data) => ({
  type: LOAD_POST_REQUEST,
  data,
});
export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data: {
    User: { id: 4, nickname: "댓글테스트" },
    ...data,
  },
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
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
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
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostError = null;

        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
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
          (post) => post.id == action.data.postId
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
