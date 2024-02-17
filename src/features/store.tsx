import userReducer from "@/features/user/user.slice"
import postReducer from "@/features/post/post.slice"
import commentReducer from "@/features/comment/comment.slice"
import { configureStore } from "@reduxjs/toolkit"
import { commentApi } from "@/hooks/use-get-comment-list-query"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commentApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
