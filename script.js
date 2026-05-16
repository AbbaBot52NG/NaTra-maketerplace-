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

  result.innerHTML = `
    <h3>${category.toUpperCase()}</h3>
    <p>${data[category]}</p>
  `;
}
