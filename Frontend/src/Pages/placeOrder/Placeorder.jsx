import React, { useContext, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cardItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const handleFormData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    console.log(cardItems);
    food_list.forEach((item) => {
      if (cardItems[item._id] && cardItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cardItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    console.log(orderData);
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      console.log(session_url);
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            value={data.firstName}
            onChange={handleFormData}
            name="firstName"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            value={data.lastName}
            onChange={handleFormData}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="text"
          value={data.email}
          onChange={handleFormData}
          name="email"
          placeholder="Email Address"
        />
        <input
          required
          type="text"
          value={data.street}
          onChange={handleFormData}
          name="street"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            value={data.city}
            onChange={handleFormData}
            name="city"
            placeholder="City"
          />
          <input
            required
            type="text"
            value={data.state}
            onChange={handleFormData}
            name="state"
            placeholder="State"
          />
        </div>
      </div>
      <div className="multi-fields">
        <input
          required
          type="text"
          value={data.zipcode}
          onChange={handleFormData}
          name="zipcode"
          placeholder="Zip Code"
        />
        <input
          required
          type="text"
          name="country"
          value={data.country}
          onChange={handleFormData}
          placeholder="Country"
        />
      </div>
      <input
        required
        type="text"
        value={data.phone}
        onChange={handleFormData}
        name="phone"
        placeholder="Phone"
      />
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>💲Subtotal</p>
              <p>{0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>💲{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                💲{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
            <hr />
          </div>
          <button type="submit">PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
