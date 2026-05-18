import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, Leaf, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import axios from 'axios';

// Custom Confetti Component to avoid external dependency issues
const ConfettiEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#1B3C1A', '#2D5A27', '#FFD700', '#A5D6A7', '#F0F4F0'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
      angle: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
            animate={{
              y: '110vh',
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              rotate: p.angle + 360,
              opacity: 0
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.id % 2 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const OrderSuccess = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const { clearCart } = useCart();

  const [verifying, setVerifying] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const verifiedRef = React.useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (verifiedRef.current) return;
      verifiedRef.current = true;

      const query = new URLSearchParams(location.search);
      const sessionId = query.get('session_id');

      if (!sessionId) {
        setVerifying(false);
        setPaymentSuccess(true);
        return;
      }

      try {
        const { data } = await axios.post('orders/verify_payment/', { session_id: sessionId });
        if (data.status === 'success') {
          clearCart();
          setPaymentSuccess(true);
          setOrderDetails(data.order);
        } else {
          setPaymentSuccess(false);
        }
      } catch (err) {
        console.error("Payment verification failed", err);
        setPaymentSuccess(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location, clearCart]);

  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-fresh/30 space-y-4">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
        <h2 className="text-xl font-bold text-primary">Verifying Payment...</h2>
      </div>
    );
  }

  if (!paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-fresh/30 space-y-6 text-center px-4">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold">!</span>
        </div>
        <h1 className="text-3xl font-black text-primary">Payment Verification Failed</h1>
        <p className="text-primary/60">We couldn't verify your payment. Please check your profile or contact support.</p>
        <Link to="/profile" className="btn-primary py-3 px-8 rounded-xl">Go to Profile</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-fresh/30 pt-40 pb-40 flex items-center justify-center container relative">
      <ConfettiEffect />

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="relative w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary shadow-2xl shadow-primary/10"
        >
          <CheckCircle2 size={64} strokeWidth={1.5} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full scale-125"
          />
        </motion.div>

        {/* Success Message */}
        <div className="space-y-6">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-primary italic leading-none"
          >
            Your Order is <br /> confirmed
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-primary/40 text-lg font-bold tracking-tight">Order Identification: <span className="text-primary">{orderNumber}</span></p>
            {/* <p className="text-primary/40 text-lg font-bold max-w-md mx-auto">
              Nature's finest are being prepared for their journey to you.
              Check your email for the complete itinerary.
            </p> */}
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-10 w-full flex justify-center"
        >
          {orderDetails && orderDetails.items && (
            <div className="w-full max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl font-black text-primary text-left">Order Summary</h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/10 space-y-4">
                {orderDetails.items.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center border-b border-primary/5 pb-4 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-primary/10 bg-gray-50">
                      {item.product_details?.image && (
                        <img src={item.product_details.image} alt={item.product_details.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-bold text-primary">{item.product_details?.name || 'Product'}</h4>
                      <p className="text-[10px] text-primary/50 uppercase tracking-widest">Qty: {item.quantity} × £{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-primary">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-primary/10 pt-4 mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-primary/60">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary">£{(orderDetails.total_amount - orderDetails.delivery_fee).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary/60">
                    <span>Delivery</span>
                    <span className="font-bold text-primary">
                      {orderDetails.delivery_fee == 0 ? 'Free' : `£${orderDetails.delivery_fee}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-primary uppercase text-xs tracking-widest">Total Paid</span>
                    <span className="text-xl font-black text-primary">£{orderDetails.total_amount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-10 flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-6 opacity-30 pb-4">
            <div className="w-12 h-[1px] bg-primary" />
            <Leaf size={24} className="text-primary" />
            <div className="w-12 h-[1px] bg-primary" />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Link to="/profile" className="btn-primary !rounded-full py-5 px-12 text-lg flex items-center gap-3">
              Track in Profile <ArrowRight size={20} />
            </Link>
            <Link to="/" className="text-primary font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all py-5">
              Return to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
