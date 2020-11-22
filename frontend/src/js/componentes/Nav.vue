<template functional>
  <nav>
    <ul>
      <li v-if="props.permisos.usuarios.ver">
        <router-link to="/usuarios">Usuarios</router-link>
      </li>
      <li v-if="props.permisos.cafes.ver">
        <router-link to="/cafes">Cafes</router-link>
      </li>
      <li v-if="props.permisos.proveedores.ver">
        <router-link to="/proveedores">Proveedores</router-link>
      </li>
      <li v-if="props.permisos.tamanos.ver">
        <router-link to="/tamanos">Tamaños</router-link>
      </li>
      <li v-if="props.permisos.caja.ver">
        <router-link to="/caja">Caja</router-link>
      </li>
      <li v-if="props.permisos.ventas.ver">
        <router-link to="/ventas">Ventas</router-link>
      </li>
      <li v-if="props.permisos.usuarios.ver && props.permisos.cafes.ver &&
        props.permisos.proveedores.ver && props.permisos.tamanos.ver &&
        props.permisos.caja.ver && props.permisos.ventas.ver">
        <router-link to="/cantidades">Cantidades</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  ul {
    list-style: none;
    margin: 0;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    li {
      a {
        color: white;
        &:hover {
          color: grey;
        }
      }
    }
  }
}
</style>
