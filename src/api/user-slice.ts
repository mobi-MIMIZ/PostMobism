import { User } from "@/type/type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "./core.api"
import { SignUpUser } from "@/type/dto/form"

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
    return response.data
  } catch (error) {
    throw new Error("사용자 데이터를 불러오는 데 실패했습니다!")
  }
})

const initialStateValue = { userId: "", nickName: "" }

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    // signIn: (state, action: PayloadAction<SignInUser[]>) => {
    //   state.data = action.payload
    // },
    signUp: (state, action) => {
      state.value = action.payload
    },
    signOut: state => {
      state.value = initialStateValue
    },
  },
})
export const { signUp, signOut } = userSlice.actions
export default userSlice.reducer
