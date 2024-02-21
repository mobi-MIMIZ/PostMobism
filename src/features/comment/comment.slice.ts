import { TCommentsResponse } from "@/type/type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentApi } from "./comment.api"
import { CommentDataType } from "@/pages/main/components/post-detail-modal/components/comment/comment-form"

type CommentState = {
  commentList: TCommentsResponse | null
  loading: boolean
  error: string | null
}

const initialState: CommentState = {
  commentList: {
    data: [],
    pagination: undefined,
  },

  loading: false,
  error: "",
}

// getComments : read
export const getComments = createAsyncThunk<TCommentsResponse, { page: number; postId: string }>(
  "comment/getComments",
  async ({ page, postId }) => {
    try {
      const posts = await CommentApi.getComment({ page, postId })
      return posts
    } catch (error) {
      throw new Error("게시글 데이터를 불러오는 데 실패했습니다!")
    }
  },
)

export const postComment = createAsyncThunk("comment/postComment", async ({ parentId, content }: CommentDataType) => {
  try {
    const commentData = { parentId, content }
    const res = await CommentApi.postComment(commentData)
    return res.data
  } catch (error) {
    throw new Error("댓글 작성에 실패하였습니다")
  }
})

//Reducer와 action 정의
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  //extraReducers를 사용하여 비동기 액션(getPosts)의 성공, 실패 및 보류 상태에 따라 상태를 업데이트
  extraReducers(builder) {
    builder
      // getPost : read
      .addCase(getComments.pending, state => {
        state.loading = true
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.commentList = {
          data: state.commentList?.data.concat(action.payload.data)!,
          pagination: action.payload.pagination,
        }
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "예기치 못한 에러로 게시글 데이터를 불러오지 못했습니다!"
        state.commentList = null
      })
      // postComment: create
      .addCase(postComment.pending, state => {
        state.loading = true
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(postComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "댓글 작성에 실패하였습니다"
      })
  },
})

// export const { setPostList } = postSlice.actions

export default commentSlice.reducer
