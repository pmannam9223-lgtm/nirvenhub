// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Search, ShoppingCart, User, Menu, X, Leaf, ChevronRight } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { PRODUCTS } from '../data/products';
// import logoImg from '../assets/logo.png';

// const Navbar = () => {
//   const { cartCount } = useCart();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showSearchDropdown, setShowSearchDropdown] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const filteredProducts = PRODUCTS.filter(p =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   ).slice(0, 5);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery}`);
//       setShowSearchDropdown(false);
//     }
//   };

//   return (
//     <>
//       <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-full px-6 flex justify-center ${isScrolled ? 'top-4' : 'top-8'}`}>
//         <div className={`
//           ${isScrolled ? 'max-w-5xl py-3 px-8' : 'max-w-7xl py-5 px-10'} 
//           w-full glass-card border-white/40 flex items-center justify-between transition-all duration-700
//           shadow-[0_20px_50px_rgba(27,60,26,0.1)]
//         `}>
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group shrink-0">
//             <div className="w-11 h-11 bg-primary rounded-full overflow-hidden flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-[360deg] transition-all duration-1000 ease-out">
//               <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
//             </div>
//             <span className="text-2xl font-black tracking-tighter text-primary group-hover:tracking-normal transition-all duration-500">NIRVEN HUB</span>
//           </Link>

//           {/* Search Bar - Desktop */}
//           <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-lg relative mx-12">
//             <input
//               type="text"
//               placeholder="Search our organic selection..."
//               className="w-full pl-14 pr-6 py-4 bg-white/40 border border-white/20 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-gray-400 font-semibold"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setShowSearchDropdown(true);
//               }}
//               onFocus={() => setShowSearchDropdown(true)}
//               onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
//             />
//             <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2.5} />

//             {/* Search Dropdown */}
//             {showSearchDropdown && searchQuery && (
//               <div className="absolute top-[calc(100%+16px)] left-0 right-0 glass-card bg-white/95 rounded-[32px] overflow-hidden shadow-2xl animate-fade-up ring-1 ring-black/5">
//                 {filteredProducts.length > 0 ? (
//                   <div className="py-2">
//                     <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
//                       <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Suggested Picks</span>
//                       <span className="text-[10px] font-bold text-primary/20">{filteredProducts.length} Results</span>
//                     </div>
//                     {filteredProducts.map(product => (
//                       <Link
//                         key={product.id}
//                         to={`/product/${product.id}`}
//                         className="flex items-center gap-5 p-5 hover:bg-bg-fresh transition-all group"
//                       >
//                         <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white shadow-sm shrink-0">
//                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</p>
//                           <p className="text-xs text-primary/60 font-medium">In {product.category.replace('-', ' ')}</p>
//                         </div>
//                         <p className="text-sm font-black text-primary px-3">£{product.price}</p>
//                         <ChevronRight size={18} className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
//                       </Link>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="p-8 text-center space-y-2">
//                     <p className="text-gray-400 font-bold">No results found</p>
//                     <p className="text-xs text-gray-300">Try different keywords or browse categories</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </form>

//           {/* Right Actions */}
//           <div className="flex items-center gap-3 shrink-0">
//             <Link to="/profile" className="hidden sm:flex p-3 text-gray-600 hover:text-primary hover:bg-bg-fresh rounded-2xl transition-all duration-500">
//               <User size={24} strokeWidth={2} />
//             </Link>
//             <Link to="/cart" className="p-3 text-gray-600 hover:text-white hover:bg-primary border border-white/20 rounded-2xl transition-all duration-500 relative group shadow-sm bg-white/40">
//               <ShoppingCart size={24} strokeWidth={2} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-xl shadow-primary/40 scale-100 group-hover:scale-110 transition-transform group-hover:text-white">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             <button
//               className="lg:hidden p-3 text-gray-600 bg-white/40 border border-white/20 rounded-2xl hover:bg-white transition-all"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Sidebar Navigation */}
//       <div className={`
//         fixed inset-0 z-[60] lg:hidden transition-all duration-500
//         ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}
//       `}>
//         <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl" onClick={() => setIsMobileMenuOpen(false)} />
//         <div className={`
//           absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl p-6 md:p-10 flex flex-col transition-transform duration-700 ease-out
//           ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
//         `}>
//           <div className="flex justify-between items-center mb-10 md:mb-16">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 rounded-full overflow-hidden">
//                 <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
//               </div>
//               <span className="text-xl font-black">NIRVEN</span>
//             </div>
//             <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-50 rounded-2xl"><X size={24} /></button>
//           </div>

//           <div className="flex flex-col gap-6 md:gap-10">
//             {[
//               { name: 'HOME', path: '/' },
//               { name: 'FRUITS & VEG', path: '/category/fruits-veg' },
//               { name: 'INDIAN SPICES', path: '/category/spices' },
//               { name: 'ORGANIC RICE', path: '/category/rice-atta' },
//               { name: 'EXCLUSIVE OFFERS', path: '/offers' },
//             ].map((link, i) => (
//               <Link 
//                 key={link.name}
//                 to={link.path} 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="group flex items-center justify-between"
//                 style={{ animationDelay: `${i * 100}ms` }}
//               >
//                 <span className="text-xl md:text-3xl font-black text-gray-300 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500">{link.name}</span>
//                 <ChevronRight className="opacity-0 group-hover:opacity-100 text-primary transition-all duration-500" />
//               </Link>
//             ))}
//           </div>

