module.exports = function (app, connection) {
  app.route('/proveedores')
    .get(function (req, res) {
      connection.query('SELECT * from proveedor', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .post(function (req, res) {
      let consulta = `CALL crearProveedor ('${req.body.nombre}')`
      //let consulta = `INSERT INTO \`proveedor\` (\`cod_proveedor\`, \`nombre\`) VALUES (NULL, '${req.body.nombre}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/proveedores/:id')
    .get(function (req, res) {
      connection.query(`CALL obtenerProveedor (${req.params.id})`, function (err, rows, fields) {
      //connection.query(SELECT * from proveedor WHERE cod_proveedor = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        console.log(rows)
        res.json(rows)
      });
    })
    .put(function (req, res) {
      /*let consulta = `UPDATE \`proveedor\` SET `
      let actual = req.body.original

      if (req.body.nombre && req.body.nombre != actual.nombre) {
        consulta += `\`nombre\` = '${req.body.nombre}', `
      }
      consulta = consulta.replace(/, $/," ")
      consulta += `WHERE \`proveedor\`.\`cod_proveedor\` = ${req.params.id}` */

      let actual = req.body.original

      let consulta = 'CALL editarProveedor(' +
        (req.body.nombre && req.body.nombre != actual.nombre ? `'${req.body.nombre}', ` : '"", ') +
        (req.params.id ? req.params.id : '""') + ')';
      
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `CALL eliminarProveedor ('${req.params.id}')`
      //let consulta = `DELETE FROM \`proveedor\` WHERE \`proveedor\`.\`cod_proveedor\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

