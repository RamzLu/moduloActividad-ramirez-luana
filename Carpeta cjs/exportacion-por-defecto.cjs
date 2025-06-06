let funciones = {};

funciones.multiplicar = (num1, num2) => {
  return num1 * num2;
};

funciones.potencia = (base, exponente) => {
  return base ** exponente;
};

module.exports = funciones;