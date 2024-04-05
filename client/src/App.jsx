import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Orders from "./pages/Orders"
import Admin from "./pages/Admin"
import FeedBack from "./pages/FeedBack"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/feedback" element={<FeedBack />} />
          {/* <Route path="/profile" element={<Profile/>}/> */}
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
