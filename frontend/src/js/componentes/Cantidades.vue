<template>
    <div></div>
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
      this.datos = data[0];
            console.log(this.datos)

//se oculta contraseña
      if (this.datos[0]['contraseña']) {
        this.datos[0]['contraseña'] = undefined
      }
      if (data.length > 0) {
        this.encabezados = Object.keys(data[0][0]).filter(e => e != 'contraseña');
      } else {
        this.encabezados = [];
      }
    },
  },
};
</script>

<style scoped>
</style>