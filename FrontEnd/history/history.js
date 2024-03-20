const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.assign("../login/login.html");
}

const url = "http://localhost:8080/";

let orders = [];
getOrders();

async function getOrders() {
  const data = {
    id: user.id,
  };
  const res = await fetch(url + "userOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  const historyHTML = body
    .map((order) => {
      return `
    <div class="order">
      <h4>Order No. ${order.id}</h4>
      <h4>Total:  $${order.total.toFixed(2)}</h4>
      <h4>Shipped To:<br> ${order.street}, <br> ${order.city} ${order.state}, ${
        order.zip
      } </h4> 
      <button class="btn" onclick="getProducts(${
        order.id
      })">See Details</button>
    </div>`;
    })
    .join("");

  document.getElementById("history").innerHTML = historyHTML;
}

async function getProducts(order) {
  const data = {
    id: Number(order),
  };
  const res = await fetch(url + "orderItems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  const productsHTML = body
    .map((product) => {
      const subtotal = (product.price * product.quantity).toFixed(2);
      return `
      <tr>
        <td>${product.name}</td>
        <td>$${Number(product.price).toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>$${subtotal}</td>
      </tr>
    `;
    })
    .join("");
  document.getElementById("order-items").innerHTML = productsHTML;
  openModal();
}
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

overlay.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);
