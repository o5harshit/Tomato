/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cardItems,setCardItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState("");
    const [food_list,setFood_List] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            CartFoodItems(localStorage.getItem("token"))
        }
    },[])

    useEffect( ()=>{
       fetchFoodlist();
    },[])

    const CartFoodItems = async(token) => {
        if(token){
            const response = await axios.get(url+"/api/cart/get",{headers : token});
            console.log(cardItems);
            setCardItems(response.data.message);
        }
    }

    const fetchFoodlist = async ()=>{
        const response = await axios.get(`${url}/api/food/list`);
        setFood_List(response.data.data);
    }

    const addToCart = async(itemId) => {
        if(!cardItems[itemId]){
            setCardItems((prev) => ({...prev,[itemId] : 1}));
        } else {
            setCardItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers : token})
        }
    }

    const removeFromCart = async (itemId) => {
        setCardItems((prev) =>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
           const response =  await axios.post(url+"/api/cart/remove",{itemId},{headers :token});
           console.log(response);
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cardItems){
            if(cardItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cardItems[item]
            }
        }
        return totalAmount
    }

    // useEffect(() => {
    //     console.log(cardItems);
    // },[cardItems]);

    const contextValue = {
        food_list,
        cardItems,
        setCardItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

