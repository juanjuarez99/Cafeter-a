// Importas las librerías necesarias
import 'regenerator-runtime/runtime';
import Vue from 'vue';
// Importas los archivos donde defines rutas y la aplicación
import router from './router';
import App from './componentes/App.vue';

// Se crea una nueva instancia de Vue con el router y la aplicación
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

