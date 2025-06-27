async function loadProfile() {
  // Kinyerjük az URL útvonalát, pl. "/thsnd"
  const path = window.location.pathname;
  // Felbontjuk '/' mentén, és kiszűrjük az üres részeket
  const pathParts = path.split('/').filter(Boolean);
  // Az első elem a customUrl (pl. "thsnd")
  const customUrl = pathParts[0];

  // Ha nincs customUrl, vagy az .html-re végződik (pl. index.html), nem csinálunk semmit
  if (!customUrl || customUrl.endsWith('.html')) return;

  try {
    // Lekérjük az adatot a backend API-ból
    const response = await fetch(`https://thsnd-backend.onrender.com/api/user/${customUrl}`);
    if (!response.ok) {
      document.getElementById('content').innerHTML = `<p class="not-found">User not found</p>`;
      return;
    }

    // Parse-oljuk az adatot
    const user = await response.json();

    // Megjelenítjük a profilt
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

// Amikor betöltődött az oldal, lefuttatjuk a loadProfile-t
window.addEventListener('DOMContentLoaded', loadProfile);
