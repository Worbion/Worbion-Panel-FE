import { List } from "@phosphor-icons/react"
import { useMenu } from "@refinedev/core"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useLocation } from "react-router-dom"

import { useSidebarStore } from "../../../store/useLayoutStore"
import { Sidebar } from "../sidebar"

export const Header = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

  const { isOpen, setIsOpen } = useSidebarStore()

  const { menuItems } = useMenu()
  const location = useLocation()
  const currentMenuItem = menuItems.find(
    (item) => item.route === location.pathname
  )

  return (
    <div className="relative">
      <div className="flex items-center gap-x-6">
        {isTabletOrMobile && (
          <button
            className="border-[0.5px] border-solid border-zinc-200 px-2 py-[7px] rounded-sm shadow-sm"
            onClick={() => setIsOpen()}
          >
            <List size={16} weight="bold" />
          </button>
        )}
        <h1 className="text-xl font-bold">
          {currentMenuItem ? currentMenuItem.label : ""}
        </h1>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen()}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out">
            <Sidebar />
          </div>
        </>
      )}
    </div>
  )
}
