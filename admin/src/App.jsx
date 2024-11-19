import NavBar from "./components/Navbar/NavBar"
import SideBar from "./components/sidebar/SideBar"
import { Route, Routes } from "react-router-dom"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Order from "./pages/Order/Order"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const url = "http://localhost:5000";

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App