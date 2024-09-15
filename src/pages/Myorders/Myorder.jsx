import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
const Myorder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const res = await axios.post(
      url + "/order/userorders",
      {},
      { headers: { token } }
    );
   setData(res.data.data);
    // console.log(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="my_orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((e, i) => {
          return (
            <div key={i} className="my-order-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {e.items.map((item, index) => {
                  if (index === e.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p>${e.amount}.00</p>
              <p>Items:{e.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{e.status}</b>
              </p>
              <button onClick={fetchOrder}>Track order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorder;
