const name = localStorage.getItem('devclub_visitor');

if (!name) {
  window.location.href = 'index.html';
} else {
  const canvas = document.getElementById('rain');
  startMatrixRain(canvas, { intensity: 0.35 });

  const terminalPanel = document.querySelector('.terminal-panel');
  const fadeOverlay = document.getElementById('fade-overlay');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  const line4 = document.getElementById('line4');
  const line5 = document.getElementById('line5');
  const line6 = document.getElementById('line6');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  playSequence();

  async function playSequence() {
    await typeInto(line1, 'Você acha que estamos em 2026...', { speed: 45, startDelay: 500 });
    await wait(700);

    line2.classList.remove('hidden');
    await typeInto(line2, 'quando, de fato, estamos perto de 2199.', { speed: 45, startDelay: 200 });
    await wait(900);

    line3.classList.remove('hidden');
    await typeInto(line3, 'Não posso dizer exatamente o ano, porque...', { speed: 45, startDelay: 200 });
    await wait(700);

    line4.classList.remove('hidden');
    await typeInto(line4, 'sinceramente, eu não sei.', { speed: 45, startDelay: 200 });
    await wait(900);

    line5.classList.remove('hidden');
    await typeInto(line5, `Nada que eu diga será uma explicação para você, ${name}.`, {
      speed: 45,
      startDelay: 200,
    });
    await wait(900);

    line6.classList.remove('hidden');
    await typeInto(line6, 'Veja por si mesmo.', { speed: 50, startDelay: 200 });
    await wait(1000);

    await enterMemberArea();
  }

  async function enterMemberArea() {
    terminalPanel.classList.add('fade-out');
    await wait(500);

    if (!reduceMotion) {
      fadeOverlay.classList.add('active');
      await wait(1000);
    }

    window.location.href = 'memberarea.html';
  }
}
