// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { CreditCard, Plus, CheckCircle2, ArrowLeft, ChevronRight, ShieldCheck, Truck } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// const Checkout = () => {
//   const { cart, cartTotal, clearCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [step, setStep] = useState(1);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [deliveryConfig, setDeliveryConfig] = useState(null);
//   const [deliveryFee, setDeliveryFee] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       navigate('/auth', { state: { from: { pathname: '/checkout' } } });
//       return;
//     }
    
//     if (cart.length === 0) {
//       navigate('/cart');
//       return;
//     }

//     const query = new URLSearchParams(location.search);
//     if (query.get('cancelled')) {
//       setError("Payment was cancelled. You can try again.");
//       setStep(2);
      
//       const orderId = query.get('order_id');
//       if (orderId) {
//         axios.post(`orders/${orderId}/cancel_order/`).catch(err => console.error("Error cancelling order:", err));
//         // Remove query parameters from URL to prevent duplicate calls
//         window.history.replaceState({}, '', '/checkout');
//       }
//     }

//     fetchAddresses();
//     fetchDeliveryConfig();
//   }, [user, cart, navigate, location]);

//   const fetchAddresses = async () => {
//     try {
//       const { data } = await axios.get('addresses/');
//       setAddresses(data);
//       if (data.length > 0) {
//         setSelectedAddress(data[0].id);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchDeliveryConfig = async () => {
//     try {
//       const { data } = await axios.get('delivery-config/');
//       setDeliveryConfig(data);
//       calculateDelivery(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const calculateDelivery = (config) => {
//     if (!config) return;
    
//     let totalWeight = 0;
//     cart.forEach(item => {
//       const weight = item.weight ? parseFloat(item.weight) : 1; 
//       totalWeight += weight * item.quantity;
//     });

//     if (cartTotal <= parseFloat(config.free_delivery_threshold) || totalWeight >= parseFloat(config.max_weight_for_free)) {
//       setDeliveryFee(parseFloat(config.standard_delivery_charge));
//     } else {
//       setDeliveryFee(0);
//     }
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     setIsProcessing(true);
//     setError(null);

//     try {
//       const orderData = {
//         address_id: selectedAddress,
//         items: cart.map(item => ({ product_id: item.id, quantity: item.quantity }))
//       };
      
//       const { data } = await axios.post('orders/', orderData);
      
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         setError('Failed to get payment link. Please try again.');
//         setIsProcessing(false);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Payment failed. Please try again.');
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="container pt-16 md:pt-20 pb-40">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-10">
//         <h1 className="text-3xl md:text-5xl font-black text-primary">
//           Checkout
//         </h1>

//         <Link to="/cart" className="flex items-center gap-2 text-sm text-primary/60 hover:text-primary">
//           <ArrowLeft size={16} /> Back
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//         {/* LEFT SIDE */}
//         <div className="lg:col-span-8 space-y-8">

//           {/* ADDRESS */}
//           <div className="glass-card p-6 md:p-8 space-y-6">

//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-black text-primary">
//                 1. Delivery Address
//               </h2>
//               {step === 2 && (
//                 <button onClick={() => setStep(1)} className="text-xs font-black text-primary underline">Edit</button>
//               )}
//             </div>

//             {step === 1 && (
//               <>
//                 <div className="grid gap-4">
//                   {addresses.length === 0 && (
//                     <p className="text-sm text-primary/60">No addresses found. Please add an address in your profile.</p>
//                   )}
//                   {addresses.map(addr => (
//                     <div
//                       key={addr.id}
//                       onClick={() => setSelectedAddress(addr.id)}
//                       className={`p-4 rounded-xl border cursor-pointer transition ${selectedAddress === addr.id
//                         ? 'border-primary bg-primary/5'
//                         : 'border-gray-100 hover:border-primary/50'
//                         }`}
//                     >
//                       <div className="flex justify-between items-center">
//                         <p className="font-black text-primary text-sm uppercase">
//                           {addr.type}
//                         </p>
//                         {selectedAddress === addr.id && <CheckCircle2 size={18} className="text-primary" />}
//                       </div>
//                       <p className="text-xs text-primary/60 mt-1">
//                         {addr.address}
//                       </p>
//                     </div>
//                   ))}

//                   {/* Add new address */}
//                   <Link to="/profile" className="p-4 border border-dashed rounded-xl text-center text-primary/60 hover:border-primary hover:text-primary cursor-pointer transition-colors">
//                     + Add New Address in Profile
//                   </Link>
//                 </div>

