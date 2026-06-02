// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem('nirven_cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('nirven_cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product, quantity) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         let newQuantity = existingItem.quantity + quantity;
//         if (newQuantity > product.stock) newQuantity = product.stock;
        
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: newQuantity, stock: product.stock }
//             : item
//         );
//       }
      
//       let initialQuantity = quantity;
//       if (initialQuantity > product.stock) initialQuantity = product.stock;
      
//       return [...prevCart, { ...product, quantity: initialQuantity }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity < 1) return removeFromCart(productId);
//     setCart((prevCart) =>
//       prevCart.map((item) => {
//         if (item.id === productId) {
//           let newQuantity = quantity;
//           if (newQuantity > item.stock) newQuantity = item.stock;
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       })
//     );
//   };

//   const clearCart = () => setCart([]);

//   const cartTotal = cart.reduce((total, item) => total + (item.selling_price || item.price) * item.quantity, 0);
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         cartTotal,
//         cartCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('nirven_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem('nirven_cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product, quantity, variant = null) => {
    setCart((prevCart) => {
      const cartItemId = variant ? `${product.id}-${variant.id}` : `${product.id}`;
      const stockLimit = variant ? variant.stock : product.stock;
      const priceToUse = variant ? variant.price : (product.selling_price || product.price);
      
      const existingItemIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      
      if (existingItemIndex >= 0) {
        const existingItem = prevCart[existingItemIndex];
        let newQuantity = existingItem.quantity + quantity;
        if (newQuantity > stockLimit) newQuantity = stockLimit;
        
        const newCart = [...prevCart];
        newCart[existingItemIndex] = { ...existingItem, quantity: newQuantity, stock: stockLimit };
        return newCart;
      }
      
      let initialQuantity = quantity;
      if (initialQuantity > stockLimit) initialQuantity = stockLimit;
      
      return [...prevCart, { 
        ...product, 
        cartItemId, 
        variant_id: variant ? variant.id : null,
        variant_size: variant ? variant.size : null,
        selling_price: priceToUse,
        stock: stockLimit,
        quantity: initialQuantity 
      }];
    });
  };
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => (item.cartItemId || item.id) !== cartItemId));
  };
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return removeFromCart(cartItemId);
    setCart((prevCart) =>
      prevCart.map((item) => {
        if ((item.cartItemId || item.id) === cartItemId) {
          let newQuantity = quantity;
          if (newQuantity > item.stock) newQuantity = item.stock;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((total, item) => total + (item.selling_price || item.price) * item.quantity, 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
