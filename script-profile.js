async function loadProfile() {
  const pathParts = window.location.pathname.split('/');
  const customUrl = pathParts[1];

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
        <p><strong>Custom URL:</strong> trigger.bio/${user.customUrl}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      </div>
    `;
  } catch (err) {
    document.getElementById('content').innerHTML = `<p class="not-found">Something went wrong. Please try again later.</p>`;
    console.error('Error fetching profile:', err);
  }
}

window.addEventListener('DOMContentLoaded', loadProfile);
