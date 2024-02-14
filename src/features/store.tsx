import userReducer from "@/features/user/user.slice"
import postReducer from "@/features/post/post.slice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
