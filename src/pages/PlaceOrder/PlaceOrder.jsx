import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

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

  const onchaneHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const plcaeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let res = await axios.post(url + "/order/plcae", orderData, {
      headers: { token },
    });
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={plcaeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information </p>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onchaneHandler}
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            onChange={onchaneHandler}
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="email"
          onChange={onchaneHandler}
          name="email"
          value={data.email}
          placeholder="email Address"
        />
        <input
          required
          type="text"
          onChange={onchaneHandler}
          name="street"
          value={data.street}
          placeholder="street"
        />
        <div className="multi-fields">
          <input
            type="text"
            onChange={onchaneHandler}
            name="city"
            value={data.city}
            placeholder="city"
          />
          <input
            required
            type="text"
            onChange={onchaneHandler}
            name="state"
            value={data.state}
            placeholder="state"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onchaneHandler}
            name="zipcode"
            value={data.zipcaode}
            placeholder="Zip code"
          />
          <input
            required
            type="text"
            onChange={onchaneHandler}
            name="country"
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          onChange={onchaneHandler}
          name="phone"
          value={data.phone}
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCESS TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
