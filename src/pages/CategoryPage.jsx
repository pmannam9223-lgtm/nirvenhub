import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Filter, X, Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/Cards';
import { fetchCategories, fetchProducts } from '../services/api';

const CategoryPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(100);
  const [offersOnly, setOffersOnly] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
      if (id) {
        setCategory(cats.find(c => c.slug === id || c.id === id));
      }

      const filters = {};
      if (id) filters.category = id;
      const prods = await fetchProducts(filters);
      setProducts(prods);
    };
    loadData();
  }, [id]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (query) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category_name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (offersOnly) {
      result = result.filter(p => p.in_offer);
    }

    result = result.filter(p => p.selling_price <= priceRange);

    if (sortBy === 'price-low') result.sort((a, b) => a.selling_price - b.selling_price);
    if (sortBy === 'price-high') result.sort((a, b) => b.selling_price - a.selling_price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, query, sortBy, priceRange, offersOnly]);

  const FilterContent = ({ isMobile = false }) => (
    <div className="space-y-10">
      <div className="flex items-center justify-between pb-6 border-b border-primary/10">
        <h3 className={`${isMobile ? 'text-3xl' : 'text-xl'} font-black text-primary flex items-center gap-3`}>
          Filters
        </h3>
        <button
          onClick={() => { setPriceRange(100); setOffersOnly(false); }}
          className="text-[10px] font-black text-primary/30 hover:text-primary uppercase tracking-widest transition-all"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-8">
        {/* Price Filter */}
        <div className="space-y-6">
          <label className="text-[10px] font-black text-primary uppercase tracking-widest block">
            Price Ceiling (Up to £{priceRange})
          </label>
          <div className="relative pt-2">
            <input
              type="range"
              min="1"
              max="100"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-black text-primary/20 mt-4 uppercase tracking-tighter">
              <span>£1</span>
              <span>£100</span>
            </div>
          </div>
        </div>

        {/* Offers Filter */}
        <div className="pt-6 border-t border-primary/5">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${offersOnly ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-primary/10'}`}>
              {offersOnly && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={offersOnly}
              onChange={() => setOffersOnly(!offersOnly)}
            />
            <span className="text-sm font-black text-primary transition-all">
              Offers Only Special
            </span>
          </label>
        </div>

        {/* Categories Section */}
        <div className="pt-10 border-t border-primary/5">
          <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-8">Category</h4>
          <div className="flex flex-col gap-4">
            <Link
              to="/products"
              onClick={() => isMobile && setIsSidebarOpen(false)}
              className="group flex items-center justify-between"
            >
              <span className={`text-lg font-black text-primary transition-all text-primary/40 group-hover:text-primary group-hover:translate-x-1`}>
                All Products
              </span>
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className="group flex items-center justify-between"
              >
                <span className={`text-lg font-black text-primary transition-all ${id === cat.slug ? 'text-primary' : 'text-primary/40 group-hover:text-primary group-hover:translate-x-1'}`}>
                  {cat.name}
                </span>
                {id === cat.slug && <div className="w-2 h-2 rounded-full bg-primary" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container pt-16 md:pt-20 pb-40">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            {/* <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Aura of Freshness</span> */}
            <div className="w-8 h-[1px] bg-secondary/30" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight">
            {query ? `Search: ${query}` : category ? category.name : 'Exclusive Shop'}
          </h1>
          {/* <p className="text-primary/40 text-sm font-bold tracking-widest uppercase">
            {filteredProducts.length} Premium results found
          </p> */}
        </motion.div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary/10 rounded-2xl font-black text-primary text-xs uppercase tracking-widest"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>

          <div className="relative flex-1 md:w-72 group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white/40 border-2 border-primary/5 rounded-2xl pl-6 pr-12 py-4 focus:outline-none focus:border-primary/20 font-black text-xs uppercase tracking-widest text-primary cursor-pointer transition-all hover:bg-white/80"
            >
              <option value="popular">Most Popular Selection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated </option>
            </select>
            <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Sidebar Filter - Desktop */}
        <aside className="hidden lg:block lg:col-span-3 h-fit">
          <FilterContent />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <AnimatePresence mode='wait'>
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="product-grid"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-40 text-center space-y-8 glass-card border-none bg-primary/5 rounded-[40px] px-10"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Search size={32} className="text-primary/20" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-primary">Nothing found, for now.</h3>
                  <p className="text-primary/40 font-bold max-w-xs mx-auto">Try adjusting your premium filters or explore other categories.</p>
                </div>
                <button
                  onClick={() => { setPriceRange(100); setOffersOnly(false); }}
                  className="btn-primary !rounded-full !py-4 !px-8 text-sm uppercase tracking-widest inline-flex"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 w-[90%] max-w-sm bg-white p-10 md:p-12 shadow-2xl flex flex-col overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-gray-50 rounded-2xl"><X size={24} /></button>
              </div>

              <div className="flex-1">
                <FilterContent isMobile={true} />
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-full btn-primary py-5 rounded-[24px] mt-10 text-lg shadow-xl shadow-primary/20"
              >
                Apply Filters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;
