document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Nem vagy bejelentkezve! Kérlek jelentkezz be.');
    window.location.href = '/login.html';
    return;
  }

  // username és customUrl továbbra is lehet localStorage-ban, vagy kérhetsz a backendből egy külön fetch-sel is
  const username = localStorage.getItem('username') || 'Guest';
  const customUrl = localStorage.getItem('customUrl') || '...';

  document.getElementById('welcomeMessage').textContent = `Welcome, ${username} 👋`;
  document.getElementById('customURL').value = `trigger.bio/${customUrl}`;

  const profilePicInput = document.getElementById('profilePic');
  const bgVideoInput = document.getElementById('bgVideo');
  const musicUploadInput = document.getElementById('musicUpload');
  const animatedTextInput = document.getElementById('animatedText');
  const previewText = document.getElementById('previewText');
  const saveBtn = document.getElementById('saveBtn');

  let profileImageUrl = '';
  let bgVideoUrl = '';
  let musicUrl = '';

  // Betöltjük a meglévő profiladatokat JWT token alapján
  async function loadUserData() {
    try {
      const res = await fetch(`https://thsnd-backend.onrender.com/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Nem sikerült betölteni a felhasználó adatait');
      const user = await res.json();

      profileImageUrl = user.profileImage || '';
      bgVideoUrl = user.bgVideoUrl || '';
      musicUrl = user.musicUrl || '';
      animatedTextInput.value = user.specialText || '';
      previewText.textContent = animatedTextInput.value || 'money is everything';

      if (profileImageUrl) {
        const imgPreview = document.getElementById('profilePicPreview');
        if (imgPreview) imgPreview.src = profileImageUrl;
      }
      if (bgVideoUrl) {
        const videoPreview = document.getElementById('bgVideoPreview');
        if (videoPreview) {
          videoPreview.src = bgVideoUrl;
          videoPreview.style.display = 'block';
        }
      }
      if (musicUrl) {
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer) {
          musicPlayer.src = musicUrl;
          musicPlayer.style.display = 'block';
        }
      }
    } catch (err) {
      alert('Hiba a profiladatok betöltésekor: ' + err.message);
    }
  }

  loadUserData();

  animatedTextInput.addEventListener('input', () => {
    previewText.textContent = animatedTextInput.value || 'money is everything';
  });

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

      const res = await fetch(`https://thsnd-backend.onrender.com/api/user`, {
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
        }),
      });

      if (!res.ok) throw new Error('Mentés sikertelen');

      alert('Profiladatok sikeresen elmentve!');
    } catch (err) {
      alert('Hiba történt: ' + err.message);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Changes';
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
