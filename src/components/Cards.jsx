import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Heart, ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative flex flex-col gap-6 animate-fade-up"
    >
      <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-[#F2F4F2] border border-white/40 shadow-[0_20px_40px_rgba(27,60,26,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(27,60,26,0.12)] group-hover:translate-y-[-8px]">
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
          {product.stock === 0 && (
            <div className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">
              OUT OF STOCK
            </div>
          )}
          {product.stock > 0 && product.in_offer && (
            <div className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">
              SPECIAL SALE
            </div>
          )}
          {product.stock > 0 && product.discount_percentage > 0 && (
            <div className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">
              {product.discount_percentage}% OFF
            </div>
          )}
        </div>

      </div>

      <div className="px-2 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5A27]/40">{product.category_name || product.category}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-400">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-black text-primary line-clamp-2 leading-tight min-h-[56px] group-hover:text-primary-light transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
             <div className="flex items-baseline gap-2">
               <p className="text-2xl font-black text-primary">£{product.selling_price}</p>
               {product.quantity_description && (
                 <span className="text-[10px] font-black text-gray-400/60 uppercase tracking-widest">/ {product.quantity_description}</span>
               )}
             </div>
             {product.original_price > product.selling_price && <p className="text-xs text-gray-300 line-through font-bold">£{product.original_price}</p>}
          </div>
          {product.stock === 0 ? (
            <div className="px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center h-10 flex items-center justify-center">
              Out of stock
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-500 transform hover:scale-110 active:scale-95"
              aria-label="Add to cart"
            >
               <Plus size={20} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`} 
      className="flex flex-col items-center gap-5 group animate-fade-up"
    >
      <div className="relative w-28 h-28 md:w-40 md:h-40 p-1.5 rounded-full border border-gray-100 group-hover:border-primary/20 transition-all duration-700 bg-white shadow-xl shadow-primary/5 overflow-hidden">
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-700" />
        </div>
        
        {/* Indicator */}
        <div className="absolute bottom-0 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 shadow-lg shadow-primary/40">
           <ArrowRight size={16} strokeWidth={3} />
        </div>
      </div>
      
      <span className="text-xs font-black text-gray-400 group-hover:text-primary group-hover:tracking-widest uppercase transition-all duration-500">
        {category.name}
      </span>
    </Link>
  );
};

export const CategorySquareCard = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`} 
      className="group relative flex flex-col items-center gap-4 animate-fade-up"
    >
      <div className="relative w-full aspect-square rounded-[40px] overflow-hidden bg-white shadow-2xl shadow-primary/5 border-4 border-white transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(27,60,26,0.15)] group-hover:translate-y-[-8px]">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Hover Detail */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/20 backdrop-blur-[2px]">
           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-xl">
              <ShoppingBag size={20} strokeWidth={3} />
           </div>
        </div>
      </div>
      
      <div className="text-center px-2">
        <h3 className="text-lg font-black text-primary uppercase tracking-tight group-hover:text-secondary transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Explore Collection</p>
      </div>
    </Link>
  );
};
