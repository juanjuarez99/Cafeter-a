<template>
  <div>
    <h1>Añadir caja</h1>
    <label>Usuario:</label>
    <select v-model="usuario">
      <option value></option>
      <option
        v-for="usuario in usuariosDisponibles"
        :value="usuario.cod_usuarios"
        :key="usuario.cod_usuarios"
      >{{ usuario.nombres }} {{ usuario.apellidos}}</option>
    </select>
    <label>Fecha:</label>
    <input type="date" v-model="fecha" />
    <button @click="agregar">Agregar</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "AñadirCaja",
  data: () => ({
    usuario: "",
    fecha: "",
    usuariosDisponibles: [],
    app: Store.app,
  }),
  async created() {
    const res = await fetch(`${be}/usuarios`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const usuarios = await res.json();
    this.usuariosDisponibles = usuarios;
  },
  methods: {
    async agregar() {
      const res = await fetch(`${be}/caja`, {
        method: "POST",
        headers: {
          "x-token": this.app.token,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          usuario: this.usuario,
          fecha: this.fecha,
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
