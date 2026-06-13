/* ═══════════════════════════════════════════════
   GONATRA MESSAGING — messages-data.js
   Seed data: chat users, conversations, messages
   ═══════════════════════════════════════════════ */

/* All "people" on the platform that can be messaged.
   Sellers map to SEED_PRODUCTS sellerId values so
   "Message Seller" can resolve a chat user. */
const CHAT_USERS = {
  "buyer1": {
    id: "buyer1", name: "Amaka Johnson", avatarColor: "#1a56ff",
    type: "buyer", online: true, lastSeen: Date.now(),
    bio: "Frequent shopper · Lagos, Nigeria", joined: "Jan 2025",
  },
  "seller1": {
    id: "seller1", name: "TechHub Lagos", avatarColor: "#0040cc",
    type: "seller", online: true, lastSeen: Date.now(),
    bio: "Electronics & gadgets · Lagos, Nigeria", joined: "Mar 2024",
    rating: 4.7, totalSales: 1240,
  },
  "seller2": {
    id: "seller2", name: "Aiyo Fashion House", avatarColor: "#7c3aed",
    type: "seller", online: false, lastSeen: Date.now() - 1000*60*42,
    bio: "Fashion & accessories · Nairobi, Kenya", joined: "Jun 2024",
    rating: 4.8, totalSales: 890,
  },
  "seller3": {
    id: "seller3", name: "UrbanNest Home", avatarColor: "#16a34a",
    type: "seller", online: true, lastSeen: Date.now(),
    bio: "Home & living essentials · Accra, Ghana", joined: "Feb 2024",
    rating: 4.6, totalSales: 670,
  },
  "seller4": {
    id: "seller4", name: "GlowLab Cosmetics", avatarColor: "#db2777",
    type: "seller", online: false, lastSeen: Date.now() - 1000*60*60*3,
    bio: "Beauty & skincare · Accra, Ghana", joined: "Sep 2024",
    rating: 4.9, totalSales: 2100,
  },
  "seller5": {
    id: "seller5", name: "Champion Sports Co.", avatarColor: "#ea580c",
    type: "seller", online: false, lastSeen: Date.now() - 1000*60*60*20,
    bio: "Sports & fitness gear · Cairo, Egypt", joined: "Nov 2023",
    rating: 4.5, totalSales: 540,
  },
  "seller6": {
    id: "seller6", name: "PageTurner Books", avatarColor: "#0891b2",
    type: "seller", online: true, lastSeen: Date.now(),
    bio: "Books & stationery · Johannesburg, South Africa", joined: "May 2024",
    rating: 4.8, totalSales: 980,
  },
  "seller7": {
    id: "seller7", name: "PlayWorld Toys", avatarColor: "#ca8a04",
    type: "seller", online: false, lastSeen: Date.now() - 1000*60*60*5,
    bio: "Toys & games · Kampala, Uganda", joined: "Aug 2024",
    rating: 4.6, totalSales: 412,
  },
  "seller8": {
    id: "seller8", name: "Highland Roasters", avatarColor: "#92400e",
    type: "seller", online: true, lastSeen: Date.now(),
    bio: "Coffee & gourmet food · Addis Ababa, Ethiopia", joined: "Jan 2024",
    rating: 4.9, totalSales: 1560,
  },
};

/* Seed conversations for the demo buyer (buyer1).
   Each conversation: id, participants[2], productId (optional context),
   messages: [{id, from, text, image, time, status}], typing flag */
const SEED_CONVERSATIONS = [
  {
    id: "conv1",
    participants: ["buyer1", "seller1"],
    productId: "p1",
    messages: [
      { id: "m1", from: "buyer1", text: "Hi! Is the Wireless Bluetooth Headphones still available in black?", time: Date.now() - 1000*60*60*26, status: "seen" },
      { id: "m2", from: "seller1", text: "Hello Amaka! Yes, we have black in stock 👍", time: Date.now() - 1000*60*60*25, status: "seen" },
      { id: "m3", from: "seller1", text: "Would you like me to reserve one for you?", time: Date.now() - 1000*60*60*25 + 60000, status: "seen" },
      { id: "m4", from: "buyer1", text: "Yes please! Also, can you do a small discount if I buy 2?", time: Date.now() - 1000*60*60*24, status: "seen" },
      { id: "m5", from: "seller1", text: "For 2 units I can offer $45 each instead of $49.99 😊", time: Date.now() - 1000*60*60*2, status: "delivered" },
    ],
  },
  {
    id: "conv2",
    participants: ["buyer1", "seller4"],
    productId: "p7",
    messages: [
      { id: "m6", from: "buyer1", text: "Hello, does the Vitamin C serum work for sensitive skin?", time: Date.now() - 1000*60*60*50, status: "seen" },
      { id: "m7", from: "seller4", text: "Hi! Yes, it's formulated to be gentle, but we recommend a patch test first.", time: Date.now() - 1000*60*60*49, status: "seen" },
      { id: "m8", from: "buyer1", text: "Great, thank you! 🙏", time: Date.now() - 1000*60*60*49 + 120000, status: "seen" },
    ],
  },
  {
    id: "conv3",
    participants: ["buyer1", "seller3"],
    productId: "p5",
    messages: [
      { id: "m9", from: "seller3", text: "Hi Amaka! Thanks for your recent order of the Ceramic Plant Pot Set 🌿", time: Date.now() - 1000*60*15, status: "delivered" },
      { id: "m10", from: "seller3", text: "It has been shipped and should arrive within 5-7 business days.", time: Date.now() - 1000*60*14, status: "delivered" },
    ],
  },
];

/* Quick reply suggestions shown above the composer */
const QUICK_REPLIES = {
  buyer: [
    "Is this still available?",
    "Can you do a discount?",
    "What's the shipping time?",
    "Thank you!",
  ],
  seller: [
    "Yes, it's available!",
    "I can offer a small discount 😊",
    "Shipping takes 5-7 days.",
    "Thanks for your order!",
  ],
};

/* Auto-reply bank for the simulated "other user" responses */
const AUTO_REPLIES = [
  "Thanks for your message! Let me check and get back to you shortly.",
  "Sure, that works for me 👍",
  "Yes, that's correct!",
  "I'll have that ready for you soon.",
  "Thank you for your patience 🙏",
  "Great question — let me confirm and reply soon.",
  "Sounds good to me!",
  "Appreciate you reaching out 😊",
];
  
