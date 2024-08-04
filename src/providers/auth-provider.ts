import type { AuthProvider } from "@refinedev/core"
import axios from "axios"
import Cookies from "js-cookie"

import { useAuthStore } from "../../store/useAuthStore"
import axiosInstance from "../network-instances/axiosInstance"

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    if (email && password) {
      try {
        const res = await axios.post("https://api.worbion.com/auth/login", {
          email,
          password,
        })
        const { accessToken, refreshToken } = res.data.data
        Cookies.set("access_token", accessToken, {
          secure: true,
        })
        Cookies.set("refresh_token", refreshToken, {
          secure: true,
        })
        return {
          success: true,
          redirectTo: "/",
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    }
  },
  logout: async () => {
    useAuthStore.getState().clearTokens()
    return {
      success: true,
      redirectTo: "/login",
    }
  },
  check: async () => {
    const token = Cookies.get("access_token")
    if (token) {
      return {
        authenticated: true,
      }
    }

    try {
      const res = await axiosInstance.post("/auth/accessToken", {
        refreshToken: Cookies.get("refresh_token"),
      })
      const { accessToken, refreshToken } = res.data.data
      Cookies.set("access_token", accessToken, { httpOnly: true, secure: true })
      Cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
      })
      if (accessToken) {
        return {
          authenticated: true,
        }
      }
    } catch (error) {
      console.error(error)
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    }
  },
  //@ts-ignore
  refreshTokens: async () => {
    try {
      const res = await axiosInstance.post("/auth/accessToken", {
        refreshToken: Cookies.get("refresh_token"),
      })
      const { accessToken, refreshToken } = res.data.data
      Cookies.set("access_token", accessToken)
      Cookies.set("refresh_token", refreshToken)
    } catch (error) {
      console.error("error refreshing tokens: ", error)
      throw error
    }
  },
  onError: async (error) => {
    console.error(error)
    return { error }
  },
}
