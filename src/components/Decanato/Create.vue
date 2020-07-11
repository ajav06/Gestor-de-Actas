<template>
    <div class="card crear">

        <div class="card-content">

            <h4 class="title is-4 has-text-centered">
                Registrar Decanato
            </h4>

            <br>

            <div class="field is-horizontal">
                <div class="field-body">

                    <b-field label="Nombre: ">
                        <b-input v-model="decanato.nombre" placeholder="Nombre Decanato" required></b-input>
                    </b-field>

                    <b-field label="Siglas: ">
                        <b-input v-model="decanato.siglas" placeholder="Siglas Decanato" required></b-input>
                    </b-field>

                </div>
            </div>

            <b-field grouped group-multiline>
                <p class="control">
                    <b-button @click="mensajeConfirmacion()"
                        type="is-success" 
                        icon-left="check"
                        :disabled="camposVacios">
                        Registar
                    </b-button>
                </p>
                <p class="control">
                    <b-button @click="vaciarCampos()"
                        type="is-warning" 
                        icon-left="close">
                        Cancelar
                    </b-button>
                </p>
            </b-field>
        </div>

    </div>
</template>

<script>
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Decanato from '../../models/Decanato'

    export default {
        name: 'CreateDecanato',
        data() {
            return {
                decanato: new Decanato()
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
                this.decanato = new Decanato();
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

                        let message = response.data;

                        if(message['message'] == 'exito'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha registrado con éxito',
                            }).then(result => {
                                window.location.reload(false);
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: message['message']
                            });
                        }
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
    /* .title.is-4.has-text-centered {
        background-color: #79ceed;
    }

    .card {
        border-radius: 1ex;
        background-color: #79ceed;
    } */
</style>