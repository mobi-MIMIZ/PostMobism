import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../api/user-slice"
import postReducer from "../api/post-slice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
