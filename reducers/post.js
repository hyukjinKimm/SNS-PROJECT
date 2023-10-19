import shortId from "shortid";
import { produce } from "immer";
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 3,
        nickname: "hyukjin kim",
      },
      content:
        "첫번째 게시글 #헤시태그 #익스프레스a.dskasjkdjadsjajdadsjkldajlasdjkljadskljadsjkladsjkasljdkljdaskldajkldajlkdjalkdjakljdklajklasjd",
      Images: [
        {
          src: "https://media.istockphoto.com/id/1408387701/photo/social-media-marketing-digitally-generated-image-engagement.jpg?s=2048x2048&w=is&k=20&c=Gfl47p22O1FSu9KzcJXNLSkZ91W-ML8NTkOG3UkCw2g=",
        },
        {
          src: "https://media.istockphoto.com/id/1446806057/photo/young-happy-woman-student-using-laptop-watching-webinar-writing-at-home.jpg?s=2048x2048&w=is&k=20&c=cJi6VhUnXMYkka0ktIcrH3uh1Ls90M5FnfYYtCcqSi0=",
        },
        {
          src: "https://media.istockphoto.com/id/1443305526/photo/young-smiling-man-in-headphones-typing-on-laptop-keyboard.jpg?s=2048x2048&w=is&k=20&c=YbyIE-QkVeacJODEhS5_LQzJahwiTmZTnism-xUwCLA=",
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: "krystal",
          },
          content: "열심히 살자..밥값을 해야지",
        },
        {
          User: {
            id: shortId.generate(),
            nickname: "Justin",
          },
          content: "꾸준히 하면...",
        },
        {
          User: {
            id: shortId.generate(),
            nickname: "게으름의 신",
          },
          content: "좀 쉬어..",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
};

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
