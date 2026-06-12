/* ═══════════════════════════════════════════════
   GONATRA MARKETPLACE — data.js
   Seed data: categories, products, demo accounts
   ═══════════════════════════════════════════════ */

const CATEGORIES = [
  { id: "electronics", name: "Electronics",   icon: "🎧" },
  { id: "fashion",     name: "Fashion",       icon: "👕" },
  { id: "home",        name: "Home & Living", icon: "🛋️" },
  { id: "beauty",      name: "Beauty",        icon: "💄" },
  { id: "sports",      name: "Sports",        icon: "⚽" },
  { id: "books",       name: "Books",         icon: "📚" },
  { id: "toys",        name: "Toys & Games",  icon: "🧸" },
  { id: "food",        name: "Food & Drink",  icon: "🍫" },
];

/* Seed products. Each has: id, name, category, price, oldPrice, image (emoji),
   gallery (emoji array), description, sellerId, sellerName, stock, rating,
   reviews, shipFrom, createdAt (timestamp), featured (bool) */
const SEED_PRODUCTS = [
  {
    id: "p1", name: "Wireless Bluetooth Headphones", category: "electronics",
    price: 49.99, oldPrice: 69.99, image: "🎧", gallery: ["🎧","🎵","📱","🔌"],
    description: "Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for music, calls, and travel.",
    sellerId: "seller1", sellerName: "TechHub Lagos", stock: 84, rating: 4.7, reviews: 312,
    shipFrom: "Lagos, Nigeria", createdAt: Date.now() - 1000*60*60*24*40, featured: true,
  },
  {
    id: "p2", name: "Smart Fitness Watch", category: "electronics",
    price: 89.00, oldPrice: 120.00, image: "⌚", gallery: ["⌚","📱","💪","🏃"],
    description: "Track your steps, heart rate, sleep, and workouts with this sleek smart watch. Water-resistant and compatible with iOS & Android.",
    sellerId: "seller1", sellerName: "TechHub Lagos", stock: 45, rating: 4.5, reviews: 198,
    shipFrom: "Lagos, Nigeria", createdAt: Date.now() - 1000*60*60*24*12, featured: true,
  },
  {
    id: "p3", name: "Classic Leather Tote Bag", category: "fashion",
    price: 65.50, oldPrice: null, image: "👜", gallery: ["👜","👛","🧳"],
    description: "Handcrafted genuine leather tote bag with spacious interior, perfect for work or travel. Available in multiple colors.",
    sellerId: "seller2", sellerName: "Aiyo Fashion House", stock: 30, rating: 4.8, reviews: 145,
    shipFrom: "Nairobi, Kenya", createdAt: Date.now() - 1000*60*60*24*5, featured: true,
  },
  {
    id: "p4", name: "Men's Premium Cotton Hoodie", category: "fashion",
    price: 34.99, oldPrice: 45.00, image: "🧥", gallery: ["🧥","👕","🧶"],
    description: "Soft, breathable cotton hoodie with a modern fit. Available in S to XXL, in 6 colors.",
    sellerId: "seller2", sellerName: "Aiyo Fashion House", stock: 120, rating: 4.4, reviews: 88,
    shipFrom: "Nairobi, Kenya", createdAt: Date.now() - 1000*60*60*24*70, featured: false,
  },
  {
    id: "p5", name: "Ceramic Plant Pot Set (3pc)", category: "home",
    price: 28.00, oldPrice: null, image: "🪴", gallery: ["🪴","🏠","🌿"],
    description: "Set of 3 minimalist ceramic plant pots in varying sizes — ideal for succulents, herbs, or small houseplants.",
    sellerId: "seller3", sellerName: "UrbanNest Home", stock: 60, rating: 4.6, reviews: 73,
    shipFrom: "Accra, Ghana", createdAt: Date.now() - 1000*60*60*24*3, featured: true,
  },
  {
    id: "p6", name: "Memory Foam Pillow (2-Pack)", category: "home",
    price: 39.99, oldPrice: 55.00, image: "🛏️", gallery: ["🛏️","🛋️","😴"],
    description: "Orthopedic memory foam pillows that contour to your neck and shoulders for better sleep. Hypoallergenic cover included.",
    sellerId: "seller3", sellerName: "UrbanNest Home", stock: 95, rating: 4.6, reviews: 210,
    shipFrom: "Accra, Ghana", createdAt: Date.now() - 1000*60*60*24*22, featured: false,
  },
  {
    id: "p7", name: "Vitamin C Brightening Serum", category: "beauty",
    price: 22.50, oldPrice: 30.00, image: "🧴", gallery: ["🧴","✨","💧"],
    description: "Lightweight vitamin C serum that brightens skin tone, reduces dark spots, and boosts collagen production. Suitable for all skin types.",
    sellerId: "seller4", sellerName: "GlowLab Cosmetics", stock: 200, rating: 4.9, reviews: 540,
    shipFrom: "Accra, Ghana", createdAt: Date.now() - 1000*60*60*24*8, featured: true,
  },
  {
    id: "p8", name: "Natural Shea Butter Body Cream", category: "beauty",
    price: 14.99, oldPrice: null, image: "🧈", gallery: ["🧈","🌿","💛"],
    description: "100% organic shea butter cream for deep moisturizing. Made from ethically-sourced ingredients, fragrance-free.",
    sellerId: "seller4", sellerName: "GlowLab Cosmetics", stock: 150, rating: 4.7, reviews: 167,
    shipFrom: "Accra, Ghana", createdAt: Date.now() - 1000*60*60*24*60, featured: false,
  },
  {
    id: "p9", name: "Professional Football (Size 5)", category: "sports",
    price: 24.99, oldPrice: 32.00, image: "⚽", gallery: ["⚽","🥅","🏆"],
    description: "Match-quality football with durable polyurethane outer shell and high-bounce bladder. FIFA-approved size and weight.",
    sellerId: "seller5", sellerName: "Champion Sports Co.", stock: 70, rating: 4.5, reviews: 92,
    shipFrom: "Cairo, Egypt", createdAt: Date.now() - 1000*60*60*24*15, featured: false,
  },
  {
    id: "p10", name: "Adjustable Dumbbell Set (20kg)", category: "sports",
    price: 75.00, oldPrice: 95.00, image: "🏋️", gallery: ["🏋️","💪","🔩"],
    description: "Space-saving adjustable dumbbell set, weight range 2.5kg–20kg per dumbbell. Perfect for home workouts.",
    sellerId: "seller5", sellerName: "Champion Sports Co.", stock: 25, rating: 4.6, reviews: 58,
    shipFrom: "Cairo, Egypt", createdAt: Date.now() - 1000*60*60*24*2, featured: true,
  },
  {
    id: "p11", name: "Bestselling Fiction Novel Bundle (3 Books)", category: "books",
    price: 18.99, oldPrice: 27.00, image: "📚", gallery: ["📚","📖","✍️"],
    description: "A curated bundle of three award-winning fiction novels — perfect for your next reading marathon.",
    sellerId: "seller6", sellerName: "PageTurner Books", stock: 110, rating: 4.8, reviews: 234,
    shipFrom: "Johannesburg, South Africa", createdAt: Date.now() - 1000*60*60*24*30, featured: false,
  },
  {
    id: "p12", name: "Kids Educational Activity Book Set", category: "books",
    price: 12.50, oldPrice: null, image: "📖", gallery: ["📖","✏️","🎨"],
    description: "Fun and engaging activity books for ages 4-8, covering numbers, letters, shapes, and colors.",
    sellerId: "seller6", sellerName: "PageTurner Books", stock: 88, rating: 4.7, reviews: 76,
    shipFrom: "Johannesburg, South Africa", createdAt: Date.now() - 1000*60*60*24*1, featured: true,
  },
  {
    id: "p13", name: "Building Blocks Set (250pc)", category: "toys",
    price: 32.99, oldPrice: 42.00, image: "🧱", gallery: ["🧱","🏗️","🎨"],
    description: "Colorful building blocks compatible with major brick brands. Encourages creativity and fine motor skills.",
    sellerId: "seller7", sellerName: "PlayWorld Toys", stock: 65, rating: 4.6, reviews: 145,
    shipFrom: "Kampala, Uganda", createdAt: Date.now() - 1000*60*60*24*18, featured: false,
  },
  {
    id: "p14", name: "Remote Control Racing Car", category: "toys",
    price: 28.00, oldPrice: 38.00, image: "🚗", gallery: ["🚗","🏎️","🎮"],
    description: "High-speed RC car with rechargeable battery, reaching speeds up to 25km/h. Includes off-road tires.",
    sellerId: "seller7", sellerName: "PlayWorld Toys", stock: 40, rating: 4.4, reviews: 61,
    shipFrom: "Kampala, Uganda", createdAt: Date.now() - 1000*60*60*24*6, featured: true,
  },
  {
    id: "p15", name: "Premium Roasted Coffee Beans (1kg)", category: "food",
    price: 16.99, oldPrice: 21.00, image: "☕", gallery: ["☕","🌱","📦"],
    description: "Single-origin Arabica coffee beans, medium roast, with notes of chocolate and citrus. Freshly roasted to order.",
    sellerId: "seller8", sellerName: "Highland Roasters", stock: 180, rating: 4.9, reviews: 412,
    shipFrom: "Addis Ababa, Ethiopia", createdAt: Date.now() - 1000*60*60*24*4, featured: true,
  },
  {
    id: "p16", name: "Artisan Dark Chocolate Gift Box", category: "food",
    price: 19.99, oldPrice: null, image: "🍫", gallery: ["🍫","🎁","🍬"],
    description: "Handmade dark chocolate assortment box — 70% cocoa, made with locally-sourced cacao. Great gift option.",
    sellerId: "seller8", sellerName: "Highland Roasters", stock: 95, rating: 4.8, reviews: 156,
    shipFrom: "Addis Ababa, Ethiopia", createdAt: Date.now() - 1000*60*60*24*9, featured: false,
  },
  {
    id: "p17", name: "Portable Bluetooth Speaker", category: "electronics",
    price: 35.00, oldPrice: 45.00, image: "🔊", gallery: ["🔊","🎵","🔋"],
    description: "Compact waterproof speaker with 12-hour battery life and deep bass. Pairs with two devices simultaneously.",
    sellerId: "seller1", sellerName: "TechHub Lagos", stock: 130, rating: 4.5, reviews: 289,
    shipFrom: "Lagos, Nigeria", createdAt: Date.now() - 1000*60*60*24*0, featured: false,
  },
  {
    id: "p18", name: "Women's Running Sneakers", category: "fashion",
    price: 54.00, oldPrice: 72.00, image: "👟", gallery: ["👟","🏃‍♀️","🧦"],
    description: "Lightweight, breathable running shoes with responsive cushioning. Designed for everyday training and long runs.",
    sellerId: "seller2", sellerName: "Aiyo Fashion House", stock: 75, rating: 4.6, reviews: 198,
    shipFrom: "Nairobi, Kenya", createdAt: Date.now() - 1000*60*60*24*0, featured: true,
  },
  {
    id: "p19", name: "Scented Soy Candle Set (4pc)", category: "home",
    price: 21.99, oldPrice: null, image: "🕯️", gallery: ["🕯️","🌸","🏠"],
    description: "Hand-poured soy wax candles in lavender, vanilla, citrus, and sandalwood scents. 40-hour burn time each.",
    sellerId: "seller3", sellerName: "UrbanNest Home", stock: 140, rating: 4.7, reviews: 121,
    shipFrom: "Accra, Ghana", createdAt: Date.now() - 1000*60*60*24*11, featured: false,
  },
  {
    id: "p20", name: "Matte Liquid Lipstick Set (6 colors)", category: "beauty",
    price: 26.00, oldPrice: 34.00, image: "💄", gallery: ["💄","💋","🎨"],
    description: "Long-lasting, smudge-proof liquid lipsticks in 6 versatile shades. Vegan and cruelty-free formula.",
    sellerId: "seller4", sellerName: "GlowLab Cosmetics", stock: 175, rating: 4.8, reviews: 302,
    shipFrom: "Accra, Ghana", createdAt: Date.now() - 1000*60*60*24*1, featured: false,
  },
];

/* Emoji choices for "image upload" when adding products */
const EMOJI_CHOICES = [
  "📦","🎧","⌚","👜","🧥","👟","🪴","🛏️","🧴","🧈","⚽","🏋️",
  "📚","📖","🧱","🚗","☕","🍫","🔊","💄","🕯️","👕","💻","📱",
  "🎮","🧸","🎁","🏠","🌿","✨","🍬","🧳","🥾","👛","🛋️","🔌"
];

/* Demo accounts */
const DEMO_ACCOUNTS = {
  buyer: {
    id: "buyer1", name: "Amaka Johnson", email: "buyer@gonatra.com",
    password: "demo123", type: "buyer",
  },
  seller: {
    id: "seller1", name: "TechHub Lagos", email: "seller@gonatra.com",
    password: "demo123", type: "seller", storeName: "TechHub Lagos",
  },
};
