import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  params: {
    apiKey: import.meta.env.VITE_API_KEY,
    pair: import.meta.env.VITE_PAIR,
  },
  withCredentials: true,
})

