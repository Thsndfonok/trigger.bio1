document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('errorMessages');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    const errors = [];

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Please enter a valid email address.');
    }

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    if (errors.length > 0) {
      errorBox.innerHTML = errors.map(e => `<p>${e}</p>`).join('');
      return;
    }

    errorBox.innerHTML = '';

    // TODO: Küldd el a login adatokat backendnek pl. fetch-sel
    // Itt szimuláljuk a sikeres bejelentkezést:

    localStorage.setItem('username', email.split('@')[0]); // egyszerű példa

    alert('Login successful! Redirecting to dashboard...');
    window.location.href = '/dashboard.html';
  });
});
