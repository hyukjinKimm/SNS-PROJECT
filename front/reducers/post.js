import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
const initialState = {
  mainPosts: [],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  reportPostLoading: false,
  reportPostDone: false,
  reportPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  clearPostLoading: false,
  clearPostDone: false,
  clearPostError: null,
  hasMorePosts: true,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likeCommentLoading: false,
  likeCommentDone: false,
  likeCommentError: null,
  deleteCommentLoading: false,
  deleteCommentDone: false,
  deleteCommentError: null,

  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
}; // 초기 상태 정의

export const editPost = createAsyncThunk(
  "post/editPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`post/editPost/${data.id}`, data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const loadPost = createAsyncThunk(
  "post/loadPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`post/${postId}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (data, { rejectWithValue }) => {
    try {
      const { lastId, userId } = data;
      const response = await axios.get(
        `posts?lastId=${lastId || 0}&userId=${userId || 0}`
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/post", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const reportPost = createAsyncThunk(
  "post/reportPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/post/${data.postId}/report`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/post/${data.postId}/like`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/post/${data.postId}/unlike`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addImage = createAsyncThunk(
  "post/addImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/post/image", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/post/${postId}`);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/post/${data.postId}/comment`, data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeComment = createAsyncThunk(
  "post/likeComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/user/likecomment", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "post/unlikeComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/user/unlikecomment", data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/post/${data.postId}/comment/${data.commentId}`
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeImage: (state, action) => {
      state.imagePaths = state.imagePaths.filter(
        (v, i) => i !== action.payload.index
      );
    },
    initializePostState: (state, action) => {
      state.mainPosts = [];
      state.imagePaths = [];
      state.addPostLoading = false;
      state.addPostDone = false;
      state.addPostError = null;
      state.addImageLoading = false;
      state.addImageDone = false;
      state.addImageError = null;
      state.likePostLoading = false;
      state.likePostDone = false;
      state.likePostError = null;
      state.deletePostLoading = false;
      state.deletePostDone = false;
      state.deletePostError = null;
      state.loadPostsLoading = false;
      state.loadPostsDone = false;
      state.loadPostsError = null;

      state.loadPostLoading = false;
      state.loadPostDone = false;
      state.loadPostError = null;

      state.clearPostLoading = false;
      state.clearPostDone = false;
      state.clearPostError = null;
      state.hasMorePosts = true;
      state.addCommentLoading = false;
      state.addCommentDone = false;
      state.addCommentError = null;
      state.likeCommentLoading = false;
      state.likeCommentDone = false;
      state.likeCommentError = null;
      state.deleteCommentLoading = false;
      state.deleteCommentDone = false;
      state.deleteCommentError = null;
      state.reportPostLoading = false;
      state.reportPostDone = false;
      state.reportPostError = null;

      state.editPostLoading = false;
      state.editPostDone = false;
      state.editPostError = null;
    },
    editPostReset: (state, action) => {
      (state.editPostLoading = false),
        (state.editPostDone = false),
        (state.editPostError = null);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.post,
      }))
      .addCase(loadPosts.pending, (state, action) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;

        /*
             state.mainPosts = state.mainPosts.concat(
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

        */
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.loadPostsError = null;
        /**    state.mainPosts = state.mainPosts.slice(0, -10).concat(action.payload);*/
        state.mainPosts = state.mainPosts.concat(action.payload);

        state.hasMorePosts = action.payload.length == 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })
      .addCase(editPost.pending, (state, action) => {
        state.editPostLoading = true;
        state.editPostDone = false;
        state.editPostError = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.editPostLoading = false;
        state.editPostDone = true;
        state.editPostError = null;
        if (state.mainPosts.length > 0) {
          let index = state.mainPosts.findIndex(
            (post) => post.id == action.payload.id
          );
          state.mainPosts[index].content = action.payload.content;
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.editPostLoading = false;
        state.editPostError = action.error;
      })
      .addCase(reportPost.pending, (state, action) => {
        state.reportPostLoading = true;
        state.reportPostDone = false;
        state.reportPostError = null;
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        state.reportPostLoading = false;
        state.reportPostDone = true;
        state.reportPostError = null;
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.reportPostLoading = false;
        state.reportPostError = action.payload.message;
      })
      .addCase(addPost.pending, (state, action) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.addPostError = null;
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error;
      })
      .addCase(likePost.pending, (state, action) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likePostLoading = false;
        state.likePostDone = true;
        state.likePostError = null;

        if (state.mainPosts.length > 0) {
          let index = state.mainPosts.findIndex(
            (post) => post.id == action.payload.id
          );
          state.mainPosts[index] = action.payload;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error;
      })
      .addCase(unlikePost.pending, (state, action) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.likePostLoading = false;
        state.likePostDone = true;
        state.likePostError = null;
        if (state.mainPosts.length) {
          let index = state.mainPosts.findIndex(
            (post) => post.id == action.payload.id
          );
          state.mainPosts[index] = action.payload;
        }
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error;
      })
      .addCase(addImage.pending, (state, action) => {
        state.addImageLoading = true;
        state.addImageDone = false;
        state.addImageError = null;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.addImageLoading = false;
        state.addImageDone = true;
        state.addImageError = null;
        state.imagePaths.push(action.payload.imagePath);
      })
      .addCase(addImage.rejected, (state, action) => {
        state.addImageLoading = false;
        state.addImageError = action.error;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.deletePostLoading = true;
        state.deletePostDone = false;
        state.deletePostError = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletePostLoading = false;
        state.deletePostDone = true;
        state.deletePostError = null;
        if (state.mainPosts.length) {
          state.mainPosts = state.mainPosts.filter((post) => {
            if (post.id != action.payload.id) return true;
          });
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deletePostLoading = false;
        state.deletePostError = action.error;
      })
      .addCase(addComment.pending, (state, action) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.addCommentError = null;
        if (state.mainPosts.length) {
          state.mainPosts.find(
            (post) => post.id == action.payload.PostId
          ).Comments = action.payload.AllComments;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentError = action.error;
        state.addCommentLoading = false;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.deleteCommentLoading = true;
        state.deleteCommentDone = false;
        state.deleteCommentError = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteCommentLoading = false;
        state.deleteCommentDone = true;
        state.deleteCommentError = null;
        if (state.mainPosts.length) {
          let comments = state.mainPosts.find(
            (post) => post.id == action.payload.postId
          ).Comments;
          let index = comments.findIndex(
            (comment) => comment.id == action.payload.commentId
          );
          comments.splice(index, 1);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteCommentError = action.error;
        state.deleteCommentLoading = false;
      })
      .addCase(likeComment.pending, (state, action) => {
        state.likeCommentLoading = true;
        state.likeCommentDone = false;
        state.likeCommentError = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.likeCommentLoading = false;
        state.likeCommentDone = true;
        state.likeCommentError = null;
        if (state.mainPosts.length) {
          state.mainPosts
            .find((post) => post.id == action.payload.Post.id)
            .Comments.find(
              (comment) => comment.id == action.payload.id
            ).CommentLikers = action.payload.CommentLikers;
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.likeCommentError = action.error;
        state.likeCommentLoading = false;
      })
      .addCase(unlikeComment.pending, (state, action) => {
        state.likeCommentLoading = true;
        state.likeCommentDone = false;
        state.likeCommentError = null;
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.likeCommentLoading = false;
        state.likeCommentDone = true;
        state.likeCommentError = null;
        if (state.mainPosts.length > 0) {
          state.mainPosts
            .find((post) => post.id == action.payload.Post.id)
            .Comments.find(
              (comment) => comment.id == action.payload.id
            ).CommentLikers = action.payload.CommentLikers;
        }
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.likeCommentError = action.error;
        state.likeCommentLoading = false;
      }),
});
export const { initializePostState, removeImage, editPostReset } =
  postSlice.actions; // 액션 생성함수
export default postSlice.reducer; // 리듀서
