document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const dashboardLink = document.getElementById("menuDashboard");
  const loginLink = document.getElementById("menuLogin");
  const registerLink = document.getElementById("menuRegister");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Ha be van jelentkezve (pl. localStorage-ben van username)
  const username = localStorage.getItem("username");

  if (username) {
    dashboardLink.classList.remove("hidden");
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");
  } else {
    dashboardLink.classList.add("hidden");
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
  }
});
