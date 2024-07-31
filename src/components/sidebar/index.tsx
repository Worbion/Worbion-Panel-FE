import { SignOut } from "@phosphor-icons/react"
import { useLogout, useMenu } from "@refinedev/core"
import { motion } from "framer-motion"
import { NavLink } from "react-router-dom"

import { useSidebarStore } from "../../../store/useLayoutStore"
import { Button } from "../ui/button"

export const Sidebar = () => {
  const { mutate: logout } = useLogout()
  const { menuItems, selectedKey } = useMenu()
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <motion.nav
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full p-4"
    >
      <h1 className="text-zinc-900 text-2xl px-4">Worbion.</h1>
      <ul className="flex-grow space-y-2 my-6">
        {menuItems.map(({ key, label, route, icon }) => {
          const isSelected = key === selectedKey
          return (
            <li key={key}>
              <NavLink
                to={route ?? "/"}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-x-3 px-4 py-2 font-medium text-[15px] rounded ${
                  isSelected ? "text-zinc-900 bg-zinc-100" : "text-zinc-600"
                }`}
              >
                {icon}
                {label}
              </NavLink>
            </li>
          )
        })}
      </ul>
      <Button
        variant="outline"
        className="flex gap-x-4 w-full mt-auto"
        onClick={() => logout()}
      >
        <SignOut size={16} weight="bold" />
        Sign out
      </Button>
    </motion.nav>
  )
}
