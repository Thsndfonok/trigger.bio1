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

    // A HTML-be beillesztjük a profil tartalmat + a háttérvideót és a zenevezérlőt
    document.getElementById("content").innerHTML = `
      <video id="bgVideo" autoplay muted loop playsinline style="display: ${user.bgVideoUrl ? 'block' : 'none'};">
        <source src="${user.bgVideoUrl || ''}" type="video/mp4">
        A böngésződ nem támogatja a videó lejátszást.
      </video>

      <div id="musicControls" style="display: ${user.musicUrl ? 'flex' : 'none'};">
        <button id="playPauseBtn" title="Zene lejátszása / szünet"><i class="fas fa-play"></i></button>
        <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.5" title="Hangerő szabályozó">
      </div>

      <audio id="musicPlayer" loop>
        <source src="${user.musicUrl || ''}" type="audio/mpeg">
        A böngésződ nem támogatja a hangfájl lejátszást.
      </audio>

      <div id="profile">
        <img src="${user.profileImage || '/default-profile.png'}" alt="Profilkép">
        <h1>${user.username}</h1>
        <p>${user.bio || 'Nincs megadva bemutatkozás.'}</p>
      </div>
    `;

    // Zene vezérlők beállítása
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    musicPlayer.volume = volumeSlider.value;

    playPauseBtn.addEventListener('click', () => {
      if (musicPlayer.paused) {
        musicPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        musicPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });

    volumeSlider.addEventListener('input', () => {
      musicPlayer.volume = volumeSlider.value;
    });

  } catch (err) {
    document.getElementById("content").innerHTML = "<h1>404 - A profil nem található</h1>";
  }
});
