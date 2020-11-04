import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import VerTodos from './componentes/VerTodos';
import AñadirCafe from './componentes/AñadirCafe';
import AñadirCaja from './componentes/AñadirCaja';
import AñadirVenta from './componentes/AñadirVenta';

const Router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    {
      path: '/usuarios',
      component: VerTodos,
      props: { direccion: 'usuarios' },
    },
    { path: '/cafes', component: VerTodos, props: { direccion: 'cafes' } },
    { path: '/cafes/anadir', component: AñadirCafe },
    {
      path: '/proveedores',
      component: VerTodos,
      props: { direccion: 'proveedores' },
    },
    { path: '/tamanos', component: VerTodos, props: { direccion: 'tamanos' } },
    { path: '/caja', component: VerTodos, props: { direccion: 'caja' } },
    { path: '/caja/anadir', component: AñadirCaja },
    { path: '/ventas', component: VerTodos, props: { direccion: 'ventas' } },
    { path: '/ventas/anadir', component: AñadirVenta },
  ],
});

export default Router;

