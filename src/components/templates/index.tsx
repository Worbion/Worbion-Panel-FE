/*
-----------------------------------------
- Put component templates in this file  -
-----------------------------------------
*/
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PropsWithChildren } from "react"
import { useLocation } from "react-router-dom"

// Utility function to capitalize the first letter of a word
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const BreadCrumb: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()

  // Split the pathname into an array of strings, filtering out any empty strings
  const pathnames = location.pathname.split("/").filter((x) => x)

  return (
    <>
      <div className="mt-4">
        <Breadcrumb>
          <BreadcrumbList>
            {/* The first breadcrumb item is always "Home" */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* Map through the pathnames array to create breadcrumb items */}
            {pathnames.map((value, index) => {
              // Create a path for each breadcrumb item
              const to = `/${pathnames.slice(0, index + 1).join("/")}`
              // Check if the current item is the last in the array
              const isLast = index === pathnames.length - 1
              return (
                <span key={to}>
                  <BreadcrumbItem>
                    {/* If it's the last item, render it as plain text */}
                    {isLast ? (
                      <BreadcrumbLink>{capitalize(value)}</BreadcrumbLink>
                    ) : (
                      // Otherwise, render it as a link
                      <BreadcrumbLink href={to}>
                        {capitalize(value)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>{children}</div>
    </>
  )
}
