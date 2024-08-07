//@ts-nocheck
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
  (request) => {
    console.log("request being made")
    const accessToken = Cookies.get("access_token")
    console.log(accessToken)
    if (accessToken) {
      console.log("access token found")
      request.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise // this holds any in-progress token refresh requests

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Successful response:", response)
    // Directly return successful responses.
    return response
  },
  async (error) => {
    console.log("Error response:", error)
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("Token expired. Attempting to refresh token...")
      originalRequest._retry = true // Mark the request as retried to avoid infinite loops.

      if (!refreshTokenPromise) {
        // Check for an existing in-progress request
        // If nothing is in-progress, start a new refresh token request
        refreshTokenPromise = authProvider.refreshTokens().then(() => {
          refreshTokenPromise = null // Clear state.
          return Cookies.get("access_token") // Return new token.
        })
      }

      try {
        const newAccessToken = await refreshTokenPromise
        console.log("Token refreshed successfully.")
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return await axiosInstance(originalRequest) // Retry the request with the new access token.
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 401) {
          // If the refresh request fails, log the user out.
          console.log("Token refresh failed. Logging out.")
          authProvider.logout()
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
