<template>
  <div>
    <h1>Editar caja</h1>
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
    <button @click="guardar">Guardar</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";

export default {
  name: "EditarCaja",
  data: () => ({
    usuario: "",
    fecha: "",
    usuariosDisponibles: [],
    app: Store.app,
  }),
  async created() {
    const rescaj = await fetch(`${be}/caja/${this.$route.params.id}`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const caj = await rescaj.json();
    this.usuario = caj[0].usuario;
    this.fecha = caj[0].fecha.split("T")[0];

    const res = await fetch(`${be}/usuarios`, {
      headers: {
        "x-token": this.app.token,
      },
    });
    const usuarios = await res.json();
    this.usuariosDisponibles = usuarios;
  },
  methods: {
    async guardar() {
      const res = await fetch(`${be}/caja/${this.$route.params.id}`, {
        method: "PUT",
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
