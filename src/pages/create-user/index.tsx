import { useMenu } from "@refinedev/core"
import { useLocation } from "react-router-dom"

export const CreateUser = () => {
  const { menuItems } = useMenu()
  const location = useLocation()
  const currentMenuItem = menuItems.find(
    (item) => item.route === location.pathname
  )

  return (
    <div>
      <main className="mt-6">
        <h1 className="text-2xl">Create User</h1>
      </main>
    </div>
  )
}
