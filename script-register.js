document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;
  const errorBox = document.getElementById('errorMessages');
  const errors = [];

  if (password !== confirm) {
    errors.push("A jelszavak nem egyeznek.");
  }

  if (password.length < 8) {
    errors.push("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
  }

  if (!terms) {
    errors.push("El kell fogadnod a felhasználási feltételeket.");
  }

  if (errors.length > 0) {
    errorBox.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
  } else {
    errorBox.innerHTML = '';
    alert("Sikeres regisztráció!");
    this.submit();
  }
});

// Jelszóerősség
document.getElementById('password').addEventListener('input', function () {
  const val = this.value;
  const strengthBox = document.getElementById('passwordStrength');
  let strength = "Gyenge", color = "red";

  if (val.length >= 12 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
    strength = "Erős";
    color = "green";
  } else if (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) {
    strength = "Közepes";
    color = "orange";
  }

  strengthBox.textContent = `Jelszó erőssége: ${strength}`;
  strengthBox.style.color = color;
});

// Profilkép előnézet
document.getElementById('profilePic').addEventListener('change', function () {
  const preview = document.getElementById('preview');
  preview.innerHTML = '';
  const file = this.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Dark/Light toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
