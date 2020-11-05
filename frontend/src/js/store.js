import Vue from 'vue'


const obj = {
    app: {
        token: "",
        iniciado: false,
        permisos: {
            cafes: {
                ver: false,
                anadir: false,
                editar: false,
                borrar: false,
            },
            tamanos: {
                ver: false,
                anadir: false,
                editar: false,
                borrar: false,
            },
            caja: {
                ver: false,
                anadir: false,
                editar: false,
                borrar: false,
            },
            ventas: {
                ver: false,
                anadir: false,
                editar: false,
                borrar: false,
            },
            proveedores: {
                ver: false,
                anadir: false,
                editar: false,
                borrar: false,
            },
            usuarios: {
                ver: false,
                anadir: false,
                editar: false,
                borrar: false,
            },
        }
    }
}
export default Vue.observable(obj)