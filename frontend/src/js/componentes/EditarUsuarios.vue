<template>
  <div>
    <h1>Editar Usuarios</h1>
    <label>Nombres de Usuario:</label>
    <input type="text" v-model="nombres" />
    <label>Apellidos de Usuario:</label>
    <input type="text" v-model="apellidos" />
    <label>Nombre de Usuario:</label>
    <input type="text" v-model="usuario" />
    <label>Contraseña:</label>
    <input type="password" v-model="contra" />
    <label>Permisos:</label>
    <!--pendiente -->
    
    <h3>Cafe:</h3>
    <label>
      Ver:
      <input type="checkbox" v-model="perms.cafe.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.cafe.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.cafe.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.cafe.borrar" />
    </label>

    <h3>Tamaños:</h3>
    <label>
      Ver:
      <input type="checkbox" v-model="perms.tamanos.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.tamanos.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.tamanos.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.tamanos.borrar" />
    </label>

    <h3>Caja:</h3>
    <label>
      Ver:
      <input type="checkbox" v-model="perms.caja.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.caja.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.caja.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.caja.borrar" />
    </label>

    <h3>Ventas:</h3>
    <label>
      Ver:
      <input type="checkbox" v-model="perms.ventas.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.ventas.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.ventas.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.ventas.borrar" />
    </label>

    <h3>Proveedores:</h3>
    <label>
      Ver:
      <input type="checkbox" v-model="perms.proveedores.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.proveedores.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.proveedores.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.proveedores.borrar" />
    </label>

    <h3>Usuarios:</h3>
    <label>
      Ver:
      <input type="checkbox" v-model="perms.usuarios.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.usuarios.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.usuarios.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.usuarios.borrar" />
    </label>
    <br />
    <button @click="guardar">Guardar</button>
  </div>
</template>>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "EditarUsuario",
  data: () => ({
    nombres: "",
    apellidos: "",
    usuario: "",
    contra: "",
    permisos: "",
    app: Store.app,

    original: {},
    perms: {
      cafe: {
        ver: false,
        anadir: false,
        editar: false,
        borrar: false,
      },
      tamanos: {
        ver: false,
        anadir: false,
        editar: false,
        borrar: false,
      },
      caja: {
        ver: false,
        anadir: false,
        editar: false,
        borrar: false,
      },
      ventas: {
        ver: false,
        anadir: false,
        editar: false,
        borrar: false,
      },
      proveedores: {
        ver: false,
        anadir: false,
        editar: false,
        borrar: false,
      },
      usuarios: {
        ver: false,
        anadir: false,
        editar: false,
        borrar: false,
      },
    }, // ACUERDATE DE HACER LOS MESMOS CAMBIOS QUE EN AÑADIR USUARIOS PARA LOS PERMISOS Y HACER EL
    // ALGORITMO AL REVES PARA DECIFRAR LOS PERMISOS
  }),
async created() {
  this.app.connection = new WebSocket("ws://192.168.0.16:3001");
    const rescaf = await fetch(`${be}/usuarios/${this.$route.params.id}`, {
      headers: {
        "x-token": this.app.token,
      },
    })
    const caf = await rescaf.json()
    this.nombres = caf[0].nombres
    this.apellidos = caf[0].apellidos
    this.usuario = caf[0].nombre_usuario
    this.original = caf[0]

    const p = caf[0].permisos
    const etiquetas = Object.keys(this.perms)
    p.split('').forEach((permiso, i) => {
      const bin = parseInt(permiso, 16).toString(2).padStart(4, '0')
      const eti = Object.keys(this.perms[etiquetas[i]])
      bin.split('').forEach((valor, j) => {
        this.perms[etiquetas[i]][eti[j]] = Number(valor) ? true : false
      })
    })
  },
  computed: {
    permisosEnc() {
      const p = this.perms
      let todosPermisos = ""
      Object.keys(p).forEach(seccion => {
        let cadenaPermisos = ""
        Object.keys(p[seccion]).forEach(permiso => {
          const valorPermiso = p[seccion][permiso]
          cadenaPermisos = `${valorPermiso ? 1 : 0}${cadenaPermisos}`
          
        })
        todosPermisos += parseInt(Number(cadenaPermisos), 2).toString(16).toUpperCase()
      })
      return todosPermisos
    }
  },

  methods: {
    async guardar() {
        try {
      const res = await fetch(`${be}/usuarios/${this.$route.params.id}`, {
        method: "PUT",
        headers: {
          "x-token": this.app.token,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nombres: this.nombres,
          apellidos: this.apellidos,
          nombre_usuario: this.usuario,
          contra: this.contra,
          permisos: this.permisosEnc,
          original: this.original
        }),
      });
      const datos = await res.json();
      console.log(datos); 
      this.app.connection.send('hihi')
      } catch(err) {
          console.log(err)
      }
    },
  },
};
</script>