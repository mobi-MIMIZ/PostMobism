import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../core.api"
import { SignUpUser } from "@/type/dto/form"

interface UserState {
  userId(userId: string): unknown
  id: string
  nickName: string
  profileImg: string
}

const initialState: UserState[] = []

const PATH = "/user"

export const SignUp = createAsyncThunk("user", async ({ ...formData }: SignUpUser) => {
  const { userId, password, nickname } = formData
  try {
    const response = await axiosInstance.post(PATH + "/sign-up", {
      userId,
      password,
      data: {
        nickname,
      },
    })
    return [response.data]
  } catch (error) {
    throw new Error("사용자 데이터를 불러오는 데 실패했습니다!")
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    signUp: (state, action) => {
      state[0] = action.payload
    },
    signOut: state => {
      state.length = 0
      state.push(...initialState)
    },
  },
})

export const { signUp, signOut } = userSlice.actions
export default userSlice.reducer
