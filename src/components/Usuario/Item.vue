<template>
    <tr>
        <td>
            <!-- SI NO ESTA MODIFICANDO, SOLO MUESTRA EL NOMBRE -->
            <p v-if="!update">
                {{ usuario.cedula }}
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
                <div class="select is-info is-fullwidth">
                    <select v-model="item.decanato_id">
                        <option v-for="decanato of decanatos" 
                            :key="decanato.codigo" :selected="decanato.codigo == item.decanato_id" :value="decanato.codigo">
                            {{ decanato.siglas }}
                        </option>
                    </select>
                </div>
            </div>
        </td>

        <td>
            <p v-if="!update">
                {{ usuario.roles[0].rol }}
            </p>

            <div class="field" v-else>
                <div class="control">
                    <div class="select is-info is-fullwidth">
                        <select v-model="item.rol">
                            <option v-for="rol of roles" 
                                :key="rol.id" :selected="rol.id == item.rol" :value="rol.id">
                                {{ rol.rol }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
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
    import UsuarioDataService from '../../services/UsuarioDataService'
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Usuario from '../../models/Usuario'

    export default {
        name: 'ItemUsuario',
        props: ['usuario'],
        data() {
            return {
                item: new Usuario(),
                decanatos:[],
                roles:[],
                update: false /* BOOLEAN PARA VERIFICAR SI ESTA REALIZANDO UNA MODIFICACIÓN */
            }
        },
        mounted(){
            DecanatoDataService
                .list()
                .then(response => {
                    this.decanatos = response.data
                }, error => {

                        /* 
                    *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
                    */

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error
                    });
                });

            UsuarioDataService
                .listRole()
                .then(response => {
                    this.roles = response.data
                }, error => {

                        /* 
                    *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
                    */

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error
                    });
                });
        },
        methods: {
            /* ACTIVA LOS CAMPOS PARA REALIZAR LA MODIFICACIÓN */
            activarCampos() {
                this.update = !this.update;
                this.item.id = this.usuario.id;
                this.item.email = this.usuario.email;
                this.item.username = this.usuario.cedula;
                this.item.decanato_id = this.usuario.decanato.codigo;
                this.item.rol = this.usuario.roles[0].id;
            },

            /* METODO PARA REALIZAR LA ACTUALIZACIÓN */
            actualizarUsuario() {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE ACTUALIZAR */
                console.log(this.usuario);
                this.item.setRol();
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