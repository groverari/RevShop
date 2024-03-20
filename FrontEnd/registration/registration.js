//Code to block from from reloading page on submition
window.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("reg-form");
  form.addEventListener("submit", signup, true);
});

async function signup(event) {
  //stops the page from reloading automatically
  event.preventDefault();
  //resetting the error field if there is an existing error
  const error = document.getElementById("error");
  error.innerHTML = "";

  //getting form data to handle
  const form = document.getElementById("reg-form");
  const data = new FormData(form);

  //Make sure the password is typed correctly
  if (data.get("password") != data.get("pass2")) {
    error.innerHTML = "The passwords do not match";
    document.getElementById("pass2").value = "";
    return;
  }
  //before we send the data to the server we delete pass2 because it is redundant
  data.delete("pass2");
  // All fields check out now we have to go the database
  formData = {}; //this is an empty object that will become the json as part of the request
  data.forEach(function (value, key) {
    formData[key] = value;
  });
  console.log(formData);
  const url = "http://localhost:8080/register";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  try {
    const body = await res.json();
    localStorage.setItem("user", JSON.stringify(body));
    window.location.assign("../dashboard/dashboard.html");
  } catch (err) {
    error.innerHTML =
      "Email already exists! You can try resetting your password";
  }
}
