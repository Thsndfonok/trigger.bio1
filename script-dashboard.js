// Betöltéskor beállítjuk a nevet és a custom URL-t
const username = localStorage.getItem('username') || 'Guest';
const customUrl = localStorage.getItem('customUrl') || '...';

document.getElementById('welcomeMessage').textContent = `Welcome, ${username} 👋`;
document.getElementById('customURL').value = `trigger.bio/${customUrl}`;

// Preview animált szöveg
document.getElementById('saveBtn').addEventListener('click', () => {
  const animatedText = document.getElementById('animatedText').value;
  document.getElementById('previewText').textContent = animatedText;

  // Itt jöhet majd a backend mentés (fetch / API)
  console.log('Feltöltve:');
  console.log('Profilkép:', document.getElementById('profilePic').files[0]);
  console.log('Háttérvideó:', document.getElementById('bgVideo').files[0]);
  console.log('Zene:', document.getElementById('musicUpload').files[0]);
  console.log('Szöveg:', animatedText);
});
