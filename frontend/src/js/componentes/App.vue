<template>
<div id="app">
    <Nav v-if="iniciado" :permisos="permisos"></Nav>
    <router-view></router-view>
</div>
</template>

<script>
import Nav from './Nav.vue'
import Store from '../store'

export default {
    name: 'App',
    components: { Nav },
    data: () => Store.app
}
</script>

<style scoped>

</style>