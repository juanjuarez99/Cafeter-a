const express = require('express')
const config = require('./config')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const cors = require('cors')
const ws = require('ws')

const wsServer = new ws.Server({
  port: 3001
})

wsServer.on('connection', function connection(wss) {
  wss.on('message', function incoming(message) {
    console.log(message)
    wsServer.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send('test')
      }
    })
  })
})

app.set('clave', config.clave)

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'juan',
  password: '123',
  database: 'cafeteria'
});

app.use(cors())
app.options('*', cors())
app.use(require('body-parser')())

app.all('*', (req, res, next) => {
  if (req.path == '/login') return next();
  const token = req.headers['x-token']
  jwt.verify(token, app.get('clave'), (err, decoded) => {
    if (err) {
      res.json({
        status: "error",
        msg: "Acceso denegado"
      })
    } else {
      next()
    }
  })
})

const Cafes = require('./rutas/cafes')
const Usuarios = require('./rutas/usuarios')
const Proveedores = require('./rutas/proveedores')
const Tamaños = require('./rutas/tamaños')
const Caja = require('./rutas/caja')
const Ventas = require('./rutas/ventas')
const Login = require('./rutas/login')

Cafes(app, connection)
Usuarios(app, connection)
Proveedores(app, connection)
Tamaños(app, connection)
Caja(app, connection)
Ventas(app, connection)
Login(app, connection)

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
