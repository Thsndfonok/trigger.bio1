document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('errorMessages');
  const themeToggle = document.getElementById('themeToggle');

  // Betöltéskor állítsuk be a témát a localStorage alapján
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  // Téma váltó gomb esemény
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

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
    // Sikeres bejelentkezés példája:
    localStorage.setItem('username', email.split('@')[0]);

    alert('Login successful! Redirecting to dashboard...');
    window.location.href = '/dashboard.html';
  });
});
