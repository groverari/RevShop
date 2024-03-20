//Get the user from the local storage

const user = JSON.parse(localStorage.getItem("user"));

//if no one is logged in, then they get send back to the login-page

if (!user) {
  window.location.assign("../login/login.html");
}

//base url for the api

const url = "http://localhost:8080/";
//adding the event listener to the forms
window.addEventListener("DOMContentLoaded", (event) => {
  let form = document.getElementById("address");
  form.addEventListener("submit", addressInfo, true);
  form = document.getElementById("billing");
  form.addEventListener("submit", billingInfo, true);

  const shipping = document.getElementById("address");
  const shippingTitle = document.getElementById("shipping-title");
  const billing = document.getElementById("billing");
  const billingTitle = document.getElementById("billing-title");
  const checkout = document.getElementById("checkout-final");

  document.getElementById("prevShipping").addEventListener("click", () => {
    previous(billing, shipping, billingTitle, shippingTitle);
  });

  document.getElementById("shipping-edit").addEventListener("click", () => {
    previous(checkout, shipping, null, shippingTitle);
  });
});
//global array for the  array
let addressInformation = {};
function addressInfo(event) {
  //Stop form from reloading page on submition
  event.preventDefault();
  //getting form object from the page
  let form = document.getElementById("address");
  //getting the data from the form
  const data = new FormData(form);

  //building the object to send to the api
  data.forEach(function (value, key) {
    addressInformation[key] = value;
  });

  //switching to billing information
  const sTitle = document.getElementById("shipping-title");
  form.classList.add("hidden");
  sTitle.classList.add("hidden");
  document.getElementById("billing-title").classList.remove("hidden");
  document.getElementById("billing").classList.remove("hidden");
}

let billingInformation = {};
function billingInfo(event) {
  //Stop form from reloading page on submition
  event.preventDefault();
  //getting form object from the page
  let form = document.getElementById("billing");
  //getting the data from the form
  const data = new FormData(form);
  data.forEach(function (value, key) {
    billingInformation[key] = value;
  });

  showCheckout();

  //switching to checkout
  form.classList.add("hidden");
  document.getElementById("billing-title").classList.add("hidden");
  document.getElementById("checkout-final").classList.remove("hidden");
}

function previous(current, previous, prevTitle = 0, nextTitle = 0) {
  if (prevTitle) prevTitle.classList.add("hidden");
  if (nextTitle) nextTitle.classList.remove("hidden");
  current.classList.add("hidden");
  previous.classList.remove("hidden");
}
let total = 0;
function showCheckout() {
  const address =
    addressInformation.street +
    " " +
    addressInformation.city +
    ", " +
    addressInformation.state +
    " " +
    addressInformation.zip;
  document.getElementById("address-confirmation").innerHTML = address;

  const billing = `${billingInformation.name} <br>
                    XXXX XXXX XXXX ${billingInformation.card.substr(-4)} <br>
                    ${billingInformation.expiration}`;
  document.getElementById("billing-confirmation").innerHTML = billing;

  const data = {
    user_id: user.id,
  };
  fetch(url + "getCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      const out = data
        .map((item) => {
          total += item.product_price * item.quantity;

          return `
        <div class="cart-item">
            <p class="item-info">
                ${item.product_name}&emsp;
                </p>
                <p class="item-info">
                $${Number(item.product_price).toFixed(2)}&emsp;
                </p>
                <p class="item-info">
                ${item.quantity}   
            </p>
        </div>
        `;
        })
        .join("");
      document.getElementById("total").innerHTML = `Total: $${total.toFixed(
        2
      )}`;

      document.getElementById("cart").innerHTML = out;
    });
}

function checkout() {
  const data = {
    userId: user.id,
    total: total,
    ...addressInformation,
  };

  fetch(url + "checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res.status);
    if (res.status === 203) {
      openModalGood();
    } else {
      openModalBad();
    }
  });
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function openModalGood() {
  document.getElementById(
    "order-email"
  ).innerHTML = `Order was successfully submitted. 
                    Please check your email for any details.<br> 
                    The email we have on file is ${user.email}`;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function openModalBad() {
  document.getElementById(
    "order-email"
  ).innerHTML = `Some Error occured. We Will log you out now.<br> Please try again later.`;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  //Logs the user out
  localStorage.removeItem("user");
}
const closeModal = function (path) {
  window.location.assign("../dashboard/dashboard.html");
};
modal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function mockShipping() {
  document.getElementById("street").value = "123 Fake Street";
  document.getElementById("city").value = "Bronx";
  document.getElementById("state").value = "New York";
  document.getElementById("zip").value = "10001";
}
function mockCard() {
  document.getElementById("name").value = "Ariesh";
  document.getElementById("card").value = "1234567890123456";
  document.getElementById("expiration").value = "12/2020";
  document.getElementById("cvv").value = "123";
}
