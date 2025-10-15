import { Route, Routes } from "react-router-dom"
import Home from "./Core/Pages/Home/Home"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App