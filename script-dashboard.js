document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Nem vagy bejelentkezve! Kérlek jelentkezz be.');
    window.location.href = '/login.html';
    return;
  }

  // Elemválasztók
  const navDashboard = document.getElementById('navDashboard');
  const navLinks = document.getElementById('navLinks');
  const navPremium = document.getElementById('navPremium');

  const sectionDashboard = document.getElementById('sectionDashboard');
  const sectionLinks = document.getElementById('sectionLinks');
  const sectionPremium = document.getElementById('sectionPremium');

  // Dashboard elemek
  const profilePicInput = document.getElementById('profilePic');
  const bgVideoInput = document.getElementById('bgVideo');
  const musicUploadInput = document.getElementById('musicUpload');
  const animatedTextInput = document.getElementById('animatedText');
  const previewText = document.getElementById('previewText');
  const saveBtn = document.getElementById('saveBtn');

  // Links elemek
  const linksList = document.getElementById('linksList');
  const linkPlatform = document.getElementById('linkPlatform');
  const linkUrl = document.getElementById('linkUrl');
  const addLinkBtn = document.getElementById('addLinkBtn');

  // Kijelentkezés gomb
  const logoutBtn = document.getElementById('logoutBtn');

  let profileImageUrl = '';
  let bgVideoUrl = '';
  let musicUrl = '';

  // Linkek tároló (betöltéskor backendről)
  let links = [];

  // Menüpontok kezelése
  function setActiveSection(section) {
    // aktív menü gomb
    [navDashboard, navLinks, navPremium].forEach(btn => btn.classList.remove('active'));
    if (section === 'dashboard') navDashboard.classList.add('active');
    else if (section === 'links') navLinks.classList.add('active');
    else if (section === 'premium') navPremium.classList.add('active');

    // megjelenítés
    sectionDashboard.style.display = section === 'dashboard' ? 'block' : 'none';
    sectionLinks.style.display = section === 'links' ? 'block' : 'none';
    sectionPremium.style.display = section === 'premium' ? 'block' : 'none';
  }

  navDashboard.addEventListener('click', () => setActiveSection('dashboard'));
  navLinks.addEventListener('click', () => setActiveSection('links'));
  navPremium.addEventListener('click', () => setActiveSection('premium'));

  // Kijelentkezés
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('customUrl');
    window.location.href = '/login.html';
  });

  // Betöltjük a meglévő profiladatokat és linkeket
  async function loadUserData() {
    try {
      const res = await fetch(`https://thsnd-backend.onrender.com/api/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Nem sikerült betölteni a felhasználó adatait');
      const user = await res.json();

      profileImageUrl = user.profileImage || '';
      bgVideoUrl = user.bgVideoUrl || '';
      musicUrl = user.musicUrl || '';
      animatedTextInput.value = user.specialText || '';
      previewText.textContent = animatedTextInput.value || 'money is everything';

      links = user.links || [];
      renderLinks();

      // Előnézetek
      const imgPreview = document.getElementById('profilePicPreview');
      if (profileImageUrl && imgPreview) imgPreview.src = profileImageUrl;

      const videoPreview = document.getElementById('bgVideoPreview');
      if (bgVideoUrl && videoPreview) {
        videoPreview.src = bgVideoUrl;
        videoPreview.style.display = 'block';
      } else if (videoPreview) {
        videoPreview.style.display = 'none';
      }

      const musicPlayer = document.getElementById('musicPlayer');
      if (musicUrl && musicPlayer) {
        musicPlayer.src = musicUrl;
        musicPlayer.style.display = 'block';
      } else if (musicPlayer) {
        musicPlayer.style.display = 'none';
      }
    } catch (err) {
      alert('Hiba a profiladatok betöltésekor: ' + err.message);
    }
  }

  loadUserData();

  animatedTextInput.addEventListener('input', () => {
    previewText.textContent = animatedTextInput.value || 'money is everything';
  });

  // Linkek megjelenítése a listában
  function renderLinks() {
    linksList.innerHTML = '';
    if (links.length === 0) {
      linksList.innerHTML = '<li>Nincsenek linkek hozzáadva.</li>';
      return;
    }
    links.forEach((link, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="icon">${getIconHTML(link.label)}</span> 
        <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>
        <button class="removeLinkBtn" data-index="${i}" title="Törlés">&times;</button>
      `;
      linksList.appendChild(li);
    });

    // Link törlés kezelése
    document.querySelectorAll('.removeLinkBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        links.splice(index, 1);
        renderLinks();
        saveLinksToBackend();
      });
    });
  }

  // Ikonok HTML-je platform nevekhez (FontAwesome)
  function getIconHTML(platform) {
    switch (platform.toLowerCase()) {
      case 'instagram': return '<i class="fab fa-instagram"></i>';
      case 'facebook': return '<i class="fab fa-facebook"></i>';
      case 'twitter': return '<i class="fab fa-twitter"></i>';
      case 'youtube': return '<i class="fab fa-youtube"></i>';
      case 'tiktok': return '<i class="fab fa-tiktok"></i>';
      case 'linkedin': return '<i class="fab fa-linkedin"></i>';
      case 'github': return '<i class="fab fa-github"></i>';
      case 'website': return '<i class="fas fa-globe"></i>';
      default: return '<i class="fas fa-link"></i>';
    }
  }

  // Link hozzáadás
  addLinkBtn.addEventListener('click', () => {
    const platform = linkPlatform.value.trim();
    const url = linkUrl.value.trim();

    if (!url) {
      alert('Kérlek add meg a link URL-jét!');
      return;
    }
    if (!isValidUrl(url)) {
      alert('Érvénytelen URL!');
      return;
    }
    if (!platform) {
      alert('Kérlek válassz platformot!');
      return;
    }

    // Új link hozzáadása
    links.push({ label: platform, url });
    renderLinks();
    saveLinksToBackend();

    // Űrlap tisztítása
    linkUrl.value = '';
    linkPlatform.selectedIndex = 0;
  });

  // URL validáció egyszerűen
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  // Linkek mentése a backendbe (PUT /api/profile)
  async function saveLinksToBackend() {
    try {
      const res = await fetch('https://thsnd-backend.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ links })
      });
      if (!res.ok) throw new Error('Linkek mentése sikertelen');
    } catch (err) {
      alert('Hiba a linkek mentésekor: ' + err.message);
    }
  }

  // Mentés gomb működése (profil adatok + fájl feltöltések)
  saveBtn.addEventListener('click', async () => {
    try {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Mentés...';

      if (profilePicInput.files.length > 0) {
        profileImageUrl = await uploadFile(profilePicInput.files[0], 'profileImage', 'upload-profile-image');
      }

      if (bgVideoInput.files.length > 0) {
        bgVideoUrl = await uploadFile(bgVideoInput.files[0], 'bgVideo', 'upload-bg-video');
      }

      if (musicUploadInput.files.length > 0) {
        musicUrl = await uploadFile(musicUploadInput.files[0], 'musicFile', 'upload-music');
      }

      // A profil mentése a backendnek, a többi adatot is elküldjük, pl. specialText, és linkek (a linkeket már mentettük külön)
      const res = await fetch(`https://thsnd-backend.onrender.com/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          profileImage: profileImageUrl,
          bgVideoUrl,
          musicUrl,
          specialText: animatedTextInput.value,
          links
        }),
      });

      if (!res.ok) throw new Error('Mentés sikertelen');

      alert('Profiladatok sikeresen elmentve!');
    } catch (err) {
      alert('Hiba történt: ' + err.message);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Mentés';
    }
  });

});

// Feltöltő helper JWT tokennel
async function uploadFile(file, endpointFieldName, endpoint) {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append(endpointFieldName, file);

  const res = await fetch(`https://thsnd-backend.onrender.com/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) throw new Error(`Feltöltés sikertelen: ${endpoint}`);

  const data = await res.json();
  return data.url;
}
