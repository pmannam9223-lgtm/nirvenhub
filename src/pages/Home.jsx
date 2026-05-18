import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, ShieldCheck, Clock, ChevronRight, Leaf, Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCard, CategoryCard, CategorySquareCard } from '../components/Cards';
import { fetchCategories, fetchProducts } from '../services/api';

const Home = () => {
  const [categories, setCategories] = React.useState([]);
  const [offerProducts, setOfferProducts] = React.useState([]);
  const [orderedProducts, setOrderedProducts] = React.useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      const cats = await fetchCategories();
      setCategories(cats);

      const offers = await fetchProducts({ in_offer: true });
      setOfferProducts(offers.slice(0, 4));

      const productsData = await fetchProducts({ ordering: 'order' });
      setOrderedProducts(productsData.slice(0, 8));
    };
    loadData();
  }, []);

  return (
    <div className="space-y-24 pb-32"> {/* reduced spacing */}

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Mesh Background Decor */}
        <div className="absolute inset-0 z-0 mesh-gradient opacity-40" />
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-7xl font-black leading-[0.9] text-primary">
                Freshness <br />
                <span className="text-secondary italic font-light serif text-5xl md:text-8xl">
                  Redefined.
                </span>
              </h1>

              <p className="text-lg text-primary/60 max-w-lg">
                Bringing the finest organic harvests directly to your kitchen.
              </p>

              <div className="flex gap-4">
                <Link to="/category/fruits-veg" className="btn-primary !rounded-full px-8 py-4">
                  Start Exploring
                </Link>
                <Link to="/offers" className="text-primary font-black flex items-center gap-2">
                  Offers <ChevronRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-primary">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.slice(0, 8).map(category => (
            <CategorySquareCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="container">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-primary">
            Best Offers
          </h2>
        </div>

        <div className="product-grid">
          {offerProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Ordered Products */}
      <section className="container">
        <div className="mb-12 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-black text-primary">
            Our Products
          </h2>
        </div>

        <div className="product-grid">
          {orderedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/products" className="btn-primary !rounded-full px-8 py-4 flex items-center gap-2">
            View All Products <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Leaf size={36} className="text-primary" />,
              title: "Fresh Products",
              desc: "Daily sourced fresh groceries."
            },
            {
              icon: <Truck size={36} className="text-primary" />,
              title: "Fast Delivery",
              desc: "Quick and reliable doorstep delivery."
            },
            {
              icon: <ShoppingCart size={36} className="text-primary" />,
              title: "Everything in One Place",
              desc: "All your daily needs in one store."
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 space-y-4">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-primary">{item.title}</h3>
              <p className="text-primary/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// Simple ArrowRight import fix
const ArrowRight = ({ size, className, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default Home;
