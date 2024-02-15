import axios from "axios"
import { AuthApi } from "./user/auth.api"
import cookieStorage from "@/utils/cookie-storage"
import { ACCESS_TOKEN } from "@/consts/keys"

const token = cookieStorage.getCookie(ACCESS_TOKEN)

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    authorization: token ? `Bearer ${token}` : null,
  },
  params: {
    apiKey: import.meta.env.VITE_API_KEY,
    pair: import.meta.env.VITE_PAIR,
  },
  withCredentials: true, // 요청 시에 쿠키를 포함하도록 설정
})

// 아래는 변경 전 코드
// axiosInstance.interceptors.request.use(function (config) {
//   const token = String(TokenRepository.getToken())
//   config.headers.Authorization = token ? `Bearer ${token}` : ""
//   return config
// })

/**
 * 응답 인터셉터 (interceptors.response) : 응답을 보내기전 intercept하여 해당 로직을 실행
 *
 * @error401 : "accessToken이 유효하지 않아요! "
 *              리프레시 토큰 👉 새로운 토큰으로 재요청
 * @error403 : "accessToken, refreshToken이 모두 유효하지 않아요!"
 *              다시 로그인하세요 👉 강제 로그아웃
 */

// isRefreshing : 리프레시 요청이 실행 중인지 여부 (요청이 완료되면 false로 설정)
let isRefreshing = false

axiosInstance.interceptors.response.use(
  res => {
    return res
  },
  async err => {
    /* 
      originalRequest?
      현재 실패한 요청의 원본 요청에 대한 정보를 갖고 있는 Axios 인터셉터에서 사용되는 객체
      에러가 발생한 요청이 인터셉터에서 재시도되어야 할 때 사용

      interceptors에서는 err.config를 통해 현재 요청에 대한 설정 정보를 얻을 수 있다. 
      이 정보를 originalRequest 변수에 할당하여 나중에 재시도할 때 사용 가능 
      이를 통해 리프레시 토큰의 갱신 및 발급 재시도하는 등의 작업을 수행

      특정 요청이 실패하면 해당 요청을 기억
      토큰을 갱신한 후에 다시 시도하는 경우에 originalRequest가 활용
    */
    const originalRequest = err.config // 즉,토큰이 유효하지 않다면 리프레시 발급 요청

    // 401이라면 리프레시 토큰으로 새로운 토큰 발급 시도
    if (err.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          // 리프레시 요청 성공: 토큰 재요청
          const response = await AuthApi.RefreshToken()
          const token = response.data
          cookieStorage.setCookie(ACCESS_TOKEN, token, 60 * 24)
          // 발급 받은 토큰으로 요청에 토큰 수정 (현재 실패한 요청의 헤더에 새로 발급받은 액세스 토큰을 설정)
          // why? 👉 리프레시된 토큰으로 다시 시도 가능
          originalRequest.headers.common["Authorization"] = `Bearer ${token}`
          // axiosInstace의 common에도 토큰 수정 (Axios 인스턴스의 기본 헤더에도 새로운 액세스 토큰을 설정)
          // why? 👉 앞으로 전송되는 모든 요청에 대해 헤더에 포함된 토큰이 갱신됨
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
          return axiosInstance(originalRequest) // 현재 실패한 요청을 다시 시도
        } catch (refreshErr) {
          // 리프레시 요청이 실패 :  로그아웃
          window.location.href = "/"
          await AuthApi.SignOut()
        } finally {
          // 리프레시 요청을 true 상태로 바꾸어 한번만 실행되도록 함
          isRefreshing = true
        }
      }
    }
    // 403이라면 강제 로그아웃
    if (err.response.status === 403) {
      window.location.href = "/"
      await AuthApi.SignOut()
    }
    return Promise.reject(err)
  },
)
