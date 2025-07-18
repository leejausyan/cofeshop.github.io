let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
  cart.push({ item, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(item + " ditambahkan ke cart!");
}

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;
  container.innerHTML = "";
  let total = 0;

  cart.forEach((entry, index) => {
    total += entry.price;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b py-2";
    div.innerHTML = `
      <span>${entry.item} - Rp${entry.price}</span>
      <button onclick="removeItem(${index})" class="text-red-500">Hapus</button>
    `;
    container.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "mt-4 font-bold";
  totalDiv.textContent = `Total: Rp${total}`;
  container.appendChild(totalDiv);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const form = document.getElementById("orderForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value;
      const table = form.table.value;
      const phone = form.phone.value;

      const response = await fetch("https://YOUR_BACKEND_URL_HERE/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, table, phone, cart }),
      });

      if (response.ok) {
        localStorage.removeItem("cart");
        form.reset();
        document.getElementById("successMessage").classList.remove("hidden");
      } else {
        alert("Gagal mengirim pesanan.");
      }
    });
  }
});
