import type { PropsWithChildren } from "react"

import { Menu } from "../menu"

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <Menu />
      </div>
      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  )
}
