<template>
  <div>
    <h1>editar Tamaños</h1>
    <label>Nombre:</label>
    <input type="text" v-model="nombre" />
    <label>Relacion Precio:</label>
    <input type="number" step="0.1" v-model="relacion_precio" />
    <button @click="guardar">Guardar</button>
  </div>
</template>>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "EditarTamaños",
  
  data: () => ({
    nombre: "",
    relacion_precio: "",
    app: Store.app,
  }),

  async created() {
    this.app.connection = new WebSocket("ws://192.168.0.16:3001");
    const rescaf = await fetch(`${be}/tamanos/${this.$route.params.id}`, {
      headers: {
        "x-token": this.app.token,
      },
    })
    const caf = await rescaf.json()
    console.log(caf)
    this.nombre = caf[0].nombre
    this.relacion_precio =caf[0].relacion_precio 
    
  },

  methods: {
    async guardar() {
        try {
      const res = await fetch(`${be}/tamanos/${this.$route.params.id}`, {
        method: "PUT",
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
      this.app.connection.send('hihi')
      } catch(err) {
          console.log(err)
      }
    },
  },
};
</script>