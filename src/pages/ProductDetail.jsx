// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Star, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Heart, Share2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { PRODUCTS } from '../data/products';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [showToast, setShowToast] = useState(false);
//   const [activeImage, setActiveImage] = useState(0);

//   const product = PRODUCTS.find(p => p.id === parseInt(id));

//   if (!product) {
//     return (
//       <div className="container py-40 text-center space-y-8 animate-fade-up">
//         <h2 className="text-4xl font-black text-primary">Oops! Product not found.</h2>
//         <p className="text-gray-400 font-medium">It might have been harvested already. Try browsing our alternatives!</p>
//         <Link to="/" className="btn-primary inline-flex mt-4">Back to Nature</Link>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div className="container pt-32 pb-40">
//       {/* Back Button */}
//       <Link to="/" className="inline-flex items-center gap-3 text-gray-400 hover:text-primary mb-12 font-black text-xs uppercase tracking-widest transition-all group">
//         <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
//           <ArrowLeft size={16} />
//         </div>
//         <span>Back to Boutique</span>
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
//         {/* Left Column - Gallery (lg:span-7) */}
//         <div className="lg:col-span-7 space-y-8">
//           <motion.div 
//              initial={{ opacity: 0, scale: 0.95 }}
//              animate={{ opacity: 1, scale: 1 }}
//              className="relative aspect-square rounded-[40px] overflow-hidden bg-white border border-gray-50 shadow-2xl shadow-primary/5 group"
//           >
//             <img 
//                src={product.image} 
//                alt={product.name} 
//                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
//             />
//             {product.in_offer && (
//               <div className="absolute top-8 left-8 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest shadow-xl">
//                  PREMIUM OFFER
//               </div>
//             )}
//             <button className="absolute top-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-xl hover:bg-primary hover:text-white transition-all">
//                <Heart size={20} />
//             </button>
//           </motion.div>

//           {/* Thumbnails */}
//           <div className="grid grid-cols-4 gap-6 px-4">
//             {[1, 2, 3, 4].map((_, i) => (
//               <div 
//                 key={i} 
//                 className={`aspect-square rounded-3xl overflow-hidden cursor-pointer border-2 transition-all p-1 ${activeImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
//                 onClick={() => setActiveImage(i)}
//               >
//                 <img src={product.image} alt="" className="w-full h-full object-cover rounded-2xl" />
//               </div>
//             ))}
//           </div>

//           {/* Reviews Section Card */}
//           <div className="hidden lg:block glass-card p-10 mt-16 space-y-10 border-white/60">
//              <div className="flex justify-between items-end">
//                 <div className="space-y-2">
//                    <h3 className="text-3xl font-black text-primary">Customer Stories.</h3>
//                    <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-1 text-yellow-500">
//                          <Star size={14} className="fill-current" />
//                          <Star size={14} className="fill-current" />
//                          <Star size={14} className="fill-current" />
//                          <Star size={14} className="fill-current" />
//                          <Star size={14} className="fill-current" />
//                       </div>
//                       <span className="text-xs font-black text-primary/40 uppercase tracking-widest">{product.rating} / 5.0 Rating</span>
//                    </div>
//                 </div>
//                 <button className="text-primary font-black text-sm underline underline-offset-8">Write a story</button>
//              </div>

//              <div className="space-y-8">
//                 {[1, 2].map(i => (
//                    <div key={i} className="p-8 bg-white/40 rounded-3xl space-y-4 border border-white">
//                       <p className="text-primary/70 font-medium italic leading-relaxed">
//                         "Unbeatable quality. The freshness of Nirven's produce is truly on a different level compared to standard stores. The delivery was punctual and professional."
//                       </p>
//                       <div className="flex items-center gap-4">
//                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">AK</div>
//                          <div className="flex flex-col">
//                             <span className="text-sm font-black text-primary">Anjali K.</span>
//                             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Connoisseur</span>
//                          </div>
//                       </div>
//                    </div>
//                 ))}
//              </div>
//           </div>
//         </div>

//         {/* Right Column - Info (lg:span-5) - Sticky */}
//         <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
//           <div className="space-y-6">
//             <div className="flex items-center gap-3">
//                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">{product.category.replace('-', ' ')}</span>
//                <div className="w-8 h-[1px] bg-secondary/30" />
//                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">{product.subcategory || 'Organic'}</span>
//             </div>

//             <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight">{product.name}</h1>

//             <div className="flex items-baseline gap-4 pt-2">
//                <p className="text-4xl md:text-5xl font-black text-primary">£{product.price}</p>
//                {product.in_offer && <p className="text-xl md:text-2xl text-gray-300 line-through font-bold">£{(product.price * 1.2).toFixed(2)}</p>}
//             </div>

