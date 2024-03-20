async function login() {
  const url = "http://localhost:8080/login";

  const username = document.getElementById("username");
  const pass = document.getElementById("password");
  const data = {
    username: username.value,
    password: pass.value,
  };

  //Check if any field is empty
  if (data.password == "" || data.username == "") {
    const error = document.getElementById("error");
    error.innerHTML = "Both Username and Password are required";
    return;
  }

  //console.log(data);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const body = await res.json();
    console.log(body);
    localStorage.setItem("user", JSON.stringify(body));
    window.location.assign("../dashboard/dashboard.html");
    //here I have to login and change the page
    // need to store user info
  } catch (err) {
    //show red text above the form
    const error = document.getElementById("error");
    error.innerHTML =
      "Could not login! \n Please check username and password and try again.";
  }
}
