const bcrypt = require('bcrypt');

module.exports = {
    async encriptarContra(contra) {
        try {

            if (contra === '') {
                throw "La contraseña esta vacia"
            }
            const hashed = await bcrypt.hash(contra, 10);
            return hashed;
        } catch (err) {
            throw err
        }
    }
}