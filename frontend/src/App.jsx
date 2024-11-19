import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import NavBar from './pages/Navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Verify from './pages/verify/verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import AllOrder from './pages/AllOrder/AllOrder';
import InstrumentDetails from './pages/InstrumentDetails/InstrumentDetails';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const url = "http://localhost:5000";

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}      <div className="app">
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} /> {/* Corrected this line */}
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/documentation' element={<Add url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/AllOrders" element={<AllOrder url={url} />} />
          <Route path="/instrument/:id" element={<InstrumentDetails />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
