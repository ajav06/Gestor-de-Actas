<template>
    <tr>
        <td>
            <!-- SI NO ESTA MODIFICANDO, SOLO MUESTRA EL NOMBRE -->
            <p v-if="!update">
                {{ usuario.username }}
            </p>

            <!-- EN CASO CONTRARIO, ACTIVA EL CAMPO PARA MODIFICAR -->
            <div class="field" v-else>
                <div class="control">
                    <input type="text" class="input" v-model="item.username">
                </div>
            </div>
        </td>

        <td>
            <!-- SI NO ESTA MODIFICANDO, SOLO MUESTRA LAS SIGLAS -->
            <p v-if="!update">
                {{ usuario.decanato.nombre }}
            </p>

            <!-- EN CASO CONTRARIO, ACTIVA EL CAMPO PARA MODIFICAR -->
            <div class="field" v-else>
                <div class="control">
                    <input type="text" class="input" v-model="item.decanato_id">
                </div>
            </div>
        </td>

        <td>
            <p>
                {{ usuario.roles.rol }}
            </p>
        </td>


        <td>
            <!-- SI NO ESTA MODIFICANDO, MUESTRA LAS OPCIONES A REALIZAR -->
            <div class="field is-grouped" v-if="!update">
                <div class="control">
                    <button class="button is-info" @click="activarCampos">Modificar</button>
                </div>

                <div class="control">
                    <button class="button is-danger" @click="mensajeConfirmacion('E')">Eliminar</button>
                </div>
            </div>

            <!-- EN CASO CONTRARIO, ACTIVA LAS OPCIONES DE ACEPTAR O CANCELAR LA MODIFICACIÓN -->
            <div class="field is-grouped" v-else>
                <div class="control">
                    <button class="button is-success" @click="mensajeConfirmacion('M')">Actualizar</button>
                </div>

                <div class="control">
                    <button class="button is-warning" @click="activarCampos">Cancelar</button>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    import UsuarioDataService from '../../services/UsuarioDataService';
    import Usuario from '../../models/Usuario'

    export default {
        name: 'ItemUsuario',
        props: ['usuario'],
        data() {
            return {
                item: new Usuario('','','','',1),
                update: false /* BOOLEAN PARA VERIFICAR SI ESTA REALIZANDO UNA MODIFICACIÓN */
            }
        },
        methods: {
            /* ACTIVA LOS CAMPOS PARA REALIZAR LA MODIFICACIÓN */
            activarCampos() {
                this.update = !this.update;
                this.item.username = this.usuario.codigo;
                this.item.decanato_id = this.usuario.decanato.codigo;
            },

            /* METODO PARA REALIZAR LA ACTUALIZACIÓN */
            actualizarUsuario() {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE ACTUALIZAR */
                UsuarioDataService
                    .update(this.item)
                    .then(response => {

                        /* SI LA ACTUALIZACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        Swal.fire({
                            icon: 'success',
                            title: 'Usuaeio actualizado con éxito.'
                        }).then(result => {

                            window.location.reload(false);

                        });
                    }, error => {

                        /* Y SI HUBO UN ERROR
                         *  CAPTURA LA RESPUETA DEL ERROR LA API
                         *  Y MUESTRA UNA MODAL MOSTRANDO CUAL FUE EL ERROR
                         */

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error
                        });

                    });
            },

            eliminarUsuario() {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE ELIMINAR */
                UsuarioDataService
                    .remove(this.usuario.codigo)
                    .then(response => {

                        /* SI LA ELIMINACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario eliminado con éxito.'
                        }).then(result => {

                            window.location.reload(false);

                        });
                    }, error => {

                        /* Y SI HUBO UN ERROR
                         *  CAPTURA LA RESPUETA DEL ERROR LA API
                         *  Y MUESTRA UNA MODAL MOSTRANDO CUAL FUE EL ERROR
                         */

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error
                        });

                    });
            },

            /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion(tipo) {

                /* SI EL TIPO DE CONFIRMACIÓN ES M (MODIFOCAR), MUESTRA EL SIGUIENTE MENSAJE */
                if (tipo == 'M') {
                    Swal.fire({
                        icon: 'question',
                        title: 'Actualizar Usuario',
                        text: '¿Desea actualizar el usuario?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ACTUALIZAR USUARIO */
                        if (result.value) {
                            this.actualizarUsuario();
                        }
                    });
                }

                /* SI EL TIPO DE CONFIRMACIÓN ES E (ELIMINAR), MUESTRA EL SIGUIENTE MENSAJE */
                else if (tipo == 'E') {
                    Swal.fire({
                        icon: 'question',
                        title: 'Eliminar Usuario',
                        text: '¿Desea eliminar el usuario?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ELIMINAR USUARIO */
                        if (result.value) {
                            this.eliminarUsuario();
                        }
                    });
                }

            },


        }

    }
</script>

<style>
    .field.is-grouped {
        justify-content: center;
    }
</style>