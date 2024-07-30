import Cookies from "js-cookie"
import { create } from "zustand"

type AuthStore = {
  clearTokens: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  clearTokens: () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
  },
}))
