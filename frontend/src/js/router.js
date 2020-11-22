// En este archivo se definen todas las rutas disponibles en la aplicación
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Importas todos los componentes
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import VerTodos from './componentes/VerTodos';
import AñadirCafe from './componentes/AñadirCafe';
import AñadirCaja from './componentes/AñadirCaja';
import AñadirVenta from './componentes/AñadirVenta';
import AñadirUsuarios from './componentes/AñadirUsuarios';
import AñadirProveedores from './componentes/AñadirProveedores';
import AñadirTamaños from './componentes/AñadirTamaños';
import VerUno from './componentes/VerUno';
import EditarCafe from './componentes/EditarCafe';
import EditarUsuarios from './componentes/EditarUsuarios';
import EditarProveedores from './componentes/EditarProveedores';
import EditarTamaños from './componentes/EditarTamaños';
import EditarCaja from './componentes/EditarCaja';
import EditarVenta from './componentes/EditarVenta';
import Cantidades from './componentes/Cantidades.vue';

// Se define un router con las rutas en un array (routes) con su respectiva ruta
// y componente
const Router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    {
      path: '/usuarios',
      component: VerTodos,
      props: { direccion: 'usuarios' },
    },
    { path: '/usuarios/anadir', component: AñadirUsuarios },
    {
      path: '/usuarios/:id',
      component: VerUno,
      props: { direccion: 'usuarios' },
    },
    { path: '/usuarios/:id/editar', component: EditarUsuarios },
    { path: '/cafes', component: VerTodos, props: { direccion: 'cafes' } },
    { path: '/cafes/anadir', component: AñadirCafe },
    { path: '/cafes/:id', component: VerUno, props: { direccion: 'cafes' } },
    { path: '/cafes/:id/editar', component: EditarCafe },
    {
      path: '/proveedores',
      component: VerTodos,
      props: { direccion: 'proveedores' },
    },
    { path: '/proveedores/anadir', component: AñadirProveedores },
    {
      path: '/proveedores/:id',
      component: VerUno,
      props: { direccion: 'proveedores' },
    },
    { path: '/proveedores/:id/editar', component: EditarProveedores },
    { path: '/tamanos', component: VerTodos, props: { direccion: 'tamanos' } },
    { path: '/tamanos/anadir', component: AñadirTamaños },
    {
      path: '/tamanos/:id',
      component: VerUno,
      props: { direccion: 'tamanos' },
    },
    { path: '/tamanos/:id/editar', component: EditarTamaños },
    { path: '/caja', component: VerTodos, props: { direccion: 'caja' } },
    { path: '/caja/anadir', component: AñadirCaja },
    { path: '/caja/:id', component: VerUno, props: { direccion: 'caja' } },
    { path: '/caja/:id/editar', component: EditarCaja },
    { path: '/ventas', component: VerTodos, props: { direccion: 'ventas' } },
    { path: '/ventas/anadir', component: AñadirVenta },
    { path: '/ventas/:id', component: VerUno, props: { direccion: 'ventas' } },
    { path: '/ventas/:id/editar', component: EditarVenta },
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/cantidades', component: Cantidades },
  ],
});

export default Router;
