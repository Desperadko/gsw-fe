import { Route, Routes } from "react-router-dom"
import Home from "./Core/Pages/Home/Home"
import Register from "./Core/Pages/Register/Register"
import Login from "./Core/Pages/Login/Login"
import { AuthProvider } from "./Hooks/AuthProvider"
import { ROUTES } from "./Constants/RoutesConstants"
import Layout from "./Core/Components/Layout/Layout"

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
          </Route>
          <Route path={ROUTES.REGISTER} element={<Register />}></Route>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App