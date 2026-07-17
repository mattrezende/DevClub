const canvas = document.getElementById('rain');
let stopRain = startMatrixRain(canvas, { intensity: 1 });

const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const connectBtn = document.getElementById('connect-btn');
const sequence = document.getElementById('sequence');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const rabbit = document.getElementById('rabbit');

nameInput.addEventListener('input', () => {
  connectBtn.disabled = nameInput.value.trim().length === 0;
});

nameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;

  nameForm.classList.add('hidden');
  sequence.classList.remove('hidden');
  stopRain();
  stopRain = startMatrixRain(canvas, { intensity: 0.35 });

  await typeInto(line1, `Olá, ${name}...`, { speed: 55, startDelay: 300 });
  await wait(900);

  line2.classList.remove('hidden');
  await typeInto(line2, 'A DevClub encontrou você.', { speed: 45, startDelay: 200 });
  await wait(900);

  line3.classList.remove('hidden');
  await typeInto(line3, 'Siga o coelho branco.', { speed: 45, startDelay: 200 });
  await wait(500);

  rabbit.classList.remove('hidden');
  rabbit.classList.add('fade-in');
  rabbit.focus();

  rabbit.addEventListener('click', () => {
    localStorage.setItem('devclub_visitor', name);
    window.location.href = 'home.html';
  });
});
