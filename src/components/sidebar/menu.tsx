import { CaretDown, CaretUp } from "@phosphor-icons/react"
import { useMenu } from "@refinedev/core"
import { TreeMenuItem } from "@refinedev/core/dist/hooks/menu/useMenu"
import { useState } from "react"
import { NavLink } from "react-router-dom"

interface IMenuProps {
  menuItems: TreeMenuItem[]
  isChildSelected: (children: TreeMenuItem["children"]) => boolean
  setIsOpen: (state?: boolean) => void
  selectedKey: string
}

export const Menu = ({
  menuItems,
  isChildSelected,
  setIsOpen,
  selectedKey,
}: IMenuProps) => {
  // State to manage the open/close state of each menu item
  const [openKeys, setOpenKeys] = useState({})

  // Function to toggle the open/close state of a menu item
  const toggleMenu = (key: string) => {
    setOpenKeys((prev: any) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ul className="flex-grow space-y-2 my-6">
      {menuItems.map(({ key, label, route, icon, children }: TreeMenuItem) => {
        const isSelected =
          key === selectedKey || (children && isChildSelected(children))
        //@ts-ignore
        const isOpen = openKeys[key] || false
        return (
          <li key={key}>
            {route ? (
              <NavLink
                to={route}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-x-3 px-4 py-2 font-medium text-[15px] rounded ${
                  isSelected ? "text-zinc-900 bg-zinc-100" : "text-zinc-600"
                }`}
              >
                {icon}
                {label}
              </NavLink>
            ) : (
              <div
                className={
                  "flex items-center justify-between gap-x-3 px-4 py-2 font-medium text-[15px] rounded cursor-pointer"
                }
                onClick={() => toggleMenu(key)}
              >
                <div className="flex items-center gap-x-3">
                  {icon}
                  {label}
                </div>
                {isOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
              </div>
            )}
            {children && isOpen && (
              <ul className="pl-4 space-y-2">
                {children.map((child: any) => {
                  const isChildItemSelected = child.key === selectedKey
                  return (
                    <li key={child.key}>
                      <NavLink
                        to={child.route ?? "/"}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-x-3 px-4 py-2 font-medium text-[15px] rounded ${
                          isChildItemSelected
                            ? "text-zinc-900 bg-zinc-100"
                            : "text-zinc-600"
                        }`}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
