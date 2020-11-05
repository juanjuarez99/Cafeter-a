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
      } catch (err) {
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
        res.json(rows.map((usuario) => {
          usuario["contraseña"] = undefined
          return usuario
        }))
      });
    })
    .put(async function (req, res) {
      let contraEncriptada;
      try {
        contraEncriptada = await encriptarContra(req.body.contra)
        
      } catch (err) {
        console.log(err)
       /*  res.json({
          status: "error",
          msg: err
        });
        return */
      }
      let consulta = `UPDATE \`usuarios\` SET `;
      let actual = req.body.original;

      if (req.body.nombres && req.body.nombres != actual.nombres) {
        consulta += `\`nombres\` = '${req.body.nombres}', `;
      }
      if (req.body.apellidos && req.body.apellidos != actual.apellidos) {
        consulta += `\`apellidos\` = '${req.body.apellidos}', `;
      }
      if (req.body.nombre_usuario && req.body.nombre_usuario != actual.nombre_usuario) {
        consulta += `\`nombre_usuario\` = '${req.body.nombre_usuario}', `;
      }
      if (contraEncriptada) {
        consulta += `\`contraseña\` = '${contraEncriptada}', `;
      }
      if (req.body.permisos && req.body.permisos != actual.permisos) {
        consulta += `\`permisos\` = '${req.body.permisos}', `;
      }
      consulta = consulta.replace(/, $/, ' ');
      consulta += `WHERE \`usuarios\`.\`cod_usuarios\` = ${req.params.id}`;

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

