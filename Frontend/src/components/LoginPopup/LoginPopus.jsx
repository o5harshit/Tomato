import React, { useContext, useState } from "react";
import "./LoginPopus.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"


// eslint-disable-next-line react/prop-types
const LoginPopus = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  // const url = useContext(StoreContext);
  const url = "http://localhost:4000";
  const {setToken,token} = useContext(StoreContext);
  const [Userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    let newUrl = url;
    if(currState === "Login"){
      newUrl+="/api/user/login";
    } else{
      newUrl+="/api/user/register";
    }
    const response = await axios.post(newUrl,Userdata);
    console.log(response);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      console.log(token);
      setShowLogin(false);
      setUserdata({
        name: "",
        email: "",
        password: "",
      })
      console.log("ok");
    } else{
      alert(response.data.message);
    }
  }
  return (
    <div className="login-popup">
      <form onSubmit={(event) =>onSubmitHandler(event)} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              type="text"
              value={Userdata.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="text"
            name="email"
            value={Userdata.email}
            onChange={onChangeHandler}
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={Userdata.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopus;
