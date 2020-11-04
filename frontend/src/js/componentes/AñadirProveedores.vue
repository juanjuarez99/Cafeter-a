<template>
  <div>
    <h1>Añadir Proveedores</h1>
    <label>Nombre:</label>
    <input type="text" v-model="nombre" />
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
    nombre: "",
    app: Store.app,
  }),

  methods: {
    async agregar() {
        try {
      const res = await fetch(`${be}/proveedores`, {
        method: "POST",
        headers: {
          "x-token": this.app.token,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nombre: this.nombre,
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