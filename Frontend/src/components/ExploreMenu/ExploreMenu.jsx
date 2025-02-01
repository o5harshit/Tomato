/* eslint-disable react/prop-types */
import React from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore Our Menu</h1>
        <p>
          choose from a diverse menu featuring a delectable array of dishes.Our
          mission is to stasify what the customer want
        </p>
        <div className="explore-menu-list">
          {menu_list.map((data, index) => {
            return (
              <div
                onClick={() =>
                  setcategory((prev) =>
                    prev === data.menu_name ? "All" : data.menu_name
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === data.menu_name ? "active" : ""}
                  src={data.menu_image}
                  alt={data.menu_name}
                />
                <p>{data.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ExploreMenu;
