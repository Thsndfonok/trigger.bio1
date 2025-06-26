document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const dropdown = document.getElementById("dropdownMenu");
  const dashboardLink = document.getElementById("menuDashboard");
  const loginLink = document.getElementById("menuLogin");
  const registerLink = document.getElementById("menuRegister");

  // Hamburger menü toggle
  hamburger.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  // Ellenőrizzük a bejelentkezést (pl. localStorage-ból)
  const username = localStorage.getItem("username");

  if (username) {
    // Ha be van jelentkezve, csak dashboard gomb legyen
    dashboardLink.classList.remove("hidden");
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");
  } else {
    // Ha nincs bejelentkezve, register és login gombok láthatók legyenek
    dashboardLink.classList.add("hidden");
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
  }
});
