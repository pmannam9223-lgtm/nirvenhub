export const CATEGORIES = [
  { id: 'fruits-veg', name: 'Fruits & Vegetables', image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'rice-atta', name: 'Rice & Atta', image: 'https://images.pexels.com/photos/4187609/pexels-photo-4187609.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'spices', name: 'Spices & Masala', image: 'https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'snacks', name: 'Snacks & Sweets', image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'dairy', name: 'Dairy & Frozen', image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'beverages', name: 'Beverages', image: 'https://images.pexels.com/photos/159291/beer-machine-alcohol-brewery-159291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'ready-to-eat', name: 'Ready to Eat', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'personal-care', name: 'Personal Care', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=800' },
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 2.99,
    category: 'fruits-veg',
    subcategory: 'Vegetables',
    in_offer: true,
    rating: 4.8,
    reviewsCount: 124,
    description: 'Fresh, juicy, and organic tomatoes grown without pesticides. Perfect for salads and sauces.'
  },
  {
    id: 2,
    name: 'Premium Basmati Rice',
    image: 'https://images.pexels.com/photos/4187609/pexels-photo-4187609.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 15.49,
    category: 'rice-atta',
    subcategory: 'Rice',
    in_offer: false,
    rating: 4.9,
    reviewsCount: 89,
    description: 'Long-grain, aromatic Basmati rice. Aged to perfection for superior taste and texture.'
  },
  {
    id: 3,
    name: 'Indian Spice Blend (Garam Masala)',
    image: 'https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 4.99,
    category: 'spices',
    subcategory: 'Masala',
    in_offer: true,
    rating: 4.7,
    reviewsCount: 56,
    description: 'Authentic Indian Garam Masala blend. Made from 100% natural spices.'
  },
  {
    id: 4,
    name: 'Fresh Spinach',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1.49,
    category: 'fruits-veg',
    subcategory: 'Vegetables',
    in_offer: false,
    rating: 4.5,
    reviewsCount: 42,
    description: 'Crisp and fresh organic spinach leaves. Rich in iron and vitamins.'
  },
  {
    id: 5,
    name: 'Alphonso Mangoes (Box)',
    image: 'https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 24.99,
    category: 'fruits-veg',
    subcategory: 'Fruits',
    in_offer: true,
    rating: 5.0,
    reviewsCount: 210,
    description: 'The King of Mangoes. Handpicked, sweet, and aromatic Alphonso mangoes from India.'
  },
  {
    id: 6,
    name: 'Whole Wheat Atta',
    image: 'https://images.pexels.com/photos/4110368/pexels-photo-4110368.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 12.99,
    category: 'rice-atta',
    subcategory: 'Atta',
    in_offer: false,
    rating: 4.8,
    reviewsCount: 75,
    description: '100% whole wheat flour made from sharbati wheat. Soft rotis guaranteed.'
  }
];