//             <p className="text-lg text-primary/60 font-medium leading-relaxed">
//                {product.description}
//             </p>
//           </div>

//           <div className="space-y-8 pt-6 border-t border-gray-100">
//             <div className="flex flex-col sm:flex-row items-center gap-6">
//               <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-2 w-full sm:w-auto">
//                 <button 
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   className="w-14 h-14 flex items-center justify-center text-gray-400 hover:text-primary transition-all rounded-xl hover:bg-white"
//                 >
//                   <Minus size={20} strokeWidth={3} />
//                 </button>
//                 <span className="w-14 text-center font-black text-xl text-primary">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(q => q + 1)}
//                   className="w-14 h-14 flex items-center justify-center text-gray-400 hover:text-primary transition-all rounded-xl hover:bg-white"
//                 >
//                   <Plus size={20} strokeWidth={3} />
//                 </button>
//               </div>

//               <button 
//                 onClick={handleAddToCart}
//                 className="flex-1 btn-primary group !rounded-[24px] py-5 px-10 text-xl shadow-2xl shadow-primary/20 w-full hover:scale-[1.02]"
//               >
//                 <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
//                 <span>Add to Basket</span>
//               </button>
//             </div>

//             {/* Share action */}
//             <div className="flex justify-center sm:justify-start">
//                <button className="flex items-center gap-2 text-xs font-black text-primary/30 hover:text-primary transition-all uppercase tracking-widest">
//                   <Share2 size={16} /> Share with others
//                </button>
//             </div>
//           </div>

//           {/* Redesigned Trust Badges */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-gray-100">
//              {[
//                { icon: <Truck size={20} />, label: "Express Fresh", sub: "Next Day" },
//                { icon: <ShieldCheck size={20} />, label: "Secure Pay", sub: "Encrypted" },
//                { icon: <RefreshCcw size={20} />, label: "Return Ease", sub: "3-Day Window" }
//              ].map((badge, i) => (
//                 <div key={i} className="flex flex-col items-center sm:items-start gap-2">
//                    <div className="w-10 h-10 bg-bg-fresh rounded-xl flex items-center justify-center text-primary">
//                       {badge.icon}
//                    </div>
//                    <p className="text-[10px] font-black uppercase text-primary tracking-widest mt-1">{badge.label}</p>
//                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{badge.sub}</p>
//                 </div>
//              ))}
//           </div>

//           {/* Mobile Reviews Section Helper */}
//           <div className="lg:hidden">
//              <button className="w-full py-4 text-center border-2 border-primary/10 rounded-2xl font-black text-primary text-sm uppercase tracking-widest">View 124 Verified Reviews</button>
//           </div>
//         </div>
//       </div>

//       {/* Toast Notification */}
//       <AnimatePresence>
//         {showToast && (
//           <motion.div 
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-sm"
//           >
//             <div className="bg-primary text-white p-4 md:p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border border-white/20">
//                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
//                   <ShoppingBag size={24} />
//                </div>
//                <div className="flex-1">
//                   <p className="font-black text-sm uppercase tracking-widest">Added Successfully</p>
//                   <p className="text-[10px] text-white/60 font-medium">Continue your premium journey</p>
//                </div>
//                <Link to="/cart" className="text-[10px] font-black text-secondary underline decoration-2 underline-offset-4">VIEW BASKET</Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductDetail;
// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Star, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Heart } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { fetchProductById } from '../services/api';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [showToast, setShowToast] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   React.useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       const prod = await fetchProductById(id);
//       setProduct(prod);
//       setLoading(false);
//     };
//     loadData();
//   }, [id]);

//   if (loading) {
//     return <div className="container py-40 text-center"><p>Loading...</p></div>;
//   }

//   if (!product) {
//     return (
//       <div className="container py-40 text-center space-y-8 animate-fade-up">
//         <h2 className="text-4xl font-black text-primary">Oops! Product not found.</h2>
//         <p className="text-gray-400 font-medium">It might have been harvested already. Try browsing our alternatives!</p>
//         <Link to="/" className="btn-primary inline-flex mt-4">Back to Nature</Link>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div className="container pt-16 md:pt-20 pb-40 overflow-x-hidden">
//       {/* Back Button */}
//       <Link to="/" className="inline-flex items-center gap-3 text-gray-400 hover:text-primary mb-12 font-black text-xs uppercase tracking-widest transition-all group">
//         <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
//           <ArrowLeft size={16} />
//         </div>
//         <span>Back to Home</span>
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
//         {/* Left Column */}
//         <div className="lg:col-span-7 space-y-8">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative aspect-square rounded-[40px] overflow-hidden bg-white border border-gray-50 shadow-2xl shadow-primary/5 group"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
//             />
//             {product.stock === 0 && (
//               <div className="absolute top-8 left-8 bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest shadow-xl">
//                 OUT OF STOCK
//               </div>
//             )}
//             {product.stock > 0 && product.in_offer && (
//               <div className="absolute top-8 left-8 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest shadow-xl">
//                 PREMIUM OFFER
//               </div>
//             )}
//             <button className="absolute top-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-xl hover:bg-primary hover:text-white transition-all">
//               <Heart size={20} />
//             </button>
//           </motion.div>
//         </div>

