module.exports = function (app, connection) {
  app.route('/cafes')
    .get(function (req, res) {
      connection.query('SELECT * from cafes', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .post(function (req, res) {
      console.log(req.body)
      let consulta = `INSERT INTO \`cafes\` (\`cod_cafe\`, \`nombre\`, \`tamaño\`, \`precio\`, \`proveedor\`) VALUES (NULL, '${req.body.nombre}', '${req.body.tamaño}', '${req.body.precio}', '${req.body.proveedor}');`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/cafes/:id')
    .get(function (req, res) {
      connection.query(`SELECT * from cafes WHERE cod_cafe = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .put(function (req, res) {
      let consulta = `UPDATE \`cafes\` SET `
      let actual = req.body.original

      if (req.body.nombre && req.body.nombre != actual.nombre) {
        consulta += `\`nombre\` = '${req.body.nombre}', `
      }
      if (req.body.tamaño && req.body.tamaño != actual.tamaño) {
        consulta += `\`tamaño\` = '${req.body.tamaño}', `
      }
      if (req.body.precio && req.body.precio != actual.precio) {
        consulta += `\`precio\` = '${req.body.precio}', `
      }
      if (req.body.proveedor && req.body.proveedor != actual.proveedor) {
        consulta += `\`proveedor\` = '${req.body.proveedor}', `
      }
      consulta = consulta.replace(/, $/," ")
      consulta += `WHERE \`cafes\`.\`cod_cafe\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });

    })
    .delete(function (req, res) {
      let consulta = `DELETE FROM \`cafes\` WHERE \`cafes\`.\`cod_cafe\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

