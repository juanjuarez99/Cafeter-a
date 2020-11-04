module.exports = function (app, connection) {
  app.route('/ventas')
    .get(function (req, res) {
      connection.query('SELECT * from ventas', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .post(function (req, res) {
      let consulta = `INSERT INTO \`ventas\` (\`cod_ventas\`, \`identificador\`, \`cafe\`, \`cantidad\`) VALUES (NULL, '${req.body.identificador}', '${req.body.cafe}', '${req.body.cantidad}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/ventas/:id')
    .get(function (req, res) {
      connection.query(`SELECT * from ventas WHERE cod_ventas = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .put(function (req, res) {
      let consulta = `UPDATE \`ventas\` SET \`identificador\` = '${req.body.identificador}', \`cafe\` = '${req.body.cafe}', \`cantidad\` = '${req.body.cantidad}' WHERE \`ventas\`.\`cod_ventas\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `DELETE FROM \`ventas\` WHERE \`ventas\`.\`cod_ventas\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

