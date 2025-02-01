import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import StoreContextProvider from "./context/StoreContext";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopus from "./components/LoginPopup/LoginPopus";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <StoreContextProvider>
        {showLogin ? <LoginPopus setShowLogin={setShowLogin} /> : <></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <Outlet />
        </div>
        <Footer />
      </StoreContextProvider>
    </>
  );
}

export default App;
