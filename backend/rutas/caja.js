module.exports = function (app, connection) {
  app.route('/caja')
    .get(function (req, res) {
      connection.query('CALL obtenerCajas', function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows [0])
      });
    })
    .post(function (req, res) {
      let consulta = `CALL crearCaja ('${req.body.usuario}', '${req.body.fecha}')`
      //let consulta = `INSERT INTO \`caja\` (\`cod_caja\`, \`usuario\`, \`fecha\`) VALUES (NULL, '${req.body.usuario}', '${req.body.fecha}')`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })

  app.route('/caja/:id')
    .get(function (req, res) {
      connection.query(`CALL obtenerCaja (${req.params.id})`, function (err, rows, fields) {
      //connection.query(`SELECT * from caja WHERE cod_caja = ${req.params.id}`, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .put(function (req, res) {
      /*let consulta = `UPDATE \`caja\` SET `
      let actual = req.body.original 

      if (req.body.usuario && req.body.usuario != actual.usuario) {
        consulta += `\`usuario\` = '${req.body.usuario}', `
      }
      if (req.body.fecha && req.body.fecha != actual.fecha) {
        consulta += `\`fecha\` = '${req.body.fecha}', `
      }
      consulta = consulta.replace(/, $/," ")
      consulta += `WHERE \`caja\`.\`cod_caja\` = ${req.params.id}` */

      let actual = req.body.original

      let consulta = 'CALL editarCaja(' +
        (req.body.usuario && req.body.usuario != actual.usuario ? `'${req.body.usuario}', ` : '"", ') +
        (req.body.fecha && req.body.fecha != actual.fecha ? `'${req.body.fecha}', ` : '"", ') +
        (req.params.id ? req.params.id : '""') + ')';

      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
    .delete(function (req, res) {
      let consulta = `CALL eliminarCaja ('${req.params.id}')`
      //let consulta = `DELETE FROM \`caja\` WHERE \`caja\`.\`cod_caja\` = ${req.params.id}`
      connection.query(consulta, function (err, rows, fields) {
        if (err) {
          res.json(err)
        }
        res.json(rows)
      });
    })
}

