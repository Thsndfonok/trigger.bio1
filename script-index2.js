document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".hero-button");

  // Példa: kattintáskor animáció
  button.addEventListener("click", () => {
    button.textContent = "Redirecting...";
  });
});
