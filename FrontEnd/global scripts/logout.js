function logout() {
  localStorage.removeItem("user");
  window.location.assign("../login/login.html");
}
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", logout);
