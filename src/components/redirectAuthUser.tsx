import { authProvider } from "@/authProvider"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RedirectAuthUser = () => {
  const navigate = useNavigate()
  const accessToken = Cookies.get("access_token")
  const refreshToken = Cookies.get("refresh_token")

  useEffect(() => {
    const checkTokens = async () => {
      const { authenticated } = await authProvider.check()
      if (authenticated) {
        console.log("Authenticated")
        navigate("/")
      }
    }

    if (accessToken || refreshToken) {
      console.log("Tokens found")
      checkTokens()
    }
  }, [accessToken, refreshToken, navigate])

  return null
}