//                 {/* Confirm Address */}
//                 <button
//                   onClick={() => setStep(2)}
//                   disabled={!selectedAddress}
//                   className={`btn-primary w-full py-4 rounded-xl transition-all ${!selectedAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   Confirm Address
//                 </button>
//               </>
//             )}
            
//             {step === 2 && selectedAddress && (
//               <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
//                  {addresses.find(a => a.id === selectedAddress)?.address}
//               </div>
//             )}
//           </div>

//           {/* PAYMENT */}
//           {step === 2 && (
//             <div className="glass-card p-6 md:p-8 space-y-6 animate-fade-up">

//               <h2 className="text-lg font-black text-primary">
//                 2. Payment Details
//               </h2>
              
//               {error && (
//                  <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold border border-red-100">
//                     {error}
//                  </div>
//               )}

//               <form onSubmit={handlePayment} className="grid gap-6">
//                 <p className="text-sm text-primary/60 mb-2">You will be redirected to our secure Stripe checkout page to complete your payment.</p>
                
//                 {/* Final Payment Button */}
//                 <button
//                   type="submit"
//                   disabled={isProcessing}
//                   className={`btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
//                 >
//                   {isProcessing ? 'Redirecting to Stripe...' : `Proceed to Pay £${(cartTotal + deliveryFee).toFixed(2)}`}
//                   {!isProcessing && <ChevronRight size={18} />}
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE SUMMARY */}
//         <div className="lg:col-span-4">
//           <div className="bg-white rounded-2xl p-6 space-y-6 border border-gray-100 sticky top-24 shadow-sm">

//             <h3 className="text-lg font-black text-primary">
//               Order Summary
//             </h3>

//             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//               {cart.map(item => (
//                 <div key={item.id} className="flex gap-4">
//                   <div className="w-16 h-16 rounded-xl border border-gray-100 overflow-hidden shrink-0">
//                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                   </div>
//                   <div className="flex-1">
//                      <h4 className="text-sm font-bold text-primary line-clamp-1">{item.name}</h4>
//                      <p className="text-[10px] text-primary/50 uppercase tracking-widest">{item.quantity} x £{item.price}</p>
//                      <p className="text-sm font-black text-primary">£{(item.price * item.quantity).toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t pt-4 space-y-3 text-sm">
//               <div className="flex justify-between text-primary/60">
//                 <span>Subtotal</span>
//                 <span className="font-bold text-primary">
//                   £{cartTotal.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between text-primary/60">
//                 <span>Delivery</span>
//                 <span className="font-bold text-primary">
//                   {deliveryFee === 0 ? <span className="text-green-500 uppercase text-[10px] tracking-widest">Free</span> : `£${deliveryFee.toFixed(2)}`}
//                 </span>
//               </div>
//             </div>
            
//             <div className="border-t pt-4 flex justify-between items-center">
//                <span className="font-black text-primary uppercase text-xs tracking-widest">Total</span>
//                <span className="text-2xl font-black text-primary">£{(cartTotal + deliveryFee).toFixed(2)}</span>
//             </div>

