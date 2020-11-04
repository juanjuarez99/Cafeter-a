<template>
  <div :key="direccion">
    <table>
      <thead>
        <th v-for="encabezado in encabezados" :key="encabezado">
          {{ encabezado }}
        </th>
      </thead>
      <tbody>
        <tr v-for="dato in datos" :key="dato[encabezados[0]]">
          <td v-for="encabezado in encabezados" :key="encabezado">
            {{ dato[encabezado] }}
          </td>
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
  name: "VerTodos",
  props: ["direccion"],
  data: () => ({
    datos: [],
    encabezados: [],
    connection: null,
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
      const res = await fetch(`${be}/${this.direccion}`, {
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