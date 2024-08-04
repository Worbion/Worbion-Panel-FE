import { Cube, User } from "@phosphor-icons/react"
import { Authenticated, Refine } from "@refinedev/core"
import routerBindings, { CatchAllNavigate } from "@refinedev/react-router-v6"
import dataProvider from "@refinedev/simple-rest"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import "./App.css"
import { Layout } from "./components/layout"
import { RedirectAuthUser } from "./components/redirectAuthUser"
import { BreadCrumb } from "./components/templates"
import { Dashboard } from "./pages/dashboard"
import { Errorcomponent } from "./pages/error"
import { Login } from "./pages/login"
import { CreateUser } from "./pages/users/create-users"
import { Empty } from "./pages/users/empty"
import { authProvider } from "./providers/auth-provider"

function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        authProvider={authProvider}
        routerProvider={routerBindings}
        resources={[
          {
            name: "Dashboard",
            icon: <Cube size={16} />,
            list: "/",
          },
          {
            name: "Users",
            icon: <User size={16} />,
          },
          {
            name: "Create Users",
            list: "/users/create-users",
            meta: {
              parent: "Users",
            },
          },
          {
            name: "Empty",
            list: "/users/empty",
            meta: {
              parent: "Users",
              canDelete: true,
            },
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated
                key="authenticated-inner"
                fallback={<CatchAllNavigate to="/login" />}
              >
                <Layout>
                  <Outlet />
                </Layout>
              </Authenticated>
            }
          >
            <Route
              path="/"
              element={
                <BreadCrumb>
                  <Dashboard />
                </BreadCrumb>
              }
            />
            <Route path="users">
              <Route path="create-users">
                <Route
                  index
                  element={
                    <BreadCrumb>
                      <CreateUser />
                    </BreadCrumb>
                  }
                />
              </Route>
              <Route path="empty">
                <Route
                  index
                  element={
                    <BreadCrumb>
                      <Empty />
                    </BreadCrumb>
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route
            element={
              <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                <RedirectAuthUser />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<Errorcomponent />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  )
}

export default App
