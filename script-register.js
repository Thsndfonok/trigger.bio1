const form = document.getElementById('registerForm');
const errorBox = document.getElementById('errorMessages');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const passwordStrengthBox = document.getElementById('passwordStrength');

form.addEventListener('submit', (e) => {
  e.preventDefault();  // megakadályozza az oldal újratöltését

  const errors = [];

  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;
  const customUrl = form.customUrl.value.trim();
  const termsAccepted = document.getElementById('terms').checked;

  if (username.length < 4 || username.length > 20) {
    errors.push('Username must be 4-20 characters long.');
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Please enter a valid email address.');
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }

  if (password !== confirm) {
    errors.push('Passwords do not match.');
  }

  if (!customUrl.match(/^[a-zA-Z0-9-_]{3,}$/)) {
    errors.push('Custom URL must be at least 3 characters and contain only letters, numbers, hyphens, or underscores.');
  }

  if (!termsAccepted) {
    errors.push('You must accept the terms of service.');
  }

  if (errors.length > 0) {
    errorBox.innerHTML = errors.map(e => `<p style="color:red;">${e}</p>`).join('');
    return;
  }

  errorBox.innerHTML = '';

  alert('Registration successful!');

  form.reset();

  // Átirányítás a dashboard.html-re
  window.location.href = 'dashboard.html';
});

// Jelszó erősség mutató
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let strength = 'Weak';
  let color = 'red';

  if (val.length >= 12 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
    strength = 'Strong';
    color = 'limegreen';
  } else if (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) {
    strength = 'Medium';
    color = 'orange';
  }

  passwordStrengthBox.textContent = `Password strength: ${strength}`;
  passwordStrengthBox.style.color = color;
});
