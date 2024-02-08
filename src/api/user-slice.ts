import { User } from "@/type/type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type UserState = {
  data: User[] | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: "",
}

export const getUsers = createAsyncThunk<User[]>("user", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("사용자 데이터를 불러오는 데 실패했습니다!")
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // signIn: (state, action: PayloadAction<UserData[]>) => {state.data = action.payload},
    // signUp: (state, action: PayloadAction<UserData[]>) => {state.data = action.payload},
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.data = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "예기치 못한 에러로 사용자 데이터를 불러오지 못했습니다!"
        state.data = null
      })
  },
})

export default userSlice.reducer
