<template>
  <div :key="direccion">
    <h1>{{ direccion }}</h1>
    <router-link
      class="button"
      v-if="app.permisos[direccion].anadir"
      :to="`/${direccion}/anadir`"
    >Añadir</router-link>
    <table>
      <thead>
        <th v-for="encabezado in encabezados" :key="encabezado">{{ encabezado }}</th>
      </thead>
      <tbody>
        <tr v-for="dato in datos" :key="dato[encabezados[0]]">
          <td v-for="encabezado in encabezados" :key="encabezado">{{ dato[encabezado] }}</td>
          <td v-if="app.permisos[direccion].borrar">
            <Borrar :direccion="direccion" :id="dato[Object.keys(dato)[0]]" />
          </td>
          <td v-if="app.permisos[direccion].editar">
            <router-link
              class="button"
              :to="`/${direccion}/${dato[Object.keys(dato)[0]]}/editar`"
            >Editar</router-link>
          </td>
          <td>
            <router-link
              class="button"
              :to="`/${direccion}/${dato[Object.keys(dato)[0]]}`"
            >Ver</router-link>
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
import Borrar from "./Borrar";

export default {
  name: "VerTodos",
  props: ["direccion"],
  components: { Borrar },
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
