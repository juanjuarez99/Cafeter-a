<template>
  <div>
    <h1>Añadir café</h1>
    <label> Nombre de Cafe: </label>
    <input type="text" v-model="nombre" />
    <label> Tamaño de Cafe: </label>
    <select v-model="tamano">
      <option value=""></option>
      <option
        v-for="tamano in tamanosDisponibles"
        :value="tamano.cod_tamaño"
        :key="tamano.cod_tamaño"
      >
        {{ tamano.nombre }}
      </option>
    </select>
    <label> Precio: </label>
    <input type="number" v-model="precio" />
    <label> Proveedor: </label>
    <select v-model="proveedor">
      <option value=""></option>
      <option
        v-for="proveedor in proveedoresDisponibles"
        :value="proveedor.cod_proveedor"
        :key="proveedor.cod_proveedor"
      >
        {{ proveedor.nombre }}
      </option>
    </select>

    <button @click="agregar">Agregar</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "AñadirCafe",
  data: () => ({
    nombre: "",
    tamano: "",
    precio: 0,
    proveedor: "",
    tamanosDisponibles: [],
    proveedoresDisponibles: [],
    app: Store.app,
  }),
  async created() {
    this.app.connection = new WebSocket("ws://192.168.0.16:3001");
    const resprove = await fetch(`${be}/proveedores`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const provedores = await resprove.json();
    this.proveedoresDisponibles = provedores;

    const res = await fetch(`${be}/tamanos`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const tamanos = await res.json();
    this.tamanosDisponibles = tamanos;
  },
  methods: {
    async agregar() {
        
      const res = await fetch(`${be}/cafes`, {
        method: "POST",
        headers: {
          "x-token": this.app.token,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            nombre: this.nombre,
            "tamaño": this.tamano,
            precio: this.precio,
            proveedor: this.proveedor
        })
      });
      const datos = await res.json()
      console.log(datos)
      this.app.connection.send('hihi')
    },
  },
};
</script>

<style scoped>
</style>