const name = localStorage.getItem('devclub_visitor');

if (!name) {
  window.location.href = 'index.html';
} else {
  document.getElementById('visitor-name').textContent = name;
  document.getElementById('hero-welcome').textContent = `bem-vindo(a), ${name}`;
  startMatrixRain(document.getElementById('rain'), { intensity: 0.18 });
  initRevealAnimations();
}

function initRevealAnimations() {
  // stagger cards/steps within each grid independently, so "Cursos" and
  // "Como funciona" each cascade from their own first item
  document.querySelectorAll('.grid').forEach((grid) => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.animationDelay = `${Math.min(i * 90, 360)}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
