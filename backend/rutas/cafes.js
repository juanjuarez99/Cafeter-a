// Exporta una función que requiere como argumentos una instancia de la
// aplicación (app) y una conexión a la base de datos (connection)
module.exports = function(app, connection) {
  // Define la ruta '/cafes'
  app
    .route('/cafes')
    // Al realizar una petición con metodo GET
    .get(function(req, res) {
      // Manda una consulta a la base de datos para seleccionar todas las
      // entradas
      connection.query('SELECT * from cafes', function(err, rows, fields) {
        if (err) {
          // Si existe un error nos lo manda
          res.json(err);
        }
        // Si no existe error nos manda los resultados
        res.json(rows);
      });
    })
    // Al realizar una petición con metodo POST
    .post(function(req, res) {
      console.log(req.body);
      // Manda una consulta al a base de datos para guardar los datos en esta
      let consulta = `INSERT INTO \`cafes\` (\`cod_cafe\`, \`nombre\`, \`tamaño\`, \`precio\`, \`proveedor\`) VALUES (NULL, '${req.body.nombre}', '${req.body.tamaño}', '${req.body.precio}', '${req.body.proveedor}');`;
      connection.query(consulta, function(err, rows, fields) {
        if (err) {
          // Si ocurrió un error, nos lo manda
          res.json(err);
        }
        // Si no hay error nos manda los resultados
        res.json(rows);
      });
    });

  // Define la ruta '/cafes/:id' donde el ':id' se refiere al codigo de cada
  // instancia de cafes
  app
    .route('/cafes/:id')
    // Al realizar una petición con metodo GET
    .get(function(req, res) {
      // Manda una consulta a la base de datos para seleccionar la entrada que
      // coincida con el ':id' proporcionado (req.params.id)
      connection.query(
        `SELECT * from cafes WHERE cod_cafe = ${req.params.id}`,
        function(err, rows, fields) {
          if (err) {
            // Si hay error lo manda
            res.json(err);
          }
          // Si no hay error manda el resultado
          res.json(rows);
        }
      );
    })
    // Al realizar una petición con metodo PUT
    .put(function(req, res) {
      // Empieza a definir la consulta para editar los campos en la entrada en
      // la base de datos
      let consulta = `UPDATE \`cafes\` SET `;

      // Guarda el objeto original en la variable 'actual'
      let actual = req.body.original;

      // Compara si existe un campo en el objeto actual y si este es distinto al
      // recibido con el metodo PUT, si es distinto añade a la consulta lo
      // necesario para cambiarla
      if (req.body.nombre && req.body.nombre != actual.nombre) {
        consulta += `\`nombre\` = '${req.body.nombre}', `;
      }
      // Realiza lo mismo del anterior con todos los campos necesarios
      if (req.body.tamaño && req.body.tamaño != actual.tamaño) {
        consulta += `\`tamaño\` = '${req.body.tamaño}', `;
      }
      if (req.body.precio && req.body.precio != actual.precio) {
        consulta += `\`precio\` = '${req.body.precio}', `;
      }
      if (req.body.proveedor && req.body.proveedor != actual.proveedor) {
        consulta += `\`proveedor\` = '${req.body.proveedor}', `;
      }
      consulta = consulta.replace(/, $/, ' ');
      // Define dónde se hara el cambio
      consulta += `WHERE \`cafes\`.\`cod_cafe\` = ${req.params.id}`;
      // Ejecuta la consulta
      connection.query(consulta, function(err, rows, fields) {
        if (err) {
          // Si hay un error lo manda
          res.json(err);
        }
        // Si no hay error manda los resultados
        res.json(rows);
      });
    })
    // En el metodo DELETE
    .delete(function(req, res) {
      // Define una consulta para borrar basade en el ':id'
      let consulta = `DELETE FROM \`cafes\` WHERE \`cafes\`.\`cod_cafe\` = ${req.params.id}`;
      // Ejecuta la consulta
      connection.query(consulta, function(err, rows, fields) {
        if (err) {
          // Si hay un error lo manda
          res.json(err);
        }
        // Si no manda el resultado
        res.json(rows);
      });
    });
};
