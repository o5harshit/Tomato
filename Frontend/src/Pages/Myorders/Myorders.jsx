import React, { useContext, useEffect, useState } from "react";
import "./myorders.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Myorders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);
  const getOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: { token },
      }
    );
    console.log(response);
    if (response.data.success) {
      setData(response.data.message);
    } else {
      console.log("error");
    }
  };
  console.log(data);
  return (
    <div className="my-orders">
      <h2>my Orders</h2>
      <div className="container">
        {data &&
          data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="icon" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + "x" + item.quantity;
                    } else {
                      return item.name + "x" + item.quantity + ",";
                    }
                  })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items : {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                <button onClick={getOrders}>Track Order</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Myorders;
