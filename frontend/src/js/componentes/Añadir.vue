<template>
  <div :key="direccion">
    <button @click="test">Holi</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "Añadir",
  props: ["direccion"],
  data: () => ({
    app: Store.app,
  }),
  async created() {
    this.app.connection = new WebSocket("ws://192.168.0.16:3001");
  },
  methods: {
    async test() {
        console.log('hi')
        // this.app.connection.onopen = (event) => {
            this.app.connection.send('hihi')
        // }
    },
  },
};
</script>

<style scoped>
</style>