const QUnit = require('qunit');
const { validarTexto, validarCelular, validarEmail } = require('../utils/validaciones');

QUnit.module('Pruebas Unitarias - Registro de Tutor', function() {

  QUnit.test('Debe validar que el nombre no esté vacío', function(assert) {
    assert.strictEqual(validarTexto('Carlos'), true);
    assert.strictEqual(validarTexto('   '), false);
  });

  QUnit.test('Debe validar que el celular tenga al menos 8 dígitos', function(assert) {
    assert.strictEqual(validarCelular('946324771'), true);
    assert.strictEqual(validarCelular('12345'), false);
  });

  QUnit.test('Debe validar el correo electrónico', function(assert) {
    assert.strictEqual(validarEmail('tutor@gmail.com'), true);
    assert.strictEqual(validarEmail('correo-invalido'), false);
  });

});