<template>
  <div>
    <h1>Añadir venta</h1>
    <label>Caja:</label>
    <select v-model="caja">
      <option value></option>
      <option
        v-for="caja in cajasDisponibles"
        :value="caja.cod_caja"
        :key="caja.cod_caja"
      >{{ caja.cod_caja }}</option>
    </select>
    <label>Café:</label>
    <select v-model="cafe">
      <option value></option>
      <option
        v-for="cafe in cafesDisponibles"
        :value="cafe.cod_cafe"
        :key="cafe.cod_cafe"
      >{{ cafe.nombre }}</option>
    </select>
    <label>Cantidad:</label>
    <input type="number" v-model="cantidad" />
    <button @click="agregar">Agregar</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "AñadirVenta",
  data: () => ({
    cafe: "",
    cantidad: "",
    caja: "",
    cafesDisponibles: [],
    cajasDisponibles: [],
    app: Store.app,
  }),
  async created() {
    this.app.connection = new WebSocket(config.websocket);
    const res = await fetch(`${be}/cafes`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const cafes = await res.json();
    this.cafesDisponibles = cafes;

    const resCajas = await fetch(`${be}/caja`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const cajas = await resCajas.json();
    this.cajasDisponibles = cajas;
  },
  methods: {
    async agregar() {
      const res = await fetch(`${be}/ventas`, {
        method: "POST",
        headers: {
          "x-token": this.app.token,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          identificador: this.caja,
          cafe: this.cafe,
          cantidad: this.cantidad,
        }),
      });
      const datos = await res.json();
      console.log(datos);
      this.app.connection.send('hihi')
    },
  },
};
</script>

<style scoped>
</style>
