"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("purchases");
    if (saved) setPurchases(JSON.parse(saved));
  }, []);

  // Bug 2: no duplicate check
  function addToCart(course) {
    setCart(prev => [...prev, course]);
  }

  function removeFromCart(courseId) {
    setCart(prev => prev.filter(c => c.id !== courseId));
  }

  function clearCart() {
    setCart([]);
  }

  function completePurchase(courseIds) {
    const newPurchases = [...purchases, ...courseIds];
    setPurchases(newPurchases);
    localStorage.setItem("purchases", JSON.stringify(newPurchases));
    clearCart();
  }

  function isPurchased(courseId) {
    return purchases.includes(courseId);
  }

  const total = cart.reduce((sum, c) => sum + c.price, 0);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart, completePurchase, isPurchased }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
