import type { PropsWithChildren } from "react"
import { useMediaQuery } from "react-responsive"

import { Header } from "../header"
import { Sidebar } from "../sidebar"

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

  return (
    <div className="flex h-screen">
      {!isTabletOrMobile && (
        <aside className="w-64 shadow-sm">
          <Sidebar />
        </aside>
      )}
      <div className="flex flex-col flex-1">
        <header className="w-full shadow-sm p-6 bg-white">
          <Header />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
