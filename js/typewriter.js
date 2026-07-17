function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Types `text` into `el` one character at a time.
 * Resolves once the last character has landed.
 * @param {HTMLElement} el
 * @param {string} text
 * @param {{ speed?: number, startDelay?: number }} [options]
 */
async function typeInto(el, text, { speed = 45, startDelay = 0 } = {}) {
  if (startDelay) await wait(startDelay);
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await wait(speed);
  }
}
