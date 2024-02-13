import { axiosInstance } from "../core.api"

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
    const res = await axiosInstance.post(PATH + "/sign-in", {
      userId: data.userId,
      password: data.password
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
