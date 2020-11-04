import 'regenerator-runtime/runtime'
import Vue from 'vue'
import router from './router'
import App from './componentes/App.vue'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')