//           <div className="mt-auto pt-10 border-t border-gray-100 flex items-center gap-6">
//              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 btn-primary py-4 rounded-3xl">My Account</Link>
//              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-gray-50 rounded-3xl text-primary"><Search size={24} /></Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Search, ShoppingCart } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { fetchCategories } from '../services/api';
// import logoImg from '../assets/logo.png';

// const Navbar = () => {
//   const { cartCount } = useCart();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadCategories = async () => {
//       const data = await fetchCategories();
//       setCategories(data);
//     };
//     loadCategories();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery}`);
//       setShowSearch(false);
//     }
//   };

//   return (
//     <>
//       {/* MAIN NAVBAR */}
//       <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 flex justify-center">
//         <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[24px] px-6 py-3 flex items-center justify-between shadow-lg border border-white/40">

//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img src={logoImg} className="w-10 h-10 rounded-full" />
//             <span className="text-xl font-black text-primary">NIRVEN HUB</span>
//           </Link>

//           {/* SEARCH (DESKTOP) */}
//           <form
//             onSubmit={handleSearch}
//             className="hidden md:flex flex-1 max-w-md mx-6"
//           >
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full px-5 py-2 rounded-xl border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </form>

//           {/* RIGHT ICONS */}
//           <div className="flex items-center gap-3">

//             {/* SEARCH ICON (MOBILE) */}
//             <button
//               onClick={() => setShowSearch(!showSearch)}
//               className="md:hidden p-2 rounded-xl bg-white border border-gray-100"
//             >
//               <Search size={20} />
//             </button>

//             {/* CART */}
//             <Link
//               to="/cart"
//               className="relative p-2 rounded-xl bg-white border border-gray-100"
//             >
//               <ShoppingCart size={20} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE SEARCH BAR */}
//       {showSearch && (
//         <div className="fixed top-20 left-0 w-full px-4 z-40 md:hidden">
//           <form
//             onSubmit={handleSearch}
//             className="bg-white rounded-xl shadow-lg p-3"
//           >
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full px-4 py-2 outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </form>
//         </div>
//       )}

//       {/* CATEGORY SCROLL BAR */}
//       <section className="mt-24 px-4">
//         <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl rounded-[20px] px-4 py-3 shadow-sm border border-white/40 overflow-x-auto hide-scrollbar">

//           <div className="flex gap-6 min-w-max items-center">
//             {categories.map(category => (
//               <Link
//                 key={category.id}
//                 to={`/category/${category.slug}`}
//                 className="text-sm font-semibold text-primary whitespace-nowrap hover:scale-105 transition-all"
//               >
//                 {category.name}
//               </Link>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchCategories, fetchAnnouncements } from '../services/api';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [announcements, setAnnouncements] = useState([]);
  // ✅ Active route checker
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // ✅ Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    loadCategories();
  }, []);
  useEffect(() => {
  const loadAnnouncements = async () => {
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  loadAnnouncements();
}, []);

  // ✅ Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      {/* ANNOUNCEMENT MARQUEE */}
<div className="fixed top-0 left-0 w-full h-8 bg-primary text-white z-[60] overflow-hidden flex items-center">
  <div className="marquee-content">
    {[...announcements, ...announcements].map((item, index) => (
      <span
        key={`${item.id}-${index}`}
        className="mx-8 whitespace-nowrap text-xs md:text-sm font-semibold"
      >
        {item.message}
      </span>
    ))}
  </div>
</div>
      {/* MAIN NAVBAR */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full px-4 flex justify-center">

        <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[24px] px-6 py-3 flex items-center justify-between shadow-lg border border-white/40">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="logo" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-black text-primary">NIRVEN HUB</span>
          </Link>

          {/* SEARCH (DESKTOP) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-6"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-5 py-2 rounded-xl border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">

            {/* SEARCH ICON (MOBILE) */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 rounded-xl bg-white border border-gray-100"
            >
              <Search size={20} />
            </button>

            {/* PROFILE ICON */}
            <Link
              to="/profile"
              className={`hidden md:flex flex-col items-center gap-1 transition-all duration-500 ${isActive('/profile') || isActive('/auth')
                  ? 'text-primary scale-110'
                  : 'text-primary/20 hover:text-primary/40'
                }`}
            >
              <UserIcon
                size={22}
                strokeWidth={
                  isActive('/profile') || isActive('/auth') ? 3 : 2
                }
              />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                Profile
              </span>
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl bg-white border border-gray-100"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
      {showSearch && (
        <div className="fixed top-20 left-0 w-full px-4 z-40 md:hidden">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-lg p-3"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}

      {/* CATEGORY SCROLL BAR */}
      <section className="mt-24 px-4">
        <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl rounded-[20px] px-4 py-3 shadow-sm border border-white/40 overflow-x-auto hide-scrollbar">

          <div className="flex gap-6 min-w-max items-center">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-sm font-semibold text-primary whitespace-nowrap hover:scale-105 transition-all"
              >
                {category.name}
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Navbar;
