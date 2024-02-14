import { User } from "@/type/type"
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

// test
// 원하는 페이지에 useEffect 사용해 console.log에 찍으면 잘 찍힙니다 :)
export const getUsers = createAsyncThunk<User[]>("user", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("사용자 데이터를 불러오는 데 실패했습니다!")
  }
})

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
      // 여기서 action.payload는 로그인 후 서버에서 받아온 유저 정보
      return { ...state, ...action.payload }
    },
    signUp: (state, action) => {
      state[0] = action.payload
    },
    signOut: state => {
      state.length = 0 // 배열을 비운 뒤
      state.push(...initialState) // 초기 상태를 다시 추가
    },
  },
})

export const { signUp, signOut } = userSlice.actions
export default userSlice.reducer
