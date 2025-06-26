const profilePicInput = document.getElementById('profilePic');
const profilePicPreview = document.getElementById('profilePicPreview');
const bgVideoInput = document.getElementById('bgVideo');
const bgVideoPreview = document.getElementById('bgVideoPreview');
const musicInput = document.getElementById('music');
const musicPreview = document.getElementById('musicPreview');
const form = document.getElementById('dashboardForm');

function previewFile(input, previewContainer, type) {
  previewContainer.innerHTML = '';
  const file = input.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  let element;
  if (type === 'image') {
    element = document.createElement('img');
    element.src = url;
  } else if (type === 'video') {
    element = document.createElement('video');
    element.src = url;
    element.controls = true;
    element.loop = true;
    element.muted = true;
    element.autoplay = true;
  } else if (type === 'audio') {
    element = document.createElement('audio');
    element.src = url;
    element.controls = true;
  }
  previewContainer.appendChild(element);
}

profilePicInput.addEventListener('change', () => previewFile(profilePicInput, profilePicPreview, 'image'));
bgVideoInput.addEventListener('change', () => previewFile(bgVideoInput, bgVideoPreview, 'video'));
musicInput.addEventListener('change', () => previewFile(musicInput, musicPreview, 'audio'));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    profilePic: profilePicInput.files[0] || null,
    bgVideo: bgVideoInput.files[0] || null,
    music: musicInput.files[0] || null,
    animatedText: document.getElementById('animatedText').value,
    animationStyle: document.getElementById('animationStyle').value,
    textColor: document.getElementById('textColor').value,
  };

  // Itt lehet backendnek küldeni az adatokat pl. fetch POST-tal
  console.log('Mentésre küldött adatok:', data);

  alert('Az adatok konzolra kiírva, később backendhez kapcsolható.');
});
