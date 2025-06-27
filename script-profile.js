async function loadProfile() {
  const path = window.location.pathname;
  const pathParts = path.split('/').filter(Boolean); // kiszűri az üres részeket
  const customUrl = pathParts[0];

  // Ha nincs customUrl vagy .html végződésű (pl. index.html, profile.html), ne csináljon semmit
  if (!customUrl || customUrl.endsWith('.html')) return;

  try {
    const response = await fetch(`https://thsnd-backend.onrender.com/api/user/${customUrl}`);
    if (!response.ok) {
      document.getElementById('content').innerHTML = `<p class="not-found">User not found</p>`;
      return;
    }

    const user = await response.json();
    document.getElementById('content').innerHTML = `
      <div class="profile-card">
        <h1>@${user.username}</h1>
        <p>Custom URL: trigger.bio/${user.customUrl}</p>
        <p>Email: ${user.email}</p>
      </div>
    `;
  } catch (err) {
    document.getElementById('content').innerHTML = `<p class="not-found">Something went wrong.</p>`;
    console.error(err);
  }
}

window.addEventListener('DOMContentLoaded', loadProfile);
