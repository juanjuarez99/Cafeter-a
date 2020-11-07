// Requerimos las librerias necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const ws = require('ws');

// Importamos el archivo de configuración
const config = require('./config');

// Inicializamos una instancia de express en la constante 'app'
const app = express();

// Definimos el puerto que ocupará el server
const port = 3000;

// Inicializamos un server de WebSocket
const wsServer = new ws.Server({
  port: 3001,
});

// Registramos el evento 'connection' en el server de WebSocket que ejecutará
// una función al recibirlo.
wsServer.on('connection', function connection(wss) {
  // Al recibir el evento 'connection' registramos un evento 'message' y la
  // función que se ejecutará al recibirlo
  wss.on('message', function incoming(message) {
    console.log(message);

    // Al recibir un 'message' buscamos todos los clientes que esten conectados
    wsServer.clients.forEach(function each(client) {
      // Si el cliente registra un estado de OPEN
      if (client.readyState === ws.OPEN) {
        // Se le envia un mensaje
        client.send('test');
      }
    });
  });
});

// Guardamos la clave para encriptar el token
app.set('clave', config.clave);

// Requerimos mysql
var mysql = require('mysql');

// Creamos la conexión a la base de datos con la configuración del archivo
// config
var connection = mysql.createConnection({
  host: config.IPDB,
  user: config.DBUSER,
  password: config.DBPASS,
  database: config.DBNAME,
  multipleStatements: true,
});

// Definimos que la aplicación puede usar CORS (Cross Origin Resource Sharing),
// basicamente se refiere a que otro servidor puede conectarse a el para
// utilizar los datos que este contiene.
app.use(cors());
app.options('*', cors());

// Usamos la librería 'body-parser' para poder leer los mensajes mandados al
// servidor en formato JSON
app.use(require('body-parser')());

// Esto se dedica a exigir el token de inicio de sesión para todas las cosas que
// quiera realizar un usuario, menos el iniciar sesión.
app.all('*', (req, res, next) => {
  if (req.path == '/login') return next();
  const token = req.headers['x-token'];
  jwt.verify(token, app.get('clave'), (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        msg: 'Acceso denegado',
      });
    } else {
      next();
    }
  });
});

// Requerimos las rutas
const Cafes = require('./rutas/cafes');
const Usuarios = require('./rutas/usuarios');
const Proveedores = require('./rutas/proveedores');
const Tamaños = require('./rutas/tamaños');
const Caja = require('./rutas/caja');
const Ventas = require('./rutas/ventas');
const Login = require('./rutas/login');

// Y las registramos en la aplicación
Cafes(app, connection);
Usuarios(app, connection);
Proveedores(app, connection);
Tamaños(app, connection);
Caja(app, connection);
Ventas(app, connection);
Login(app, connection);

// Por ultimo ponemos al servidor a trabajar
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
