/* ═══════════════════════════════════════════════
   GONATRA MARKETPLACE — app.js
   Full SPA logic: auth, products, cart, dashboards
   ═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
const state = {
  route: "home",
  routeParam: null,
  currentUser: null,        // { id, name, email, type, storeName }
  products: [...SEED_PRODUCTS], // mutable copy (sellers can add/remove)
  cart: [],                  // [{ productId, qty }]
  orders: [],                // [{ id, items:[{productId,qty,price,name,image}], total, date, status }]
  search: "",
  filterCategory: "",
  sortBy: "default",
  editingProductId: null,    // for modal
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const fmtPrice = (n) => "$" + Number(n).toFixed(2);

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / (1000*60*60*24));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return `${Math.floor(days/30)} mo ago`;
}

function isNewArrival(ts) {
  return (Date.now() - ts) < (1000*60*60*24*14); // 14 days
}

function findProduct(id) { return state.products.find(p => p.id === id); }
function findCategory(id) { return CATEGORIES.find(c => c.id === id); }

function genId(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function showToast(msg, type="default") {
  const stack = $("#toastStack");
  const el = document.createElement("div");
  el.className = "toast" + (type === "success" ? " toast-success" : type === "error" ? " toast-error" : "");
  el.innerHTML = msg;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* ─────────────────────────────────────────────
   ROUTING
───────────────────────────────────────────── */
function navigate(route, param = null) {
  // Auth guard
  const protectedRoutes = ["buyer-dashboard", "seller-dashboard", "become-seller"];
  if (protectedRoutes.includes(route) && !state.currentUser) {
    showToast("⚠️ Please log in to continue", "error");
    route = "login";
  }
  if (route === "seller-dashboard" && state.currentUser?.type !== "seller") {
    showToast("⚠️ You need a Seller account to access this", "error");
    route = "become-seller";
  }

  state.route = route;
  state.routeParam = param;
  closeMobileMenu();
  closeCart();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// click delegation for [data-route]
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-route]");
  if (target) {
    e.preventDefault();
    navigate(target.dataset.route, target.dataset.param || null);
  }
});

/* ─────────────────────────────────────────────
   RENDER: NAV (categories, user menu)
───────────────────────────────────────────── */
function renderNavCategories() {
  const navCats = $("#navCategories");
  const mobileCats = $("#mobileCats");
  const allPill = `<button class="cat-pill ${state.filterCategory === "" ? "active" : ""}" data-cat="">All</button>`;
  const pills = CATEGORIES.map(c =>
    `<button class="cat-pill ${state.filterCategory === c.id ? "active" : ""}" data-cat="${c.id}">${c.icon} ${c.name}</button>`
  ).join("");
  navCats.innerHTML = allPill + pills;
  mobileCats.innerHTML = allPill + pills;

  $$(".cat-pill", navCats).concat($$(".cat-pill", mobileCats)).forEach(btn => {
    btn.addEventListener("click", () => {
      state.filterCategory = btn.dataset.cat;
      $("#filterCategory") && ($("#filterCategory").value = state.filterCategory);
      if (state.route !== "home") navigate("home");
      else render();
    });
  });
}

function renderNavAuth() {
  const navAuth = $("#navAuth");
  const navUser = $("#navUser");
  const mobileAuthArea = $("#mobileAuthArea");

  if (state.currentUser) {
    navAuth.style.display = "none";
    navUser.style.display = "block";
    $("#userAvatar").textContent = state.currentUser.name.charAt(0).toUpperCase();
    $("#userNameLabel").textContent = state.currentUser.name.split(" ")[0];

    // seller link visibility
    $("#sellerLink").style.display = state.currentUser.type === "seller" ? "block" : "none";
    $("#becomeSellerLink").style.display = state.currentUser.type === "seller" ? "none" : "block";

    mobileAuthArea.innerHTML = `
      <a data-route="buyer-dashboard" class="btn-outline btn-block">📦 My Orders</a>
      ${state.currentUser.type === "seller"
        ? `<a data-route="seller-dashboard" class="btn-outline btn-block">🏪 Seller Dashboard</a>`
        : `<a data-route="become-seller" class="btn-outline btn-block">🚀 Become a Seller</a>`}
      <button class="btn-ghost btn-block" id="mobileLogoutBtn" style="text-align:left;border:1px solid var(--light);border-radius:50px">🚪 Log Out</button>
    `;
    $("#mobileLogoutBtn")?.addEventListener("click", logout);
  } else {
    navAuth.style.display = "flex";
    navUser.style.display = "none";
    mobileAuthArea.innerHTML = `
      <button class="btn-outline btn-block" data-route="login">Log In</button>
      <button class="btn-primary btn-block" data-route="register">Sign Up</button>
    `;
  }
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  $("#cartBadge").textContent = count;
}

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */
function login(email, password) {
  // Check demo accounts
  const accounts = [DEMO_ACCOUNTS.buyer, DEMO_ACCOUNTS.seller, ...getRegisteredUsers()];
  const user = accounts.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    showToast("❌ Invalid email or password", "error");
    return false;
  }
  state.currentUser = { ...user };
  delete state.currentUser.password;
  showToast(`✅ Welcome back, ${user.name.split(" ")[0]}!`, "success");
  renderNavAuth();
  navigate("home");
  return true;
}

