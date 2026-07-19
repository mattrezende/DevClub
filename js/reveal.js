/**
 * Cards/steps/agent items with class "reveal" materialize into view on
 * scroll. Elements are staggered by their shared parent, so each grid or
 * list cascades independently from its own first item.
 */
function initRevealAnimations() {
  const groups = new Map();
  document.querySelectorAll('.reveal').forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((items) => {
    items.forEach((el, i) => {
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
