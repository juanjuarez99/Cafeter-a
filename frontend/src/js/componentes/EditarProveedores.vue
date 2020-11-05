<template>
  <div>
    <h1>Editar Proveedores</h1>
    <label>Nombre:</label>
    <input type="text" v-model="nombre" />
    <button @click="guardar">Guardar</button>
  </div>
</template>>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "EditarProveedores",
  data: () => ({
    nombre: "",
    app: Store.app,
  }),

  async created() {
    this.app.connection = new WebSocket("ws://192.168.0.16:3001");
    const rescaf = await fetch(`${be}/proveedores/${this.$route.params.id}`, {
      headers: {
        "x-token": this.app.token,
      },
    })
    const caf = await rescaf.json()
    console.log(caf)
    this.nombre = caf[0].nombre
    
  },


  methods: {
    async guardar() {
        try {
      const res = await fetch(`${be}/proveedores/${this.$route.params.id}`, {
        method: "PUT",
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
      this.app.connection.send('hihi')
      } catch(err) {
          console.log(err)
      }
    },
  },
};
</script>