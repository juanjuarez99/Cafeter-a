<template>
  <div>
    <h1>Añadir Tamaños</h1>
    <label>Nombre:</label>
    <input type="text" v-model="nombre" />
    <label>Relacion Precio:</label>
    <input type="number" step="0.1" v-model="relacion_precio" />
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
    relacion_precio: "",
    app: Store.app,
  }),

  methods: {
    async agregar() {
        try {
      const res = await fetch(`${be}/tamanos`, {
        method: "POST",
        headers: {
          "x-token": this.app.token,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nombre: this.nombre,
          relacion_precio: this.relacion_precio,
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