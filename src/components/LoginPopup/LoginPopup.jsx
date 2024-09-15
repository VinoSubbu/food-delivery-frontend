import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: currState === "Sign up" 
        ? Yup.string().required("Name is required") 
        : Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/user/login";
      } else {
        newUrl += "/user/register";
      }

      const res = await axios.post(newUrl, values);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }
    },
  });

  return (
    <div className="login-popup">
      <form onSubmit={formik.handleSubmit} className="login-ppopup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          {formik.touched.name && formik.errors.name && currState === "Sign up" ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
          
          <input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            placeholder="Your email"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            placeholder="Password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
