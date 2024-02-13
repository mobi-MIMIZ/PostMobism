import { Post } from "@/type/type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PostApi } from "./post.api"

type PostState = {
  data: Post[] | null
  loading: boolean
  error: string | null
}

const initialState: PostState = {
  data: null,
  loading: false,
  error: "",
}

// getPost : read
export const getPosts = createAsyncThunk<Post[]>("post/getPosts", async () => {
  try {
    const posts = await PostApi.getPost({ id: "", title: "" })
    return posts as Post[]
  } catch (error) {
    throw new Error("게시글 데이터를 불러오는 데 실패했습니다!")
  }
})

// postPost : create
export const postPost = createAsyncThunk<Post, Post>("post/postPost", async (post: Post) => {
  try {
    const newPost = await PostApi.postPost(post)
    return newPost
  } catch (error) {
    throw new Error("게시글을 등록하는 데 실패했습니다!")
  }
})

// deletePost : delete
export const deletePost = createAsyncThunk<void, string>("post/deletePost", async (postId: string) => {
  try {
    await PostApi.deletePost(postId)
  } catch (error) {
    throw new Error("게시글을 삭제하는 데 실패했습니다!")
  }
})

// editPost : update
export const editPost = createAsyncThunk<Post, { post: Post; postId: string }>(
  "post/editPost",
  async ({ post, postId }) => {
    try {
      const updatedPost = await PostApi.editPost(post, postId)
      return updatedPost
    } catch (error) {
      throw new Error("게시글을 수정하는 데 실패했습니다!")
    }
  },
)

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // getPost : read
      .addCase(getPosts.pending, state => {
        state.loading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.data = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "예기치 못한 에러로 게시글 데이터를 불러오지 못했습니다!"
        state.data = null
      })
      // postPost : create
      .addCase(postPost.pending, state => {
        state.loading = true
      })
      .addCase(postPost.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data ? [...state.data, action.payload] : [action.payload]
      })
      .addCase(postPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "게시글을 등록하는 데 실패했습니다!"
      })
      // deletePost : delete
      .addCase(deletePost.pending, state => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data ? state.data.filter(post => post.id !== action.meta.arg) : null
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "게시글을 삭제하는 데 실패했습니다!"
      })
      // editPost : update
      .addCase(editPost.pending, state => {
        state.loading = true
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data
          ? state.data.map(post => (post.id === action.meta.arg.postId ? action.payload : post))
          : null
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "게시글을 수정하는 데 실패했습니다!"
      })
  },
})

export default postSlice.reducer
