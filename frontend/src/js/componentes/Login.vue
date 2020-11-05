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
              // AQUI HAY UN ERROR EN EL INDICE QUE SE OCUPA PARA DETECTAR A QUE PERMISO SE REFIERE POR SECCION, LOS ESTA DESFAZANDO
              const p = decoded.permisos;
              const etiquetas = Object.keys(this.app.permisos);
              p.split("").forEach((permiso, i) => {
                const bin = parseInt(permiso, 16).toString(2).padStart(4, "0");
                const eti = Object.keys(this.app.permisos[etiquetas[i]]);
                bin.split("").forEach((valor, j) => {
                  this.app.permisos[etiquetas[i]][eti[j]] = Number(valor)
                    ? true
                    : false;
                });
              });
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