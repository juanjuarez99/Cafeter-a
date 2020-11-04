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
    <button @click="agregar">Agregar</button>
  </div>
</template>>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "AñadirUsuario",
  data: () => ({
    nombres: "",
    apellidos: "",
    usuario: "",
    contra: "",
    permisos: "",
    app: Store.app,
  }),

  methods: {
    async agregar() {
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