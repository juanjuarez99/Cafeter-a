<template>
  <div id="app">
    <Nav v-if="iniciado" :permisos="permisos"></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import Store from "../store";

export default {
  name: "App",
  components: { Nav },
  data: () => Store.app,
};
</script>

<style lang="scss">
$color: lightgreen;

*,
*::after,
*::before {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  font-family: sans-serif;
  margin: 0;
}

#app > div {
  width: 60vw;
  margin: 0 auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  &,
  th,
  td {
    border: 1px solid grey;
  }
}

nav {
  background: $color;
}

button,
.button {
  border-radius: 0;
  border: none;
  background: $color;
  padding: 0.2em 0.5em;
  display: inline-block;
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    background: darken($color, 10%);
  }
}

h1 {
  text-align: center;
}
</style>
