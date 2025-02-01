import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const {token,setToken} = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo-website" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        {/* <li onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-App</li> */}
        <a
          href="#footer"
          onClick={() => setMenu("Contact-us")}
          className={menu === "Contact-us" ? "active" : ""}
        >
          Contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="website-icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="icon" />
          </Link>
          { getTotalCartAmount() === 0 ? <></> : <div className="dot"></div>}
        </div>
        {token === ""?<button onClick={() => setShowLogin(true)}>Sign in</button> : <div className="navbar-profile"><img src={assets.profile_icon} alt="profile"/>
        <ul className="nav-profile-dropdown">
          <Link to="/myorders"><li><img src={assets.bag_icon} alt="bag" /><p>Orders</p></li></Link>
          <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
        </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
