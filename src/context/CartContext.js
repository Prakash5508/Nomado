import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const EXTRA_PRICES = {
  extraCheese: 20,
  extraFries: 30,
  extraSauce: 10,
  spicy: 0,
};

function extrasAmount(custom = {}) {
  let sum = 0;
  if (!custom) return 0;
  if (custom.extraCheese) sum += EXTRA_PRICES.extraCheese;
  if (custom.extraFries) sum += EXTRA_PRICES.extraFries;
  if (custom.extraSauce) sum += EXTRA_PRICES.extraSauce;
  // spicy considered 0 but keep for extensibility
  return sum;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("nomad_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem("nomad_cart", JSON.stringify(cart));
  }, [cart]);

  // helper: consider same product+customization as same item to merge qty
  const sameKey = (a, b) => {
    if (!a || !b) return false;
    if (a.id !== b.id) return false;
    return JSON.stringify(a.customization || {}) === JSON.stringify(b.customization || {});
  };

  const addItem = (product) => {
    // product: { id, name, price, img, quantity, customization }
    setCart((prev) => {
      const idx = prev.findIndex((it) => sameKey(it, product));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity || 1) + (product.quantity || 1) };
        return copy;
      }
      const cartId = `${product.id}-${Date.now()}-${Math.floor(Math.random()*10000)}`;
      return [...prev, { ...product, quantity: product.quantity || 1, cartId }];
    });
  };

  const removeItem = (cartId) => setCart((p) => p.filter((it) => it.cartId !== cartId));

  const updateQuantity = (cartId, qty) => {
    if (qty < 1) return;
    setCart((p) => p.map((it) => (it.cartId === cartId ? { ...it, quantity: qty } : it)));
  };

  const updateCustomization = (cartId, customization) => {
    setCart((p) => p.map((it) => (it.cartId === cartId ? { ...it, customization } : it)));
  };

  const clearCart = () => setCart([]);

  const itemTotal = (item) => {
    const extras = extrasAmount(item.customization);
    return (Number(item.price) + extras) * Number(item.quantity || 1);
  };

  const subtotal = () => cart.reduce((s, it) => s + itemTotal(it), 0);

  const summary = ({ taxRate = 0.05, delivery = 30, discount = 0 } = {}) => {
    const sub = subtotal();
    const discountAmt = discount > 0 ? discount : 0;
    const taxed = (sub - discountAmt) * taxRate;
    const total = Math.max(0, sub - discountAmt + taxed + (cart.length ? delivery : 0));
    return {
      subtotal: sub,
      discount: discountAmt,
      tax: taxed,
      delivery: cart.length ? delivery : 0,
      total,
    };
  };

  const count = () => cart.reduce((s, it) => s + (it.quantity || 0), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      updateCustomization,
      clearCart,
      itemTotal,
      subtotal,
      summary,
      count
    }}>
      {children}
    </CartContext.Provider>
  );
}