//         {/* Right Column */}
//         <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
//           <div className="space-y-6">
//             <div className="flex items-center gap-3">
//               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">{product.category_name || 'Organic'}</span>
//               <div className="w-8 h-[1px] bg-secondary/30" />
//             </div>

//             <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight">{product.name}</h1>

//            <div className="flex flex-col gap-2 pt-2">

//   <div className="flex items-baseline gap-4">
//     <p className="text-4xl md:text-5xl font-black text-primary">
//       £{product.selling_price}
//     </p>

//     {product.quantity_description && (
//       <span className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-[0.25em]">
//         / {product.quantity_description}
//       </span>
//     )}

//     {product.original_price > product.selling_price && (
//       <p className="text-xl md:text-2xl text-gray-300 line-through font-bold">
//         £{product.original_price}
//       </p>
//     )}
//   </div>

// </div>

//             <p className="text-lg text-primary/60 font-medium leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           <div className="space-y-6 pt-6 border-t border-gray-100">
//             <div className="flex flex-col sm:flex-row items-center gap-4">

//               {/* Quantity Stepper */}
//               <div className={`flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1 gap-2 w-fit mx-auto sm:mx-0 ${product.stock === 0 ? 'opacity-50 pointer-events-none' : ''}`}>

//                 <button
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-primary rounded-lg hover:bg-white transition-all"
//                   disabled={product.stock === 0}
//                 >
//                   <Minus size={16} className="md:w-5 md:h-5" strokeWidth={3} />
//                 </button>

//                 <span className="w-8 text-center font-black text-base md:text-xl text-primary">
//                   {quantity}
//                 </span>

//                 <button
//                   onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
//                   className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-primary rounded-lg hover:bg-white transition-all"
//                   disabled={product.stock === 0 || quantity >= product.stock}
//                 >
//                   <Plus size={16} className="md:w-5 md:h-5" strokeWidth={3} />
//                 </button>

//               </div>

//               {/* Add to Cart */}
//               <button
//                 onClick={handleAddToCart}
//                 disabled={product.stock === 0}
//                 className={`flex-1 group !rounded-[24px] py-4 md:py-5 px-8 md:px-10 text-base md:text-xl shadow-2xl shadow-primary/20 w-full hover:scale-[1.02] flex items-center justify-center gap-2 ${product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'btn-primary'}`}
//               >
//                 <ShoppingBag size={20} className="md:w-6 md:h-6" />
//                 <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Basket'}</span>
//               </button>

//             </div>
//           </div>

