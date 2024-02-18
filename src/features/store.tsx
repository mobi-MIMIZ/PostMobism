import userReducer from "@/features/user/user.slice"
import postReducer from "@/features/post/post.slice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // 불필요한 경고를 피하기 위해 추가
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
