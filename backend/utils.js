const bcrypt = require('bcrypt');

// Exporta un objeto que contiene una función que se dedica a encriptar una
// contraseña
module.exports = {
  async encriptarContra(contra) {
    try {
      if (contra === '') {
        throw 'La contraseña esta vacia';
      }
      const hashed = await bcrypt.hash(contra, 10);
      return hashed;
    } catch (err) {
      throw err;
    }
  },
};