//           {/* Trust Badges */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-gray-100">
//             {[
//               { icon: <Truck size={20} />, label: "Express Fresh", sub: "Next Day" },
//               { icon: <ShieldCheck size={20} />, label: "Secure Pay", sub: "Encrypted" },
//               { icon: <RefreshCcw size={20} />, label: "Return Ease", sub: "3-Day Window" }
//             ].map((badge, i) => (
//               <div key={i} className="flex flex-col items-center sm:items-start gap-2">
//                 <div className="w-10 h-10 bg-bg-fresh rounded-xl flex items-center justify-center text-primary">
//                   {badge.icon}
//                 </div>
//                 <p className="text-[10px] font-black uppercase text-primary tracking-widest mt-1">{badge.label}</p>
//                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{badge.sub}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Toast */}
//       <AnimatePresence>
//         {showToast && (
//           <motion.div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-sm">
//             <div className="bg-primary text-white p-4 md:p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border border-white/20">
//               <ShoppingBag size={24} />
//               <div className="flex-1">
//                 <p className="font-black text-sm uppercase tracking-widest">Added Successfully</p>
//               </div>
//               <Link to="/cart" className="text-[10px] font-black text-secondary underline">VIEW BASKET</Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../services/api';
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const prod = await fetchProductById(id);
      setProduct(prod);
      if (prod && prod.variants && prod.variants.length > 0) {
        setSelectedVariant(prod.variants[0]);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);
  if (loading) {
    return <div className="container py-40 text-center"><p>Loading...</p></div>;
  }
  if (!product) {
    return (
      <div className="container py-40 text-center space-y-8 animate-fade-up">
        <h2 className="text-4xl font-black text-primary">Oops! Product not found.</h2>
        <p className="text-gray-400 font-medium">It might have been harvested already. Try browsing our alternatives!</p>
        <Link to="/" className="btn-primary inline-flex mt-4">Back to Nature</Link>
      </div>
    );
  }
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const currentStock = selectedVariant ? selectedVariant.stock : 0;
  const currentPrice = selectedVariant ? selectedVariant.selling_price : 0;
  const originalPrice = selectedVariant ? selectedVariant.original_price : 0;
  return (
    <div className="container pt-16 md:pt-20 pb-40">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-3 text-gray-400 hover:text-primary mb-12 font-black text-xs uppercase tracking-widest transition-all group">
        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
          <ArrowLeft size={16} />
        </div>
        <span>Back to Home</span>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[40px] overflow-hidden bg-white border border-gray-50 shadow-2xl shadow-primary/5 group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            {currentStock === 0 && (
              <div className="absolute top-8 left-8 bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest shadow-xl">
                OUT OF STOCK
              </div>
            )}
            {currentStock > 0 && product.in_offer && (
              <div className="absolute top-8 left-8 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest shadow-xl">
                PREMIUM OFFER
              </div>
            )}
            <button className="absolute top-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-xl hover:bg-primary hover:text-white transition-all">
              <Heart size={20} />
            </button>
          </motion.div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">{product.category_name || 'Organic'}</span>
              <div className="w-8 h-[1px] bg-secondary/30" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-4 pt-2">
              <p className="text-4xl md:text-5xl font-black text-primary">£{currentPrice}</p>
              {originalPrice && originalPrice > currentPrice && <p className="text-xl md:text-2xl text-gray-300 line-through font-bold">£{originalPrice}</p>}
            </div>
            <p className="text-lg text-primary/60 font-medium leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="space-y-6 pt-6 border-t border-gray-100">
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-primary/50">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                      className={`px-6 py-3 rounded-xl border-2 font-black text-sm transition-all ${selectedVariant?.id === variant.id ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-400 hover:border-primary/30'}`}
                    >
                      {variant.quantity_description}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity Stepper */}
              <div className={`flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1 gap-2 w-fit mx-auto sm:mx-0 ${currentStock === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-primary rounded-lg hover:bg-white transition-all"
                  disabled={currentStock === 0}
                >
                  <Minus size={16} className="md:w-5 md:h-5" strokeWidth={3} />
                </button>
                <span className="w-8 text-center font-black text-base md:text-xl text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(currentStock, q + 1))}
                  className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-primary rounded-lg hover:bg-white transition-all"
                  disabled={currentStock === 0 || quantity >= currentStock}
                >
                  <Plus size={16} className="md:w-5 md:h-5" strokeWidth={3} />
                </button>
              </div>
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={currentStock === 0}
                className={`flex-1 group !rounded-[24px] py-4 md:py-5 px-8 md:px-10 text-base md:text-xl shadow-2xl shadow-primary/20 w-full hover:scale-[1.02] flex items-center justify-center gap-2 ${currentStock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'btn-primary'}`}
              >
                <ShoppingBag size={20} className="md:w-6 md:h-6" />
                <span>{currentStock === 0 ? 'Out of Stock' : 'Add to Basket'}</span>
              </button>
            </div>
          </div>
          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-gray-100">
            {[
              { icon: <Truck size={20} />, label: "Express Fresh", sub: "Next Day" },
              { icon: <ShieldCheck size={20} />, label: "Secure Pay", sub: "Encrypted" },
              { icon: <RefreshCcw size={20} />, label: "Return Ease", sub: "3-Day Window" }
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start gap-2">
                <div className="w-10 h-10 bg-bg-fresh rounded-xl flex items-center justify-center text-primary">
                  {badge.icon}
                </div>
                <p className="text-[10px] font-black uppercase text-primary tracking-widest mt-1">{badge.label}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{badge.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-sm">
            <div className="bg-primary text-white p-4 md:p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border border-white/20">
              <ShoppingBag size={24} />
              <div className="flex-1">
                <p className="font-black text-sm uppercase tracking-widest">Added Successfully</p>
              </div>
              <Link to="/cart" className="text-[10px] font-black text-secondary underline">VIEW BASKET</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProductDetail;
