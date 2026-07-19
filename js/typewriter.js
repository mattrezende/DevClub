function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Types `text` into `el` one character at a time, with a key-click sound per
 * character. Resolves once the last character has landed.
 * @param {HTMLElement} el
 * @param {string} text
 * @param {{ speed?: number, startDelay?: number, sound?: boolean }} [options]
 */
async function typeInto(el, text, { speed = 45, startDelay = 0, sound = true } = {}) {
  if (startDelay) await wait(startDelay);
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    if (sound && text[i - 1] !== ' ' && typeof playKeySound === 'function') {
      playKeySound();
    }
    await wait(speed);
  }
}
