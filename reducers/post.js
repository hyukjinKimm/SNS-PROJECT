export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "hyukjin kim",
      },
      content: "첫번째 게시글 #헤시태그 #익스프레스",
      Images: [
        {
          src: "https://media.istockphoto.com/id/1446806057/photo/young-happy-woman-student-using-laptop-watching-webinar-writing-at-home.jpg?s=2048x2048&w=is&k=20&c=cJi6VhUnXMYkka0ktIcrH3uh1Ls90M5FnfYYtCcqSi0=",
        },
        {
          src: "https://media.istockphoto.com/id/1408387701/photo/social-media-marketing-digitally-generated-image-engagement.jpg?s=2048x2048&w=is&k=20&c=Gfl47p22O1FSu9KzcJXNLSkZ91W-ML8NTkOG3UkCw2g=",
        },
        {
          src: "https://media.istockphoto.com/id/1443305526/photo/young-smiling-man-in-headphones-typing-on-laptop-keyboard.jpg?s=2048x2048&w=is&k=20&c=YbyIE-QkVeacJODEhS5_LQzJahwiTmZTnism-xUwCLA=",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "krystal",
          },
          content: "열심히 살자..밥값을 해야지",
        },
        {
          User: {
            nickname: "Justin",
          },
          content: "꾸준히 하면...",
        },
        {
          User: {
            nickname: "게으름의 신",
          },
          content: "좀 쉬어..",
        },
      ],
    },
  ],
  imagePaths: [],
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const ADD_POST = "ADD_POST";
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "더미데이터 입니다.",
  User: {
    id: 1,
    nickname: "김철수",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [, dummyPost, ...mainPosts],
      };

    default:
      return state;
  }
};

export default reducer;
