import React, { useContext, useEffect } from "react";
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const verify = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  //   console.log(success);
  //   console.log(orderID);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    let res = await axios.post(url + "/order/verify", { success, orderId });
    // console.log(res);
    if (res.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default verify;
