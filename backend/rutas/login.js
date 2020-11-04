const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function (app, connection) {
  app.route('/login')
    .post(function (req, res) {
      let consulta = `SELECT * FROM usuarios WHERE nombre_usuario = '${req.body.usuario}'`
      connection.query(consulta, async function (err, rows, fields) {
        try {
          if (err) {
            throw err
          }
          if (rows.length < 1) {
            throw "No existe el usuario"
          } else {
            const contraUsuario = rows[0]['contraseña']
            const contraActual = req.body['contraseña']
            const coinciden = await bcrypt.compare(contraActual, contraUsuario)
            if (!coinciden) throw "Contraseña incorrecta"
            const token = jwt.sign({ check: true, usuario: rows[0].nombre_usuario }, app.get('clave'), {
              expiresIn: 1440
            })
            res.json({
              status: "ok",
              msg: token
            })
          }
        } catch (err) {
          res.json({
            status: "error",
            msg: err
          })
        }
        
      });
    })

}

