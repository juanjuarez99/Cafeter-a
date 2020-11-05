<template>
  <div>
    <h1>Editar venta</h1>
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
    <button @click="guardar">Guardar</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "EditarVenta",
  data: () => ({
    cafe: "",
    cantidad: "",
    caja: "",
    cafesDisponibles: [],
    cajasDisponibles: [],
    app: Store.app,
  }),
  async created() {
    const resven = await fetch(`${be}/ventas/${this.$route.params.id}`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const ven = await resven.json();
    this.cafe = ven[0].cafe;
    this.cantidad = ven[0].cantidad;
    this.caja = ven[0].identificador;

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
    async guardar() {
      const res = await fetch(`${be}/ventas/${this.$route.params.id}`, {
        method: "PUT",
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
    },
  },
};
</script>

<style scoped>
</style>
