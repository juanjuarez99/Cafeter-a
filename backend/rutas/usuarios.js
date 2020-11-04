const { encriptarContra } = require('../utils'
)
module.exports = function (app, connection) {
  app.route('/usuarios')
    .get(function (req, res) {
      connection.query('SELECT * from usuarios', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows.map((usuario) => {
          usuario["contraseña"] = undefined
          return usuario
        }))
      });
    })
    .post(async function (req, res) {
      let contraEncriptada;
      try {
        contraEncriptada = await encriptarContra(req.body.contra)
      } catch(err) {
        console.log(err)
        res.json({
          status: "error",
          msg: err
        });
        return
      }
      let consulta = `INSERT INTO \`usuarios\` (\`cod_usuarios\`, \`nombres\`, \`apellidos\`, \`nombre_usuario\`, \`contraseña\`, \`permisos\`) VALUES (NULL, '${req.body.nombres}', '${req.body.apellidos}', '${req.body.nombre_usuario}', '${contraEncriptada}', '${req.body.permisos}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/usuarios/:id')
    .get(function (req, res) {
      connection.query(`SELECT * from usuarios WHERE cod_usuarios = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .put(function (req, res) {
      let consulta = `UPDATE \`usuarios\` SET \`nombres\` = '${req.body.nombres}', \`apellidos\` = '${req.body.apellidos}', \`nombre_usuario\` = '${req.body.nombre_usuario}', \`contraseña\` = '${req.body.contraseña}', \`permisos\` = '${req.body.permisos}' WHERE \`usuarios\`.\`cod_usuarios\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `DELETE FROM \`usuarios\` WHERE \`usuarios\`.\`cod_usuarios\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

