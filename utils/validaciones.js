// utils/validaciones.js

function validarTexto(texto) {
  return String(texto || '').trim().length > 0;
}

function validarCelular(celular) {
  const limpio = String(celular || '').replace(/\D/g, '');
  return limpio.length >= 8;
}

function validarEmail(email) {
  if (!email) return true; // Si está vacío es opcional, si se llena se valida
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Exportación compatible para Node.js / QUnit y para Next.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validarTexto, validarCelular, validarEmail };
}

export { validarTexto, validarCelular, validarEmail };