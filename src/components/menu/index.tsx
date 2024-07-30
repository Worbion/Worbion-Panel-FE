import { useLogout, useMenu } from "@refinedev/core"
import { NavLink } from "react-router-dom"

export const Menu = () => {
  const { mutate: logout } = useLogout()
  const { menuItems } = useMenu()

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.route ?? "/"}
              className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        onClick={() => logout()}
        className="mt-4 block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  )
}
