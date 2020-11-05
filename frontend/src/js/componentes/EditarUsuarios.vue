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
  }),
async created() {
    const rescaf = await fetch(`${be}/usuarios/${this.$route.params.id}`, {
      headers: {
        "x-token": this.app.token,
      },
    })
    const caf = await rescaf.json()
    console.log(caf)
    this.nombres = caf[0].nombres
    this.apellidos = caf[0].apellidos
    this.usuario = caf[0].nombre_usuario
    this.permisos = caf[0].permisos
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
          permisos: this.permisos,
        }),
      });
      const datos = await res.json();
      console.log(datos); 
      } catch(err) {
          console.log(err)
      }
    },
  },
};
</script>