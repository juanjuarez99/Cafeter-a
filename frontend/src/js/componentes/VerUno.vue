<template>
  <div :key="direccion">
      <template v-for="encabezado in encabezados">
          <h1>{{encabezado}}</h1>
          <p>{{datos[0][encabezado]}}</p>
      </template>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "VerUno",
  props: ["direccion"],
  data: () => ({
    datos: [],
    encabezados: [],
    app: Store.app,
  }),
  mounted() {
    this.datos = [];
    this.encabezados = [];
  },
  watch: {
    direccion() {
      this.actualizar();
    },
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
      const res = await fetch(`${be}/${this.direccion}/${this.$route.params.id}`, {
        headers: {
          "x-token": this.app.token,
        },
      });
      const data = await res.json();
      this.datos = data;
      if (data.length > 0) {
        this.encabezados = Object.keys(data[0]);
      } else {
        this.encabezados = [];
      }
    },
  },
};
</script>

<style scoped>
</style>