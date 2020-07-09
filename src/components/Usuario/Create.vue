<template>
    <div class="card">

        <div class="card-content">

            <h4 class="title is-4 has-text-centered">
                Registrar Usuario
            </h4>

            <br>

            <div class="field is-horizontal">
                <div class="field-body">

                    <div class="field">
                        <label for="nombre" class="label">Cedula:</label>
                        <div class="control">
                            <input type="number" name="nombre" placeholder="Cedula Usuario" class="input" v-model="usuario.username">
                        </div>
                    </div>

                    <div class="field">
                        <label for="siglas" class="label">Contraseña:</label>
                        <div class="control">
                            <input type="text" name="nombre" placeholder="Contraseña Usuario" class="input" v-model="usuario.password">
                        </div>
                    </div>

                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-body">

                    <div class="field">
                        <label for="nombre" class="label">Correo electronico:</label>
                        <div class="control">
                            <input type="email" name="nombre" placeholder="Correo Usuario" class="input" v-model="usuario.email">
                        </div>
                    </div>

                    <div class="field">
                        <label for="siglas" class="label">Decanato:</label>
                        <div class="control">
                            <div class="select is-info is-fullwidth">
                                <select v-model="usuario.decanato_id">
                                    <option v-for="item of decanatos" 
                                        :key="item.codigo" :selected="item.codigo == usuario.decanato_id" :value="item.codigo">
                                        {{ item.nombre }} - {{ item.siglas }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label for="siglas" class="label">Rol:</label>
                        <div class="control">
                            <div class="select is-info is-fullwidth">
                                <select v-model="rol">
                                    <option value="admin" selected>Administrador</option>
                                    <option value="secret">Secretario</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
                <p class="control">
                    <button class="button is-success" :disabled="camposVacios" @click="mensajeConfirmacion()">
                        Registar
                    </button>
                </p>
                <p class="control">
                    <button class="button is-warning" @click="vaciarCampos()">
                        Cancelar
                    </button>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
    import UsuarioDataService from '../../services/UsuarioDataService'
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Usuario from '../../models/Usuario'

    export default {
        name: 'CreateUsuario',
        data() {
            return {
                usuario: new Usuario('','','','',1),
                rol: 'admin',
                decanatos:[]
            }
        },
        mounted() {
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
        },
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.usuario.username && this.usuario.password )
                    return false;

                return true;
            }
        },
        methods: {
            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.usuario = new Usuario('','','','',1);
                this.$emit('cancelar-registro'); /* EMITE LA SEÑAL DE CANCELAR REGISTRO */
            },

            /* METODO PARA REALIZAR EL REGISTRO */
            crearUsuario() {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE CREAR */
                /* CHEQUEA EL ROL SELECCIONADO */
                if(this.rol=='admin'){
                    UsuarioDataService
                        .createAdmin(this.usuario)
                        .then(response => {

                            /* SI EL REGISTRO SE REALIZO CON ÉXITO, 
                            *  CAPTURA LA RESPUETA DE LA API
                            *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                            */

                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha registrado con éxito',
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
                } else {
                    UsuarioDataService
                        .createSecret(this.usuario)
                        .then(response => {

                            /* SI EL REGISTRO SE REALIZO CON ÉXITO, 
                            *  CAPTURA LA RESPUETA DE LA API
                            *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                            */

                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha registrado con éxito',
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
                }
            },

             /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion() {

                Swal.fire({
                    icon: 'question',
                    title: 'Registrar Decanato',
                    text: '¿Desea registrar el usuario?',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#48c774',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Sí',
                }).then(result => {

                    /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE REGISTRAR EL DECANATO */
                    if (result.value) {
                        this.crearDecanato();
                    }
                });

            },
        },

    }
</script>

<style>
    .title.is-4.has-text-centered {
        background-color: #79ceed;
    }

    .card {
        border-radius: 1ex;
        background-color: #79ceed;
    }
</style>