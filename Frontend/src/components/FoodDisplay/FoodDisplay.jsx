// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {
          food_list.map((data,index) =>{
            if(category === "All" || category === data.category){
            return <Fooditem id={data._id} name={data.name} description={data.description} price={data.price} image={data.image} key={index}/>
            }
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay