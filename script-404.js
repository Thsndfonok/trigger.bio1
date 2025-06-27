document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname.replace("/", ""); // pl. thsnd

  if (!path) {
    document.getElementById("content").innerHTML = "<h1>404 - Érvénytelen cím</h1>";
    return;
  }

  try {
    const response = await fetch(`https://thsnd-backend.onrender.com/api/user/${path}`);
    if (!response.ok) throw new Error("Nem található");

    const user = await response.json();

    document.title = `${user.username} profilja`;

    document.getElementById("content").innerHTML = `
      <div id="profile">
        <img src="${user.profileImage || '/default-profile.png'}" alt="Profilkép">
        <h1>${user.username}</h1>
        <p>${user.bio || 'Nincs megadva bemutatkozás.'}</p>
      </div>
    `;
  } catch (err) {
    document.getElementById("content").innerHTML = "<h1>404 - A profil nem található</h1>";
  }
});
