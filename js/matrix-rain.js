const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

/**
 * Starts the falling-code animation on `canvas`.
 * @param {HTMLCanvasElement} canvas
 * @param {{ intensity?: number }} [options] intensity is 0..1, how strong the rain reads visually.
 * @returns {() => void} stop function
 */
function startMatrixRain(canvas, { intensity = 1 } = {}) {
  const ctx = canvas.getContext('2d');
  const fontSize = 16;
  let columns = 0;
  let drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () =>
      Math.floor((Math.random() * canvas.height) / fontSize) * -1,
    );
  }
  resize();
  window.addEventListener('resize', resize);

  let frame = 0;
  let raf = 0;

  function draw() {
    raf = requestAnimationFrame(draw);
    frame++;
    // throttle to ~20fps for that authentic laggy terminal feel + perf
    if (frame % 2 !== 0) return;

    ctx.fillStyle = `rgba(0, 0, 0, ${0.06 + (1 - intensity) * 0.08})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const isHead = Math.random() > 0.93;
      ctx.fillStyle = isHead
        ? `rgba(182, 255, 182, ${intensity})`
        : `rgba(0, 255, 65, ${0.55 * intensity})`;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  raf = requestAnimationFrame(draw);

  return function stop() {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
}
