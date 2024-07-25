import { Authenticated, Refine } from "@refinedev/core"
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6"
import dataProvider from "@refinedev/simple-rest"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import "./App.css"
import { authProvider } from "./authProvider"
import { Layout } from "./components/layout"
import { Login } from "./pages/login"

function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        authProvider={authProvider}
        routerProvider={routerBindings}
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
          ></Route>
          <Route
            element={
              <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  )
}

export default App
