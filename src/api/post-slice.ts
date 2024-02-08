import { Post } from "@/type/type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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

export const getPosts = createAsyncThunk<Post[]>("post", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("게시글 데이터를 불러오는 데 실패했습니다!")
  }
})

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
  },
})

export default postSlice.reducer
