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
  result.innerHTML = `
    <h3>${category.toUpperCase()}</h3>
    <p>${data[category]}</p>
  `;
}
