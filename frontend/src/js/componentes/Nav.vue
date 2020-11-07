<template functional>
  <nav>
    <ul>
      <li v-if="props.permisos.usuarios.ver">
        <router-link to="/usuarios">Usuarios</router-link>
      </li>
      <li v-if="props.permisos.cafe.ver">
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
    </ul>
  </nav>
</template>
