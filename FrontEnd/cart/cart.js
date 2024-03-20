//getting the user from local storage

const user = JSON.parse(localStorage.getItem("user"));

//if no one is logged in, then they get send back to the login-page

if (!user) {
  window.location.assign("../login/login.html");
}

//base url for the api
const url = "http://localhost:8080/";
//Showing the cart items
showCart();

//if empty cart then cannot checkout
let emptyCart = false;

async function getCart() {
  const data = {
    user_id: user.id,
  };
  const res = await fetch(url + "getCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  return await body;
}

async function showCart() {
  const cart = await getCart();
  const container = document.getElementById("cart-items");

  emptyCart = cart.length === 0;
  const cartHtml = cart
    .map((item) => {
      return `<div class="cart-item">
        <img class="image" src="../assets/${item.product_img}" />
        <div class="separator">
            <div class="info-container">
                <h6>${item.product_name}</h6>
                <h6>Quantity: ${item.quantity}</h6>
                <h6>$${Number(item.product_price).toFixed(2)}</h6>
            </div>
            <div class="btn-group">
                <button class="btn btn-primary" id="remove-btn" onclick="removeCartItem(${
                  item.product_id
                })">Remove</button>
                <button class="btn btn-primary" id="update-btn" onclick="updateCartItem(${
                  item.product_id
                }, ${item.quantity})">Update</button>
            </div>
        </div>
    </div>`;
    })
    .join("");

  container.innerHTML = cartHtml;
}

function removeCartItem(id) {
  const data = {
    userId: user.id,
    product_id: id,
  };
  fetch(url + "removeCartItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.status;
    })
    .then((data) => {
      showCart();
    });
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", closeModal);

function updateCartItem(id, quantity) {
  openModal();
  const quantityInput = document.getElementById("quantity");
  quantityInput.value = quantity;
  document.getElementById("submit-btn").addEventListener("click", () => {
    submitQuantity(id);
  });
}

function submitQuantity(id) {
  const quantity = document.getElementById("quantity").value;
  const data = {
    userId: user.id,
    product_id: id,
    quantity: quantity,
  };

  fetch(url + "updateCartItem", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.status;
    })
    .then((data) => {
      showCart();
      closeModal();
    });
}

function checkout() {
  if (emptyCart) {
    alert(
      "Your cart is empty. Please try again after adding items to your cart."
    );
    return;
  }
  window.location.assign("../checkout/checkout.html");
}
