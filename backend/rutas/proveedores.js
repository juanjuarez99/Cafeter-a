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
      let consulta = `INSERT INTO \`proveedor\` (\`cod_proveedor\`, \`nombre\`) VALUES (NULL, '${req.body.nombre}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/proveedores/:id')
    .get(function (req, res) {
      connection.query(`SELECT * from proveedor WHERE cod_proveedor = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .put(function (req, res) {
      let consulta = `UPDATE \`proveedor\` SET \`nombre\` = '${req.body.nombre}' WHERE \`proveedor\`.\`cod_proveedor\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `DELETE FROM \`proveedor\` WHERE \`proveedor\`.\`cod_proveedor\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

