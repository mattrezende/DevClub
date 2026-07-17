(function () {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let raf = null;
  let x = 0;
  let y = 0;

  function apply() {
    raf = null;
    glow.style.setProperty('--x', `${x}px`);
    glow.style.setProperty('--y', `${y}px`);
  }

  window.addEventListener('pointermove', (e) => {
    x = e.clientX;
    y = e.clientY;
    glow.classList.add('active');
    if (!raf) raf = requestAnimationFrame(apply);
  });

  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
})();
