import { SignOut } from "@phosphor-icons/react"
import { useLogout, useMenu } from "@refinedev/core"
import { motion } from "framer-motion"

import { useSidebarStore } from "../../../store/useLayoutStore"
import { Button } from "../ui/button"
import { Menu } from "./menu"

export const Sidebar = () => {
  const { mutate: logout } = useLogout()

  const { menuItems, selectedKey } = useMenu()
  const { setIsOpen } = useSidebarStore()

  const isChildSelected = (children: any) => {
    return children.some(
      (child: any) =>
        child.key === selectedKey ||
        (child.children && isChildSelected(child.children))
    )
  }

  return (
    <motion.nav
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full p-4"
    >
      <a className="text-zinc-900 text-2xl px-4" href="/">
        Worbion.
      </a>
      <Menu
        menuItems={menuItems}
        isChildSelected={isChildSelected}
        setIsOpen={setIsOpen}
        selectedKey={selectedKey}
      />
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
