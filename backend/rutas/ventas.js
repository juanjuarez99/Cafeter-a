module.exports = function(app, connection) {
  app
    .route('/ventas')
    .get(function(req, res) {
      connection.query('SELECT * from ventas', function(err, rows, fields) {
        if (err) {
          res.json(err);
        }
        res.json(rows);
      });
    })
    .post(function(req, res) {
      let consulta = `CALL crearVenta ('${req.body.identificador}', '${req.body.cafe}', '${req.body.cantidad}')`
      //let consulta = `INSERT INTO \`ventas\` (\`cod_ventas\`, \`identificador\`, \`cafe\`, \`cantidad\`) VALUES (NULL, '${req.body.identificador}', '${req.body.cafe}', '${req.body.cantidad}')`;
      connection.query(consulta, function(err, rows, fields) {
        if (err) {
          res.json(err);
        }
        res.json(rows);
      });
    });

  app
    .route('/ventas/:id')
    .get(function(req, res) {
      connection.query(
        `SELECT * from ventas WHERE cod_ventas = ${req.params.id}`,
        function(err, rows, fields) {
          if (err) {
            res.json(err);
          }
          res.json(rows);
        }
      );
    })
    .put(function(req, res) {
      /*let consulta = `UPDATE \`ventas\` SET `;
      let actual = req.body.original;
      if (
        req.body.identificador &&
        req.body.identificador != actual.identificador
      ) {
        consulta += `\`identificador\` = '${req.body.identificador}', `;
      }

      if (req.body.cafe && req.body.cafe != actual.cafe) {
        consulta += `\`cafe\` = '${req.body.cafe}', `;
      }

      if (req.body.cantidad && req.body.cantidad != actual.cantidad) {
        consulta += `\`cantidad\` = '${req.body.cantidad}', `;
      }
      consulta = consulta.replace(/, $/, ' ');
      consulta += `WHERE \`ventas\`.\`cod_ventas\` = ${req.params.id}`; */

      let actual = req.body.original;

      let consulta = 'CALL editarVenta(' +
        (req.body.identificador && req.body.identificador != actual.identificador ? `'${req.body.identificador}', ` : '"", ') +
        (req.body.cafe && req.body.cafe != actual.cafe ? `'${req.body.cafe}', ` : '"", ') +
        (req.body.cantidad && req.body.cantidad != actual.cantidad ? `'${req.body.cantidad}', ` : '"", ') +
        (req.params.id ? req.params.id : '""') + ')';

      connection.query(consulta, function(err, rows, fields) {
        if (err) {
          res.json(err);
        }
        res.json(rows);
      });
    })
    .delete(function(req, res) {
      let consulta = `CALL eliminarVenta ('${req.params.id}')`
      //let consulta = `DELETE FROM \`ventas\` WHERE \`ventas\`.\`cod_ventas\` = ${req.params.id}`;
      connection.query(consulta, function(err, rows, fields) {
        if (err) {
          res.json(err);
        }
        res.json(rows);
      });
    });
};
