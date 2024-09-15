import React from "react";
import "./ExporeManu.css";
import { menu_list } from "../../assets/assets";
const ExporeManu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus error
        explicabo quae necessitatibus doloremque aliquam laborum reprehenderit,
        harum modi, tempore deleniti cupiditate labore porro officia est
        consequatur dicta a suscipit!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              className="explore-menu-list-item"
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                );
              }}
              key={index}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExporeManu;
