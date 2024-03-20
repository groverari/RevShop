//getting user info
const user = JSON.parse(localStorage.getItem("user"));

//if no one is logged in, then they get send back to the login-page
if (!user) {
  window.location.assign("../login/login.html");
}

//base url for the api
const url = "http://localhost:8080/";

//Array that holds all the products so that the page can be dynamically changed by search
let books = [];
let categories = new Set();

//gets all the books that are in the database
const products = fetch(url + "products")
  .then((res) => {
    return res.json();
  })
  .then((body) => {
    books = body;
  })
  .then(() => {
    const bookHTML = books

      .map((book) => {
        categories.add(book.category);
        return showProducts(book);
      })
      .join("");

    document.getElementById("products").innerHTML = bookHTML;
    showCategories();
  });

/**
 *
 * FUNCTION FORMAT THE PRODUCTS ONTO THE PAGE
 * JUST RETURNS HTML
 */
function showProducts(book) {
  return `<div class="book">
                  <img class="book-img" src="../assets/${book.img}" 
                      alt="the cover of ${book.product_name}"/>
                  <h3 class="book-title" >${book.product_name}</h3>
                  <span class="price" >$${Number(book.price).toFixed(2)}</span>
                  <p class="info">${book.info}</p>
                  <div class="btn-group">
                      <button class="book-btn" onclick="addToCart(${book.id})">
                          Add to Cart
                      </button>
                      <button class="book-btn" onclick="moreInfo(${book.id})">
                          More Info
                      </button>
                  </div>
              </div>`;
}

function showCategories() {
  const container = document.getElementById("category-filter");
  let categoryHTML = "";
  categories.forEach((category) => {
    const newButton = document.createElement("button");
    newButton.textContent = category;
    newButton.setAttribute("class", "btn category");
    newButton.setAttribute("onclick", `catFilter("${category}")`);
    container.appendChild(newButton);
  });
}

function catFilter(category) {
  console.log(category);

  let filtered = books.filter((book) => {
    return book.category === category;
  });
  console.log(filtered);
  const filteredHTML = filtered
    .map((book) => {
      return showProducts(book);
    })
    .join("");
  console.log(filteredHTML);
  document.getElementById("products").innerHTML = filteredHTML;
  document.getElementById("clear").classList.remove("hidden");
}

async function addToCart(product_id) {
  let data = {
    userId: user.id,
    product_id: product_id,
    quantity: 1,
  };
  console.log(data);

  let res = await fetch(url + "addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  data = await res.json();
  if (data === true) {
    document.getElementById("modal-title").innerHTML = `Success!`;
    document.getElementById(
      "content"
    ).innerHTML = `Successfully added to your cart`;
  } else {
    document.getElementById("modal-title").innerHTML = `Uh Oh!`;
    document.getElementById(
      "content"
    ).innerHTML = `This item is already in your cart. You can change the quantity in the cart screen`;
  }

  openModal();
}

//Leads user to product page
function moreInfo(product_id) {
  window.location.assign(`../product/product.html?product_id=${product_id}`);
}

//Modal to show that item was added to cart
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
modal.addEventListener("click", closeModal);

//Logout functionality

//Displays name at the top of the screen
const name = document.getElementById("name");
name.innerHTML = `Welcome to Revshop,  ${user.first_name}!`;

//searchbar
const searchbar = document.getElementById("search-bar");
const searchbox = document.getElementById("search-box");
const searchbtn = document.getElementById("search-btn");

searchbar.addEventListener("click", openSearch);

function openSearch() {
  searchbox.value = "";
  searchbar.classList.toggle("close");
  searchbox.classList.toggle("close");
  searchbtn.classList.toggle("close");
  searchbar.classList.toggle("open");
  searchbox.classList.toggle("open");
  searchbtn.classList.toggle("open");
}

function submitSearch() {
  const searchstring = searchbox.value;

  filtered_products = books.filter((book) => {
    const name = book.product_name + " " + book.info;
    return name.toLowerCase().includes(searchstring.toLowerCase());
  });
  const products = document.getElementById("products");
  products.innerHTML = filtered_products
    .map((book) => {
      return showProducts(book);
    })
    .join("");

  const clearSearch = document.getElementById("clear");
  clearSearch.classList.remove("hidden");
}
function clearSearch() {
  const products = document.getElementById("products");
  products.innerHTML = books
    .map((book) => {
      return showProducts(book);
    })
    .join("");

  const clearSearch = document.getElementById("clear");
  clearSearch.classList.add("hidden");
}
