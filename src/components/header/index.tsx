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

  interface MenuItem {
    key: string
    label: string
    route?: string
    icon?: React.ReactNode
    children?: MenuItem[]
  }

  /**
   * Recursive function to find the current menu item or sub-item based on the given path.
   *
   * @param items - Array of menu items to search through.
   * @param path - The current location path to match with menu item routes.
   * @returns The found MenuItem or null if no matching item is found.
   */
  const findCurrentMenuItem = (
    items: MenuItem[],
    path: string
  ): MenuItem | null => {
    for (const item of items) {
      // If the item's route matches the given path, return the item
      if (item.route === path) {
        return item
      }
      // If the item has children, recursively search through them
      if (item.children) {
        const found = findCurrentMenuItem(item.children, path)
        // If a matching item is found in the children, return it
        if (found) {
          return found
        }
      }
    }
    // If no matching item is found, return null
    return null
  }

  const currentMenuItem = findCurrentMenuItem(
    menuItems as MenuItem[],
    location.pathname
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
