module.exports = function(app, connection) {
  app.route('/cantidades').get(function(req, res) {
    connection.query('CALL obtenerCantidades', function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      res.json(rows[0]);
    });
  });
};
