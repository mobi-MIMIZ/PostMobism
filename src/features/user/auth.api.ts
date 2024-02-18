import { axiosInstance } from "../core.api"
import { SignInType } from "@/consts/form-schema"

const PATH = "/user"

export const AuthApi = {
  async SignUp({ ...formData }) {
    const { userId, password, nickName } = formData
    const res = await axiosInstance.post(PATH + "/sign-up", {
      userId,
      password,
      data: {
        nickName,
      },
    })
    return res.data
  },
  async SignIn(data: SignInType) {
    const res = await axiosInstance.post(PATH + "/sign-in", data)
    const userInfo = {
      userId: res.data.userId,
      nickName: res.data.info.nickName,
      profileUrl: res.data.info?.profileUrl,
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    return res
  },
  async SignOut() {
    const res = await axiosInstance.post(PATH + "/sign-out")
    return res.data
  },
  async RefreshToken() {
    const res = await axiosInstance.get(PATH + "/refresh")
    return res.data.token
  },
}
