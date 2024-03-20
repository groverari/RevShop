const url = "http://localhost:8080/";
const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get("product_id");
setPage();

// overall function that loads all the data from products and reviews
async function setPage() {
  const prod = await getProductInfo(product);
  displayProduct(await prod);
}

//getting product info from db
async function getProductInfo(productId) {
  const data = { id: productId };
  const res = await fetch(url + "product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  if (body.status == 400) {
    alert(
      "Could Not find the product. Please go back to the dashboard and try again"
    );
  }
  return body;
}
// Takes product info and places it on the screen
function displayProduct(info) {
  console.log(info.reviews);
  const reviews = info.reviews
    .map((review) => {
      return `
      <div class="review">
        <h4>Anonymous User: </h4>
        <p>${review.review}</p>
      </div>
    `;
    })
    .join("");

  const container = document.querySelector("section");

  container.innerHTML = `
  <div id="product_info">
    <h1 id="product_id">${info.product_name}</h1>
    <h3 id="product_price" >$${info.price.toFixed(2)}</h3>
    <p id="product_details">${info.info}</p>
    <div id="reviews">
          <h2>Reviews</h2>
          ${reviews}
        </div>
    </div>
    <div id="other-info" >
      <img id="product_img" src="../assets/${
        info.img
      }" alt = "A picture of the cover of ${info.product_name}">
      <div class= "form-group">
      <p id="error" style="text-align: center; width: 300px;"></p>
      <label for(quantity)>Enter Quantity: </label>
      <input type = "number" id = "quantity" min = "1" value = "1" />
      </div>
      <button id="submit-btn" class="btn" onclick="addtoCart()">Add to Cart</button>
    </div>
  `;
}
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
function openAddReview() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

async function submitReview() {
  const review = document.getElementById("user-review").value;
  //console.log(!review);
  if (!review) {
    document.getElementById("error").innerHTML = "Review cannot be empty";
    return;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const data = {
    user_id: user.id,
    product_id: product,
    review: review,
  };
  const body = pushReview(data);
  if (!body) {
    document.getElementById("error").innerHTML =
      "We were unable to add your review to the database try again";
    return;
  }
  modal.innerHTML = `<h1 style="color:green;text-align: center">Successfully added your review to the database</h1>`;
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

async function pushReview(data) {
  const res = await fetch(url + "addReview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  return await body;
}

async function addtoCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = {
    userId: user.id,
    product_id: Number(product),
    quantity: Number(document.getElementById("quantity").value),
  };

  let res = await fetch(url + "addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const err = document.getElementById("error");
  if (res.status === 202) {
    err.innerHTML = `Successfully added to your cart`;
    err.style.color = "green";
  } else {
    err.innerHTML = `This item is already in your cart. You can change the quantity in the cart`;
    err.style.color = "red";
  }
}
