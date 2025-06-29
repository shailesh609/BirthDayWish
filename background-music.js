// background-music.js
// Add background music to the page

window.onload = function() {
  const musicSrc = 'happy-birthday.mp3'; // Ensure this file exists in your project
  const STORAGE_KEY = 'bg-music-time';

  // Create audio element
  const audio = document.createElement('audio');
  audio.src = musicSrc;
  audio.loop = true;
  audio.autoplay = true;
  audio.volume = 0.5;
  audio.style.display = 'none'; // Hide the default controls

  // Try to resume from last saved time
  const savedTime = localStorage.getItem(STORAGE_KEY);
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  document.body.appendChild(audio);

  // Try to play music on page load
  audio.play().catch(() => {});

  // Fallback: play music on any user interaction
  function tryPlayMusic() {
    audio.play().catch(() => {});
  }
  window.addEventListener('click', tryPlayMusic, { once: true });
  window.addEventListener('keydown', tryPlayMusic, { once: true });
  window.addEventListener('touchstart', tryPlayMusic, { once: true });

  // Save current time before leaving the page
  window.addEventListener('beforeunload', function() {
    localStorage.setItem(STORAGE_KEY, audio.currentTime);
  });
}; 