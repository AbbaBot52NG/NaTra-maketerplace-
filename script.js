function showMessage() {
  alert("Welcome to NaTra Marketplace 🚀 Start exploring products!");
}
function filterCategory(category) {
  let result = document.getElementById("result");

  let data = {
    electronics: "💻 Laptops, Phones, POS Machines, Accessories",
    fashion: "👗 Clothes, Shoes (Takalmi), Bags, Jewelry",
    food: "🍔 Food, Drinks, Snacks, Restaurants",
    home: "🏠 Furniture, Kitchen Items, Appliances",
    wedding: "💒 Wedding Gowns, Suits, Decorations",
    tailoring: "🧵 Tailors, Fabrics, Designers",
    automotive: "🚗 Cars, Bikes, Spare Parts",
    digital: "📦 Software, Templates, Online Services"
  };
.products-section {
  padding: 50px 20px;
  text-align: center;
}

.products-section h2 {
  color: #00d4ff;
  margin-bottom: 20px;
}

#search {
  padding: 10px;
  width: 60%;
  margin-bottom: 30px;
  border-radius: 8px;
  border: none;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  background: #1f2937;
  padding: 15px;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: scale(1.05);
  background: #00d4ff;
  color: black;
}

.price {
  color: #22c55e;
  font-weight: bold;
                                }
  const products = [
  { name: "HP Laptop", category: "electronics", price: "₦450,000" },
  { name: "iPhone 14", category: "electronics", price: "₦900,000" },
  { name: "Nike Shoes", category: "fashion", price: "₦45,000" },
  { name: "Wedding Gown", category: "wedding", price: "₦120,000" },
  { name: "POS Machine", category: "electronics", price: "₦80,000" },
  { name: "Tailoring Fabric", category: "tailoring", price: "₦15,000" },
  { name: "Dining Table", category: "home", price: "₦200,000" },
  { name: "Food Pack", category: "food", price: "₦5,000" }
];

// DISPLAY PRODUCTS
function displayProducts(data) {
  let container = document.getElementById("products");

  container.innerHTML = data.map(p => `
    <div class="product-card">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <p class="price">${p.price}</p>
      <button onclick="buyNow('${p.name}')">Buy Now</button>
    </div>
  `).join("");
}

displayProducts(products);

// SEARCH FUNCTION
function searchProducts() {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}
let cart = [];

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}
// ADD NEW PRODUCT FROM SELLER
function addProduct() {
  let name = document.getElementById("pname").value;
  let price = document.getElementById("pprice").value;
  let category = document.getElementById("pcategory").value;

  if (!name || !price) {
    alert("Please fill all fields");
    return;
  }

  let newProduct = {
    name: name,
    price: "₦" + price,
    category: category
  };

  products.push(newProduct);

  displayProducts(products);

  alert("Product added successfully 🚀");

  // clear inputs
  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
}
// RENDER CART
function renderCart() {
  let container = document.getElementById("cart-items");
  let totalBox = document.getElementById("total");

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    total += Number(item.price.replace("₦", "").replace(",", ""));

    return `
      <div class="cart-item">
        <span>${item.name} - ${item.price}</span>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  }).join("");

  totalBox.innerText = "Total: ₦" + total.toLocaleString();
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
    }
  <button onclick="addToCart('${p.name}', '${p.price}')">Add to Cart</button>
// BUY BUTTON
function buyNow(name) {
  alert("You selected: " + name + " 🛒");
      }
  result.innerHTML = `
    <h3>${category.toUpperCase()}</h3>
    <p>${data[category]}</p>
  `;
}
