import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from './componentes/Login'
import Dashboard from './componentes/Dashboard'
import VerTodos from './componentes/VerTodos'
import Añadir from './componentes/Añadir'

const Router = new VueRouter({
    routes: [
        {path: '/', component: Login},
        {path: '/dashboard', component: Dashboard},
        {path: '/usuarios', component: VerTodos, props: {direccion: 'usuarios'}},
        {path: '/cafes', component: VerTodos, props: {direccion: 'cafes'}},
        {path: '/proveedores', component: VerTodos, props: {direccion: 'proveedores'}},
        {path: '/proveedores/anadir', component: Añadir, props: {direccion: 'proveedores'}},
        {path: '/tamanos', component: VerTodos, props: {direccion: 'tamanos'}},
        {path: '/caja', component: VerTodos, props: {direccion: 'caja'}},
        {path: '/ventas', component: VerTodos, props: {direccion: 'ventas'}},
    ]
})

export default Router