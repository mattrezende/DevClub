const name = localStorage.getItem('devclub_visitor');

if (!name) {
  window.location.href = 'index.html';
} else {
  document.getElementById('visitor-name').textContent = name;
  document.getElementById('hero-name').textContent = name;
  startMatrixRain(document.getElementById('rain'), { intensity: 0.18 });
  initRevealAnimations();
}
