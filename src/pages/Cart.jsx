// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../context/CartContext';

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="container py-40 text-center space-y-12 animate-fade-up">
//         <div className="w-32 h-32 bg-primary/5 rounded-[40px] flex items-center justify-center mx-auto text-primary shadow-2xl shadow-primary/5 border border-white">
//           <ShoppingBag size={48} strokeWidth={1.5} />
//         </div>
//         <div className="space-y-4">
//           <h2 className="text-4xl font-black text-primary italic leading-none">Your basket is a <br /> clean slate.</h2>
//           <p className="text-primary/40 text-lg font-bold">Nature's finest await your selection.</p>
//         </div>
//         <Link to="/" className="btn-primary inline-flex mt-8 !rounded-full py-5 px-10">
//           Begin Sampling
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container pt-40 pb-40">
//       <div className="flex items-center justify-between mb-20">
//         <div className="space-y-4">
//           <div className="flex items-center gap-3">
//             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">The Selection</span>
//             <div className="w-8 h-[1px] bg-secondary/30" />
//           </div>
//           <h1 className="text-5xl md:text-7xl font-black text-primary leading-none">Your Basket.</h1>
//         </div>
//         <Link to="/" className="hidden md:flex items-center gap-2 text-xs font-black text-primary/30 hover:text-primary transition-all uppercase tracking-widest">
//           <ChevronLeft size={16} /> Continue Browsing
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
//         {/* Cart Items */}
//         <div className="lg:col-span-8 space-y-8">
//           <AnimatePresence>
//             {cart.map((item, i) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="group relative bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 flex flex-col sm:flex-row items-center gap-6 md:gap-10 border border-gray-50 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-700"
//               >
//                 <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0 rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-50 border border-white">
//                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
//                 </div>

//                 <div className="flex-1 text-center md:text-left space-y-4">
//                   <div className="space-y-1">
//                     <span className="text-[9px] font-black uppercase tracking-widest text-primary/30">{item.category.replace('-', ' ')}</span>
//                     <h3 className="text-2xl font-black text-primary leading-tight">{item.name}</h3>
//                   </div>

//                   <div className="flex flex-col md:flex-row md:items-center gap-6 pt-2">
//                     <div className="flex items-center justify-center md:justify-start bg-gray-50 border border-gray-100 rounded-2xl p-1 w-fit mx-auto md:mx-0">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-xl transition-all"
//                       >
//                         <Minus size={14} strokeWidth={3} />
//                       </button>
//                       <span className="w-10 text-center font-black text-primary text-lg">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-xl transition-all"
//                       >
//                         <Plus size={14} strokeWidth={3} />
//                       </button>
//                     </div>

//                     <div className="flex flex-col md:items-end md:ml-auto">
//                       <p className="text-2xl font-black text-primary leading-tight">£{(item.price * item.quantity).toFixed(2)}</p>
//                       <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">£{item.price} per unit</p>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="absolute top-6 right-6 md:static p-4 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-500"
//                 >
//                   <Trash2 size={24} strokeWidth={1.5} />
//                 </button>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           <div className="pt-10 flex justify-center md:justify-start">
//             <Link to="/" className="text-primary font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 group">
//               <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
//                 <Plus size={20} />
//               </div>
//               Discover More Treasures
//             </Link>
//           </div>
//         </div>

//         {/* Summary Sidebar */}
//         <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
//           <div className="glass-card bg-white/60 p-10 space-y-10 border-white/60 shadow-[0_40px_100px_rgba(27,60,26,0.08)]">
//             <h3 className="text-2xl font-black text-primary italic">Summary.</h3>

//             <div className="space-y-6">
//               <div className="flex justify-between items-center text-primary/40 text-sm font-bold uppercase tracking-widest">
//                 <span>Total Items Selection</span>
//                 <span className="text-primary font-black">{cart.reduce((a, b) => a + b.quantity, 0)} Units</span>
//               </div>
//               <div className="flex justify-between items-center text-primary/40 text-sm font-bold uppercase tracking-widest">
//                 <span>Home Delivery</span>
//                 <span className="text-secondary font-black">COMPLIMENTARY</span>
//               </div>
//               <div className="pt-8 border-t border-primary/5 flex justify-between items-end">
//                 <div className="space-y-1">
//                   <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Grand Total</p>
//                   <p className="text-4xl md:text-5xl font-black text-primary leading-none">£{cartTotal.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-4 space-y-6">
//               <Link
//                 to="/checkout"
//                 className="w-full btn-primary py-6 rounded-[24px] flex items-center justify-center gap-3 text-xl shadow-2xl shadow-primary/20 group hover:scale-[1.02]"
//               >
//                 <span>Finalize Order</span>
//                 <ArrowRight size={24} className="group-hover:translate-x-2 transition-all" strokeWidth={3} />
//               </Link>

