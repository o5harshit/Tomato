import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { toast } from "react-toastify";

const List = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [list, setlist] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const Response = await axios.get(`${url}/api/food/list`);
    if (Response.data.success) {
      console.log(Response);
      setlist(Response.data.data);
    } else {
      toast.error("Error Ocurred");
    }
  };

  const Deleteitem = async (foodid) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodid});
    await fetchdata();
    if(response.data.success){
      toast.success(response.data.message)
    } else {
      toast.error("Something Went Wrong")
    }
  }
  console.log(list);
  return (
    <div>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((data,index) =>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+data.image} alt="" />
              <p>{data.name}</p>
              <p>{data.category}</p>
              <p>{data.price}</p>
              <p  className="cursor" onClick={() => Deleteitem(data._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default List;