//             <div className="text-xs text-primary/50 space-y-2 pt-2 bg-gray-50 p-4 rounded-xl">
//               <div className="flex items-center gap-2">
//                 <Truck size={14} className="text-secondary" /> {deliveryFee === 0 ? 'Complimentary Delivery Applied' : 'Standard Delivery Rate'}
//               </div>
//               <div className="flex items-center gap-2">
//                 <ShieldCheck size={14} className="text-green-500" /> 256-bit Encrypted Transaction
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CreditCard, Plus, CheckCircle2, ArrowLeft, ChevronRight, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryConfig, setDeliveryConfig] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    const query = new URLSearchParams(location.search);
    if (query.get('cancelled')) {
      setError("Payment was cancelled. You can try again.");
      setStep(2);
      
      const orderId = query.get('order_id');
      if (orderId) {
        axios.post(`orders/${orderId}/cancel_order/`).catch(err => console.error("Error cancelling order:", err));
        // Remove query parameters from URL to prevent duplicate calls
        window.history.replaceState({}, '', '/checkout');
      }
    }
    fetchAddresses();
    fetchDeliveryConfig();
  }, [user, cart, navigate, location]);
  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get('addresses/');
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchDeliveryConfig = async () => {
    try {
      const { data } = await axios.get('delivery-config/');
      setDeliveryConfig(data);
      calculateDelivery(data);
    } catch (err) {
      console.error(err);
    }
  };
  const calculateDelivery = (config) => {
    if (!config) return;
    
    let totalWeight = 0;
    cart.forEach(item => {
      const weight = item.weight ? parseFloat(item.weight) : 1; 
      totalWeight += weight * item.quantity;
    });
    if (cartTotal <= parseFloat(config.free_delivery_threshold) || totalWeight >= parseFloat(config.max_weight_for_free)) {
      setDeliveryFee(parseFloat(config.standard_delivery_charge));
    } else {
      setDeliveryFee(0);
    }
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    try {
      const orderData = {
        address_id: selectedAddress,
        items: cart.map(item => ({ product_id: item.id, variant_id: item.variant_id || null, quantity: item.quantity }))
      };
      
      const { data } = await axios.post('orders/', orderData);
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Failed to get payment link. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };
  return (
    <div className="container pt-16 md:pt-20 pb-40">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-primary">
          Checkout
        </h1>
        <Link to="/cart" className="flex items-center gap-2 text-sm text-primary/60 hover:text-primary">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-8">
          {/* ADDRESS */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black text-primary">
                1. Delivery Address
              </h2>
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-xs font-black text-primary underline">Edit</button>
              )}
            </div>
            {step === 1 && (
              <>
                <div className="grid gap-4">
                  {addresses.length === 0 && (
                    <p className="text-sm text-primary/60">No addresses found. Please add an address in your profile.</p>
                  )}
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition ${selectedAddress === addr.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-100 hover:border-primary/50'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-black text-primary text-sm uppercase">
                          {addr.type}
                        </p>
                        {selectedAddress === addr.id && <CheckCircle2 size={18} className="text-primary" />}
                      </div>
                      <p className="text-xs text-primary/60 mt-1">
                        {addr.address}
                      </p>
                    </div>
                  ))}
                  {/* Add new address */}
                  <Link to="/profile" className="p-4 border border-dashed rounded-xl text-center text-primary/60 hover:border-primary hover:text-primary cursor-pointer transition-colors">
                    + Add New Address in Profile
                  </Link>
                </div>
                {/* Confirm Address */}
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedAddress}
                  className={`btn-primary w-full py-4 rounded-xl transition-all ${!selectedAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Confirm Address
                </button>
              </>
            )}
            
            {step === 2 && selectedAddress && (
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                 {addresses.find(a => a.id === selectedAddress)?.address}
              </div>
            )}
          </div>
          {/* PAYMENT */}
          {step === 2 && (
            <div className="glass-card p-6 md:p-8 space-y-6 animate-fade-up">
              <h2 className="text-lg font-black text-primary">
                2. Payment Details
              </h2>
              
              {error && (
                 <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold border border-red-100">
                    {error}
                 </div>
              )}
              <form onSubmit={handlePayment} className="grid gap-6">
                <p className="text-sm text-primary/60 mb-2">You will be redirected to our secure Stripe checkout page to complete your payment.</p>
                
                {/* Final Payment Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isProcessing ? 'Redirecting to Stripe...' : `Proceed to Pay £${(cartTotal + deliveryFee).toFixed(2)}`}
                  {!isProcessing && <ChevronRight size={18} />}
                </button>
              </form>
            </div>
          )}
        </div>
        {/* RIGHT SIDE SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 space-y-6 border border-gray-100 sticky top-24 shadow-sm">
            <h3 className="text-lg font-black text-primary">
              Order Summary
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl border border-gray-100 overflow-hidden shrink-0">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-bold text-primary line-clamp-1">{item.name} {item.variant_size && <span className="text-xs font-medium text-primary/60">({item.variant_size})</span>}</h4>
                     <p className="text-[10px] text-primary/50 uppercase tracking-widest">{item.quantity} x £{item.selling_price}</p>
                     <p className="text-sm font-black text-primary">£{(item.selling_price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-primary/60">
                <span>Subtotal</span>
                <span className="font-bold text-primary">
                  £{cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-primary/60">
                <span>Delivery</span>
                <span className="font-bold text-primary">
                  {deliveryFee === 0 ? <span className="text-green-500 uppercase text-[10px] tracking-widest">Free</span> : `£${deliveryFee.toFixed(2)}`}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center">
               <span className="font-black text-primary uppercase text-xs tracking-widest">Total</span>
               <span className="text-2xl font-black text-primary">£{(cartTotal + deliveryFee).toFixed(2)}</span>
            </div>
            <div className="text-xs text-primary/50 space-y-2 pt-2 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-secondary" /> {deliveryFee === 0 ? 'Complimentary Delivery Applied' : 'Standard Delivery Rate'}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-green-500" /> 256-bit Encrypted Transaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
