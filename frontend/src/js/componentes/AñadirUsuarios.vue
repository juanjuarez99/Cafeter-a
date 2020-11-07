<template>
  <div>
    <h1>Añadir Usuarios</h1>
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
      <input type="checkbox" v-model="perms.cafes.ver" />
    </label>
    <label>
      Añadir:
      <input type="checkbox" v-model="perms.cafes.anadir" />
    </label>
    <label>
      Editar:
      <input type="checkbox" v-model="perms.cafes.editar" />
    </label>
    <label>
      Borrar:
      <input type="checkbox" v-model="perms.cafes.borrar" />
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
    <button @click="agregar">Agregar</button>
  </div>
</template>>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";
import { encode, decode } from "../encode";

export default {
  name: "AñadirUsuario",
  data: () => ({
    nombres: "",
    apellidos: "",
    usuario: "",
    contra: "",
    permisos: "",
    app: Store.app,

    perms: {
      cafes: {
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
    },
  }),

  computed: {
    permisosEnc() {
      const p = this.perms;
      return encode(p);
    },
  },

  methods: {
    async agregar() {
      this.app.connection = new WebSocket(config.websocket);
      try {
        const res = await fetch(`${be}/usuarios`, {
          method: "POST",
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
          }),
        });
        const datos = await res.json();
        console.log(datos);
        this.app.connection.send("hihi");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
