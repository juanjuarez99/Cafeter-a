<template>
  <div>
    <h1>Cantidades</h1>
    <table>
      <thead>
        <th>Tipo</th>
        <th>Cantidad</th>
      </thead>
      <tbody>
        <tr v-for="dato in datos">
          <td>{{dato.tipo}}</td>
          <td>{{dato.cantidad}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "Cantidades",
  data: () => ({
    datos: [],
    app: Store.app,
  }),
  mounted() {
    this.datos = [];
  },
  async created() {
    this.app.connection = new WebSocket(config.websocket);
    this.app.connection.onmessage = (event) => {
      this.actualizar();
    };

    this.actualizar();
  },
  methods: {
    async actualizar() {
      const res = await fetch(`${be}/cantidades`, {
        headers: {
          "x-token": this.app.token,
        },
      });
      const data = await res.json();
      this.datos = data;
    },
  },
};
</script>

<style scoped>
</style>
