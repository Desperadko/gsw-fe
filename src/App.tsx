import { Route, Routes } from "react-router-dom"
import Home from "./Core/Pages/Home/Home"
import Register from "./Core/Pages/Register/Register"
import Login from "./Core/Pages/Login/Login"
import ProtectedRoute from "./Wrappers/ProtectedRoute"
import { AuthProvider } from "./Hooks/AuthProvider"
import { ROUTES } from "./Constants/RoutesConstants"

function App() {
  console.log("rendered");

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.HOME} element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path={ROUTES.REGISTER} element={<Register />}></Route>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App