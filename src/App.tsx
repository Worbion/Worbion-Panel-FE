import { Cube, User } from "@phosphor-icons/react"
import { Authenticated, Refine } from "@refinedev/core"
import routerBindings, { CatchAllNavigate } from "@refinedev/react-router-v6"
import dataProvider from "@refinedev/simple-rest"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import "./App.css"
import { authProvider } from "./authProvider"
import { Layout } from "./components/layout"
import { RedirectAuthUser } from "./components/redirectAuthUser"
import { BreadCrumb } from "./components/templates"
import { CreateUser } from "./pages/create-user"
import { Dashboard } from "./pages/dashboard"
import { Login } from "./pages/login"
import { NotFound } from "./pages/not-found"

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
            name: "Create User",
            icon: <User size={16} />,
            list: "/create-user",
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
            <Route
              path="/create-user"
              element={
                <BreadCrumb>
                  <CreateUser />
                </BreadCrumb>
              }
            />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  )
}

export default App
