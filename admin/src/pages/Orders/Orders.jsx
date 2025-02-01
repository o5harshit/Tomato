import React from "react";
import axios from "axios";
import "./Orders.css";
import { useState } from "react";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Orders = () => {
  const [data, dataset] = useState([]);
  const url = "http://localhost:4000";
  useEffect(() => {
    listOfOrders();
  }, []);
  const listOfOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    console.log(response);
    if (response.data.success) {
      dataset(response.data.message);
    } else {
      toast.error("error");
    }
  };
  const statusCheck = async(event,id) => {
    const response = await axios.post(url+"/api/order/status",{id : id,status : event.target.value});
    if(response.data.success){
      toast.success("The Order Status Updated");
    } else {
      toast.error("Error to Update The Status of Error");
    }
  }
  console.log(data);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {data.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="icon" />
              <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={() => statusCheck(event,order._id)}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
