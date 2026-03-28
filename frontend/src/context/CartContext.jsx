import { ToastContainer, toast,Bounce } from "react-toastify";

import { createContext, useContext, useState, useMemo, useEffect } from "react";

import API from "../services/api";  

const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

  // Fetch products from Spring Boot backend
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setProductsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setProductsLoading(false);
      });
  }, []);

  // Add item into the cart
  const addToCart = (product) => {
    toast.success("Item Added to Cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove Item from cart
  const removeFromCart = (productId, removeAll = false) => {
    toast.success("Item Removed From Cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (!existingItem) return prevCart;

      if (removeAll || existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      } else {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );


  return (
    <CartContext.Provider
      value={{
        products,
        productsLoading,
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        cartTotal,
        cartCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};;

export const useCart = () => useContext(CartContext);
