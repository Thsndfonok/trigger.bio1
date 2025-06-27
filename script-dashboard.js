document.addEventListener('DOMContentLoaded', () => {
  // Betöltéskor beállítjuk a nevet és a custom URL-t localStorage-ból
  const username = localStorage.getItem('username') || 'Guest';
  const customUrl = localStorage.getItem('customUrl') || '...';

  document.getElementById('welcomeMessage').textContent = `Welcome, ${username} 👋`;
  document.getElementById('customURL').value = `trigger.bio/${customUrl}`;

  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Nem vagy bejelentkezve vagy nincs userId tárolva!');
    return;
  }

  const profilePicInput = document.getElementById('profilePic');
  const bgVideoInput = document.getElementById('bgVideo');
  const musicUploadInput = document.getElementById('musicUpload');
  const animatedTextInput = document.getElementById('animatedText');
  const previewText = document.getElementById('previewText');
  const saveBtn = document.getElementById('saveBtn');

  let profileImageUrl = '';
  let bgVideoUrl = '';
  let musicUrl = '';

  // Animált szöveg élő frissítés
  animatedTextInput.addEventListener('input', () => {
    previewText.textContent = animatedTextInput.value || 'money is everything';
  });

  saveBtn.addEventListener('click', async () => {
    try {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Mentés...';

      // Fájlok feltöltése, ha van új fájl kiválasztva
      if (profilePicInput.files.length > 0) {
        profileImageUrl = await uploadFile(userId, profilePicInput.files[0], 'profileImage', 'upload-profile-image');
      }

      if (bgVideoInput.files.length > 0) {
        bgVideoUrl = await uploadFile(userId, bgVideoInput.files[0], 'bgVideo', 'upload-bg-video'); 
        // Backend végpont szükséges még
      }

      if (musicUploadInput.files.length > 0) {
        musicUrl = await uploadFile(userId, musicUploadInput.files[0], 'musicFile', 'upload-music'); 
        // Backend végpont szükséges még
      }

      // Mentés a profil többi adatával
      const res = await fetch(`https://thsnd-backend.onrender.com/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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

// A fetch-es feltöltő helper függvény:
async function uploadFile(userId, file, endpointFieldName, endpoint) {
  const formData = new FormData();
  formData.append(endpointFieldName, file);

  const res = await fetch(`https://thsnd-backend.onrender.com/api/${endpoint}/${userId}`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error(`Feltöltés sikertelen: ${endpoint}`);

  const data = await res.json();
  return data.url;
}
