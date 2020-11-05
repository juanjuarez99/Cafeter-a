<template>
  <div>
    <button @click="confirmar = true">Borrar</button>
    <div v-if="confirmar">
      <p>¿Seguro que quieres borrar?</p>
      <button @click="borrar">Si</button>
      <button @click="confirmar = false">No</button>
    </div>
  </div>
</template>
<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "Borrar",
  props: ["direccion", "id"],
  data: () => ({
    confirmar: false,
    app: Store.app,
  }),
  methods: {
    async borrar() {
      const res = await fetch(`${be}/${this.direccion}/${this.id}`, {
        method: "DELETE",
        headers: {
          "x-token": this.app.token,
        },
      });
      const conf = await res.json();
      console.log(conf);
    },
  },
};
</script>

<style scoped>
</style>