function logout() {
  state.currentUser = null;
  renderNavAuth();
  showToast("👋 Logged out successfully");
  navigate("home");
}

// store newly registered users in memory
let registeredUsers = [];
function getRegisteredUsers() { return registeredUsers; }

function register(name, email, password, type) {
  if (!name || !email || !password) {
    showToast("⚠️ Please fill in all fields", "error");
    return false;
  }
  if (password.length < 6) {
    showToast("⚠️ Password must be at least 6 characters", "error");
    return false;
  }
  const exists = [DEMO_ACCOUNTS.buyer, DEMO_ACCOUNTS.seller, ...registeredUsers]
    .find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    showToast("⚠️ An account with this email already exists", "error");
    return false;
  }
  const newUser = {
    id: genId("user"), name, email, password, type,
    storeName: type === "seller" ? name + "'s Store" : undefined,
  };
  registeredUsers.push(newUser);
  state.currentUser = { ...newUser };
  delete state.currentUser.password;
  showToast(`🎉 Account created! Welcome, ${name.split(" ")[0]}!`, "success");
  renderNavAuth();
  navigate("home");
  return true;
}

function activateSeller() {
  if (!state.currentUser) return;
  state.currentUser.type = "seller";
  state.currentUser.storeName = state.currentUser.name + "'s Store";
  // also update registeredUsers record if exists
  const reg = registeredUsers.find(u => u.id === state.currentUser.id);
  if (reg) { reg.type = "seller"; reg.storeName = state.currentUser.storeName; }
  showToast("🚀 Seller account activated!", "success");
  renderNavAuth();
  navigate("seller-dashboard");
}

/* ─────────────────────────────────────────────
   CART
───────────────────────────────────────────── */
function addToCart(productId, qty = 1) {
  const existing = state.cart.find(c => c.productId === productId);
  if (existing) existing.qty += qty;
  else state.cart.push({ productId, qty });
  updateCartBadge();
  renderCartDrawer();
  const p = findProduct(productId);
  showToast(`🛒 Added "${p.name}" to cart`, "success");
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(c => c.productId !== productId);
  updateCartBadge();
  renderCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(c => c.productId === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(productId);
  updateCartBadge();
  renderCartDrawer();
}

function cartTotal() {
  return state.cart.reduce((sum, item) => {
    const p = findProduct(item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartBackdrop").classList.add("open");
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartBackdrop").classList.remove("open");
}

function renderCartDrawer() {
  const itemsEl = $("#cartItems");
  const emptyEl = $("#cartEmpty");
  const footEl  = $("#cartFoot");

  if (state.cart.length === 0) {
    itemsEl.innerHTML = "";
    emptyEl.style.display = "flex";
    footEl.style.display = "none";
    return;
  }
  emptyEl.style.display = "none";
  footEl.style.display = "block";

  itemsEl.innerHTML = state.cart.map(item => {
    const p = findProduct(item.productId);
    if (!p) return "";
    return `
      <div class="cart-item">
        <div class="ci-img" data-route="product" data-param="${p.id}">${p.image}</div>
        <div class="ci-info">
          <strong data-route="product" data-param="${p.id}">${p.name}</strong>
          <div class="ci-price">${fmtPrice(p.price)}</div>
        </div>
        <div class="ci-qty">
          <button data-action="dec" data-id="${p.id}">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-id="${p.id}">+</button>
        </div>
        <button class="ci-remove" data-action="remove" data-id="${p.id}">🗑</button>
      </div>
    `;
  }).join("");

  $("#cartSubtotal").textContent = fmtPrice(cartTotal());

  $$("[data-action='inc']", itemsEl).forEach(b => b.addEventListener("click", () => updateCartQty(b.dataset.id, 1)));
  $$("[data-action='dec']", itemsEl).forEach(b => b.addEventListener("click", () => updateCartQty(b.dataset.id, -1)));
  $$("[data-action='remove']", itemsEl).forEach(b => b.addEventListener("click", () => updateCartQty(b.dataset.id, -Infinity)));
}

function checkout() {
  if (!state.currentUser) {
    showToast("⚠️ Please log in to checkout", "error");
    closeCart();
    navigate("login");
    return;
  }
  if (state.cart.length === 0) return;

  const items = state.cart.map(item => {
    const p = findProduct(item.productId);
    return { productId: p.id, name: p.name, image: p.image, qty: item.qty, price: p.price };
  });
  const order = {
    id: genId("order").toUpperCase(),
    items,
    total: cartTotal(),
    date: Date.now(),
    status: "pending",
  };
  state.orders.unshift(order);
  state.cart = [];
  updateCartBadge();
  closeCart();
  showToast("✅ Order placed successfully!", "success");
  navigate("buyer-dashboard");
}

function buyNow(productId, qty = 1) {
  if (!state.currentUser) {
    showToast("⚠️ Please log in to buy", "error");
    navigate("login");
    return;
  }
  const p = findProduct(productId);
  const order = {
    id: genId("order").toUpperCase(),
    items: [{ productId: p.id, name: p.name, image: p.image, qty, price: p.price }],
    total: p.price * qty,
    date: Date.now(),
    status: "pending",
  };
  state.orders.unshift(order);
  showToast("✅ Order placed successfully!", "success");
  navigate("buyer-dashboard");
    }
