import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://backend-kcnl.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [load, setLoad] = useState(false);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itenInfo = food_list.find((product) => product._id === item);
        totalAmount += itenInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFooList = async () => {
    const res = await axios.get(url + "/food/list");
    if (res.data.success) {
      setFoodList(res.data.data);
      setLoad(true);
    }
  };

  const loadCartData = async (token) => {
    const res = await axios.post(url + "/cart/get", {}, { headers: { token } });
    setCartItems(res.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFooList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    load,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
