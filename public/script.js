document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  const errors = [];

  if (password !== confirm) {
    errors.push("A jelszavak nem egyeznek!");
  }

  if (password.length < 8) {
    errors.push("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
  }

  const terms = document.getElementById('terms').checked;
  if (!terms) {
    errors.push("El kell fogadnod a felhasználási feltételeket!");
  }

  const errorBox = document.getElementById('errorMessages');
  if (errors.length > 0) {
    errorBox.innerHTML = errors.map(e => `<p>${e}</p>`).join('');
    return;
  } else {
    errorBox.innerHTML = "";
    alert("Sikeres regisztráció!");
    // Itt mehet a backend hívás vagy submit
    this.submit();
  }
});

// Jelszóerősség vizsgálat
document.getElementById('password').addEventListener('input', function () {
  const val = this.value;
  const strengthBox = document.getElementById('passwordStrength');
  let strength = "Gyenge";
  let color = "red";

  if (val.length >= 12 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
    strength = "Erős";
    color = "limegreen";
  } else if (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) {
    strength = "Közepes";
    color = "orange";
  }

  strengthBox.textContent = `Jelszó erőssége: ${strength}`;
  strengthBox.style.color = color;
});
