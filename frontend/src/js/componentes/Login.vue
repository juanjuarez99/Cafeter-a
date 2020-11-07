<template>
  <div>
    <h1>Iniciar sesion</h1>
    <p>{{ msg }}</p>
    <label>Nombre de usuario:</label>
    <input type="text" v-model="usuario" />
    <label>Contraseña:</label>
    <input type="password" v-model="contraseña" />
    <button @click="iniciarSesion">Acceder</button>
  </div>
</template>

<script>
import config from "../config";
const be = config.direccion_backend;
import Store from "../store";
import jwt from "jsonwebtoken";
import { encode, decode } from "../encode";

export default {
  name: "Login",
  data: () => ({
    usuario: "",
    contraseña: "",
    msg: "",
    app: Store.app,
  }),
  methods: {
    async iniciarSesion() {
      try {
        const res = await fetch(`${be}/login`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            usuario: this.usuario,
            contraseña: this.contraseña,
          }),
        });
        const data = await res.json();
        if (data.status === "error") {
          this.msg = data.msg;
        } else {
          this.app.token = data.msg;
          this.app.iniciado = true;
          this.$router.push("dashboard");

          jwt.verify(data.msg, config.claveToken, (err, decoded) => {
            if (err) {
              console.log(err);
            } else {
              this.app.permisos = decode(decoded.permisos);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>
