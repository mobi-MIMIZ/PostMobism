import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenDetailPost: false,
    isOpenPost: false,
  },
  reducers: {
    setIsOpenDetailPost: (state, action) => {
      state.isOpenDetailPost = action.payload
    },
    setIsOpenPost: (state, action) => {
      state.isOpenPost = action.payload
    },
  },
})

export const { setIsOpenDetailPost, setIsOpenPost } = modalSlice.actions

export default modalSlice.reducer
