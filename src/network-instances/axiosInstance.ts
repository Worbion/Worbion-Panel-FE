import { authProvider } from "@/providers/auth-provider"
import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: "https://api.worbion.com/",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await authProvider.refreshTokens() // refresh tokens
        const newAccessToken = Cookies.get("access_token")
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest) // try original request again
      } catch (refreshError) {
        if (refreshError.response.status === 401) {
          // if both tokens are expired, logout
          authProvider.logout()
          return Promise.reject(refreshError)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
