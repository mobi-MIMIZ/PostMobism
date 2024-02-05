import { axiosInstance } from "./core.api"

const PATH = "/user"

export const AuthApi = {
  async SignUp({ ...formData }) {
    const { userId, password, nickname } = formData
    const res = await axiosInstance.post(PATH + "/sign-up", {
      userId,
      password,
      data: {
        nickname,
      },
    })
    return res.data
  },
  async SignIn({ ...formData }) {
    const { userId, password } = formData
    const res = await axiosInstance.post(PATH + "/sign-in", {
      userId,
      password,
    })
    return res.data
  },
  async SignOut() {
    const res = await axiosInstance.post(PATH + "/sign-out")
    return res.data
  },
  async RefreshToken() {
    const res = await axiosInstance.get(PATH + "/refresh")
    return res
  },
}
