import { Car, Cube, User } from "@phosphor-icons/react"
import { Authenticated, Refine } from "@refinedev/core"
import routerBindings, { CatchAllNavigate } from "@refinedev/react-router-v6"
import dataProvider from "@refinedev/simple-rest"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import "./App.css"
import { Layout } from "./components/layout"
import { RedirectAuthUser } from "./components/redirectAuthUser"
import { BreadCrumb } from "./components/templates"
import CategoryList from "./pages/CMS/ads"
import PostList from "./pages/CMS/posts"
import { CreateUser } from "./pages/create-user"
import { Dashboard } from "./pages/dashboard"
import { Errorcomponent } from "./pages/error"
import { Login } from "./pages/login"
import { authProvider } from "./providers/authProvider"

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
          {
            name: "CMS",
            icon: <Car size={16} />,
          },
          {
            name: "posts",
            list: "/CMS/posts",
            meta: {
              parent: "CMS",
            },
          },
          {
            name: "Ads",
            list: "/CMS/ads",
            meta: {
              parent: "CMS",
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
            <Route
              path="/create-user"
              element={
                <BreadCrumb>
                  <CreateUser />
                </BreadCrumb>
              }
            />
            <Route path="CMS">
              <Route path="posts">
                <Route
                  index
                  element={
                    <BreadCrumb>
                      <PostList />
                    </BreadCrumb>
                  }
                />
              </Route>
              <Route path="Ads">
                <Route
                  index
                  element={
                    <BreadCrumb>
                      <CategoryList />
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
