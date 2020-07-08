<template>
    <div class="card">

        <div class="card-content">

            <h4 class="title is-4 has-text-centered">
                Registrar Decanato
            </h4>

            <br>

            <div class="field is-horizontal">
                <div class="field-body">

                    <div class="field">
                        <label for="nombre" class="label">Nombre:</label>
                        <div class="control">
                            <input type="text" name="nombre" placeholder="Nombre Decanato" class="input" v-model="decanato.nombre">
                        </div>
                    </div>

                    <div class="field">
                        <label for="siglas" class="label">Siglas:</label>
                        <div class="control">
                            <input type="text" name="nombre" placeholder="Siglas Decanato" class="input" v-model="decanato.siglas">
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
    import DecanatoDataService from '../../services/DecanatoDataService'

    export default {
        name: 'CreateDecanato',
        data() {
            return {
                decanato: {
                    nombre: null,
                    siglas: null,
                    estatus: 'A'
                }
            }
        },
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.decanato.nombre && this.decanato.siglas)
                    return false;

                return true;
            }
        },
        methods: {
            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.decanato.nombre = null;
                this.decanato.siglas = null;
                this.$emit('cancelar-registro'); /* EMITE LA SEÑAL DE CANCELAR REGISTRO */
            },

            /* METODO PARA REALIZAR EL REGISTRO */
            crearDecanato() {
                /* DE LA CLASE 'DecanatoDataService' LLAMA LA FUNCIÓN DE CREAR */
                DecanatoDataService
                    .create(this.decanato)
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
                    })
                    .catch(error => {
                        /* Y SI HUBO UN ERROR
                         *  CAPTURA LA RESPUETA DEL ERROR LA API
                         *  Y MUESTRA UNA MODAL MOSTRANDO CUAL FUE EL ERROR
                         */

                        console.log(error.response);

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.response.data
                        });
                    });
            },

             /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion() {

                Swal.fire({
                    icon: 'question',
                    title: 'Registrar Decanato',
                    text: '¿Desea registrar el decanato?',
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