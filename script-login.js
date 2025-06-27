document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('errorMessages');
  const themeToggle = document.getElementById('themeToggle');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  form.addEventListener('submit', async (e) => {
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

    try {
      const res = await fetch('https://thsnd-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
console.log('Login response data:', data);


      if (!res.ok) {
        errorBox.innerHTML = `<p>${data.error || 'Login failed'}</p>`;
        return;
      }

      // Backend visszaküldi a user adatokat, benne az _id-vel
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('customUrl', data.user.customUrl);

      alert('Login successful! Redirecting to dashboard...');
      window.location.href = '/dashboard.html';
    } catch (err) {
      errorBox.innerHTML = `<p>Network error: ${err.message}</p>`;
    }
  });
});
