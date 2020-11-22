const { encriptarContra } = require('../utils'
)
module.exports = function (app, connection) {
  app.route('/usuarios')
    .get(function (req, res) {
      connection.query('CALL obtenerUsuarios', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        console.log(rows)
        res.json(rows[0].map((usuario) => {
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
      let consulta = `CALL crearUsuario ('${req.body.nombres}', '${req.body.apellidos}', '${req.body.nombre_usuario}', '${contraEncriptada}', '${req.body.permisos}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/usuarios/:id')
    .get(function (req, res) {

      connection.query(`CALL obtenerUsuario (${req.params.id}) `, function (err, rows, fields) {
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
      let actual = req.body.original;
      /* let consulta = `UPDATE \`usuarios\` SET `;
      

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
      consulta += `WHERE \`usuarios\`.\`cod_usuarios\` = ${req.params.id}`; */
      
      let consulta = 'CALL editarUsuario(' +
        (req.body.nombres && req.body.nombres != actual.nombres ? `'${req.body.nombres}', ` : '"", ') +
        (req.body.apellidos && req.body.apellidos != actual.apellidos ? `'${req.body.apellidos}', ` : '"", ') +
        (req.body.nombre_usuario && req.body.nombre_usuario != actual.nombre_usuario ? `'${req.body.nombre_usuario}', ` : '"", ') +
        (contraEncriptada ? `'${contraEncriptada}', ` : '"", ') +
        (req.body.permisos && req.body.permisos != actual.permisos ? `'${req.body.permisos}', ` : '"", ') +
        (req.params.id ? req.params.id : '""') + ')';

      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `CALL eliminarUsuario ('${req.params.id}')`
      //let consulta = `DELETE FROM \`usuarios\` WHERE \`usuarios\`.\`cod_usuarios\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

