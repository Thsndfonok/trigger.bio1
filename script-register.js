const form = document.getElementById('registerForm');
const errorBox = document.getElementById('errorMessages');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errors = [];

  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;
  const customUrl = form.customUrl.value.trim();

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

  if (errors.length > 0) {
    errorBox.innerHTML = errors.map(e => `<p style="color:red;">${e}</p>`).join('');
    return;
  }

  errorBox.innerHTML = '';

  try {
    // Backend POST kérés, endpointot neked kell beállítani
    const response = await fetch('https://trigger.bio/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, customUrl }),
    });

    if (!response.ok) {
      const data = await response.json();
      errorBox.innerHTML = `<p style="color:red;">${data.message || 'Registration failed.'}</p>`;
      return;
    }

    alert('Registration successful!');
    form.reset();
    window.location.href = 'dashboard.html';  // átirányítás
  } catch (error) {
    errorBox.innerHTML = `<p style="color:red;">Network error, please try again later.</p>`;
    console.error(error);
  }
});
