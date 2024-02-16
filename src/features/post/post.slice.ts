import { Comment, Post, TPostsResponse } from "@/type/type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PostApi } from "./post.api"

type PostState = {
  postList: TPostsResponse | null
  postDetail: {
    data: Post
    children: Comment
  } | null
  loading: boolean
  error: string | null
}

const initialState: PostState = {
  postList: {
    data: [],
    pagination: undefined,
  },
  postDetail: null,
  loading: false,
  error: "",
}

export const getOnePost = createAsyncThunk("post/getPost", async (postId: string) => {
  const post = await PostApi.getOnePost(postId)
  return post
})

// getPost : read
export const getPosts = createAsyncThunk("post/getPosts", async (pageParam: number) => {
  try {
    const posts = await PostApi.getPosts(pageParam)
    return posts
  } catch (error) {
    throw new Error("게시글 데이터를 불러오는 데 실패했습니다!")
  }
})

// postPost : create
export const postPost = createAsyncThunk<Post, { formData: FormData }>("post/postPost", async ({ formData }) => {
  try {
    const res = await PostApi.postPost({ formData })
    return res.data
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
export const editPost = createAsyncThunk<Post, { post: Partial<{ title: string; content: string }>; postId: string }>(
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
      // getOnePost : read
      .addCase(getOnePost.pending, state => {
        state.loading = true
      })
      .addCase(getOnePost.fulfilled, (state, action) => {
        if (!isPostDetail(action.payload)) return
        state.loading = false
        state.error = null
        state.postDetail = action.payload
      })
      .addCase(getOnePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "예기치 못한 에러로 게시글 데이터를 불러오지 못했습니다!"
        state.postDetail = null
      })
      // getPost : read
      .addCase(getPosts.pending, state => {
        state.loading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        if (!isPostArray(action.payload)) return
        state.loading = false
        state.error = null
        state.postList = action.payload
      })
      // postPost : create
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "예기치 못한 에러로 게시글 데이터를 불러오지 못했습니다!"
        state.postList = null
      })
      // postPost : create
      .addCase(postPost.pending, state => {
        state.loading = true
      })
      .addCase(postPost.fulfilled, (state, action) => {
        if (!isPostArray(action.payload)) return
        state.loading = false
      })
      .addCase(postPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "게시글을 등록하는 데 실패했습니다!"
      })
      // deletePost : delete
      .addCase(deletePost.pending, state => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, state => {
        state.loading = false
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
        if (state.postList === null) {
          state.postList = null // null이면 빈 배열로 초기화
        }
        state.postList?.data.unshift(action.payload)
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "게시글을 수정하는 데 실패했습니다!"
      })
  },
})

export default postSlice.reducer

function isPostArray(args: unknown): args is TPostsResponse {
  return true
}

function isPostDetail(args: unknown): args is { data: Post; children: Comment } {
  return true
}