//               <div className="flex items-center justify-center gap-6 opacity-30 invert">
//                 {['visa', 'mastercard', 'paypal', 'apple-pay'].map(p => (
//                   <div key={p} className="h-6 w-10 bg-black rounded-sm" />
//                 ))}
//               </div>
//               <p className="text-[9px] text-primary/30 text-center font-black uppercase tracking-widest">
//                 Strictly Secure 256-bit Encrypted Pipeline
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../context/CartContext';

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="container py-32 text-center space-y-10">
//         <div className="w-28 h-28 bg-primary/5 rounded-[32px] flex items-center justify-center mx-auto text-primary">
//           <ShoppingBag size={40} />
//         </div>
//         <h2 className="text-3xl font-black text-primary">Your cart is empty</h2>
//         <Link to="/" className="btn-primary !rounded-full px-8 py-4">
//           Start Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container pt-16 md:pt-20 pb-40">

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-12">
//         <h1 className="text-3xl md:text-5xl font-black text-primary">
//           Your Cart
//         </h1>

//         <Link to="/" className="hidden md:flex items-center gap-2 text-xs font-black text-primary/40 hover:text-primary uppercase tracking-widest">
//           <ChevronLeft size={16} /> Continue Shopping
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//         {/* PRODUCTS */}
//         <div className="lg:col-span-8 space-y-6">
//           <AnimatePresence>
//             {cart.map((item, i) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="flex gap-4 md:gap-6 items-center bg-white rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition"
//               >

//                 {/* IMAGE */}
//                 <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50">
//                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                 </div>

//                 {/* DETAILS */}
//                 <div className="flex-1 space-y-2">
//                   <h3 className="text-base md:text-lg font-black text-primary leading-tight">
//                     {item.name}
//                   </h3>

//                   <p className="text-xs text-primary/40">
//                     £{item.selling_price || item.price} each
//                   </p>

//                   {/* QUANTITY */}
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="w-8 h-8 flex items-center justify-center border rounded-lg text-primary"
//                     >
//                       <Minus size={14} />
//                     </button>

//                     <span className="w-8 text-center font-black text-primary">
//                       {item.quantity}
//                     </span>

//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       disabled={item.quantity >= item.stock}
//                       className={`w-8 h-8 flex items-center justify-center border rounded-lg ${item.quantity >= item.stock ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-primary hover:bg-gray-50'}`}
//                     >
//                       <Plus size={14} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* PRICE */}
//                 <div className="text-right space-y-2">
//                   <p className="text-lg md:text-xl font-black text-primary">
//                     £{((item.selling_price || item.price) * item.quantity).toFixed(2)}
//                   </p>

//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-400 hover:text-red-600 text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>

//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* SUMMARY */}
//         <div className="lg:col-span-4">
//           <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6 sticky top-24">

//             <h3 className="text-xl font-black text-primary">
//               Order Summary
//             </h3>

//             <div className="space-y-4 text-sm">
//               <div className="flex justify-between text-primary/60">
//                 <span>Items</span>
//                 <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
//               </div>

//               {/* <div className="flex justify-between text-primary/60">
//                 <span>Delivery</span>
//                 <span className="text-green-600 font-bold">Free</span>
//               </div> */}

//               <div className="border-t pt-4 flex justify-between">
//                 <span className="font-black text-primary">Total</span>
//                 <span className="text-xl font-black text-primary">
//                   £{cartTotal.toFixed(2)}
//                 </span>
//               </div>
//             </div>

//             <Link
//               to="/checkout"
//               className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 text-lg"
//             >
//               Checkout <ArrowRight size={18} />
//             </Link>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Cart;
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  if (cart.length === 0) {
    return (
      <div className="container py-32 text-center space-y-10">
        <div className="w-28 h-28 bg-primary/5 rounded-[32px] flex items-center justify-center mx-auto text-primary">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-black text-primary">Your cart is empty</h2>
        <Link to="/" className="btn-primary !rounded-full px-8 py-4">
          Start Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="container pt-16 md:pt-20 pb-40">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-primary">
          Your Cart
        </h1>
        <Link to="/" className="hidden md:flex items-center gap-2 text-xs font-black text-primary/40 hover:text-primary uppercase tracking-widest">
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* PRODUCTS */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence>
            {cart.map((item, i) => (
              <motion.div
                key={item.cartItemId || item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 md:gap-6 items-center bg-white rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                {/* DETAILS */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-base md:text-lg font-black text-primary leading-tight">
                    {item.name} {item.variant_size && <span className="text-sm font-medium text-primary/60">({item.variant_size})</span>}
                  </h3>
                  <p className="text-xs text-primary/40">
                    £{item.selling_price || item.price} each
                  </p>
                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-lg text-primary"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-black text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className={`w-8 h-8 flex items-center justify-center border rounded-lg ${item.quantity >= item.stock ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-primary hover:bg-gray-50'}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                {/* PRICE */}
                <div className="text-right space-y-2">
                  <p className="text-lg md:text-xl font-black text-primary">
                    £{((item.selling_price || item.price) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.cartItemId || item.id)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6 sticky top-24">
            <h3 className="text-xl font-black text-primary">
              Order Summary
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-primary/60">
                <span>Items</span>
                <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-primary/60">
                <span>Delivery</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-black text-primary">Total</span>
                <span className="text-xl font-black text-primary">
                  £{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 text-lg"
            >
              Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
