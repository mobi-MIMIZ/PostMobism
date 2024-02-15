import { Post } from "@/type/type"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PostApi } from "./post.api"
import { axiosInstance } from "../core.api"

type PostState = {
  data: Post[]
  loading: boolean
  error: string | null
  postList: Post[] | null // postList 추가
}

const initialState: PostState = {
  data: [],
  loading: false,
  error: "",
  postList: null, // 초기값 null로 설정
}

const POST_PATH = "/data/post"

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
export const postPost = createAsyncThunk<Post, Post>("post/postPost", async ({ title, content }: Post) => {
  try {
    const postData = { title, content }
    const res = await axiosInstance.post(POST_PATH, postData)
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
  reducers: {
    postPostFulfilled: (state, action: PayloadAction<Post>) => {
      // postPost 액션이 성공했을 때의 로직
      state.data = [action.payload]
    },
    clearPostData: state => {
      // data를 초기화하는 액션
      state.data = []
    },
    setError: (state, action: PayloadAction<string>) => {
      // 에러를 설정하는 액션
      state.error = action.payload
    },
    clearError: state => {
      // 에러를 초기화하는 액션
      state.error = null
    },
  },
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
        state.postList = action.payload // postList에 데이터 할당
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "예기치 못한 에러로 게시글 데이터를 불러오지 못했습니다!"
        state.data = []
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
        state.data = state.data ? state.data.filter(post => post.id !== action.meta.arg) : []
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
        if (state.data === null) {
          state.data = [] // null이면 빈 배열로 초기화
        }
        state.data.unshift(action.payload)
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "게시글을 수정하는 데 실패했습니다!"
      })
  },
})

export const { setPostList } = postSlice.actions

export default postSlice.reducer

/**
 * 주석
 * createAsyncThunk을 사용하여 비동기 작업을 수행하는 getPosts 액션을 만들었습니다. 
 * 이 액션은 서버에서 게시글 데이터를 가져와 Redux store의 상태를 업데이트합니다.
postSlice에서는 createSlice 함수를 사용하여 리듀서와 액션을 정의했습니다. 
extraReducers를 사용하여 비동기 액션(getPosts)의 성공, 실패 및 보류 상태에 따라 상태를 업데이트합니다.
비동기 액션의 결과가 성공하면 상태의 loading을 false로 설정하고, 
data에 가져온 게시글 데이터를 저장합니다. 실패하면 에러 메시지를 저장합니다.
setPostList 리듀서는 동기적으로 상태를 업데이트하는 역할을 합니다. 
이 액션은 필요에 따라 사용할 수 있지만, 비동기 작업을 위한 getPosts 액션을 사용할 때는 굳이 필요하지 않을 수 있습니다.
 */
