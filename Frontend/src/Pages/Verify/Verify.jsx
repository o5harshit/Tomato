import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId");
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();
  useEffect(() =>{
    verifyPayment();
  },[])
  console.log(success,orderId);
  const verifyPayment = async() => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success){
      toast.success("Your Order is placed");
      navigate("/myorders");
    } else {
      toast.error("Your order wasn't successfull..Try again!!");
      navigate("/");
    }
  }

 
  return (
    <div className='verify'>
      <div className="spinner">
      </div>
    </div>
  )
}

export default Verify