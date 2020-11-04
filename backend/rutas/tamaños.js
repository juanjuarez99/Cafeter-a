module.exports = function (app, connection) {
  app.route('/tamanos')
    .get(function (req, res) {
      connection.query('SELECT * from tamaños_cafe', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .post(function (req, res) {
      let consulta = `INSERT INTO \`tamaños_cafe\` (\`cod_tamaño\`, \`nombre\`, \`relacion_precio\`) VALUES (NULL, '${req.body.nombre}', '${req.body.relacion_precio}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/tamanos/:id')
    .get(function (req, res) {
      connection.query(`SELECT * from tamaños_cafe WHERE cod_tamaño = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .put(function (req, res) {
      let consulta = `UPDATE \`tamaños_cafe\` SET \`nombre\` = '${req.body.nombre}', \`relacion_precio\` = '${req.body.relacion_precio}' WHERE \`tamaños_cafe\`.\`cod_tamaño\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `DELETE FROM \`tamaños_cafe\` WHERE \`tamaños_cafe\`.\`cod_tamaño\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

