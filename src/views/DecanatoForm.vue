<template>
    <section class="section">
        <div class="card">

            <div class="card-content">

                <h4 class="title is-4 has-text-centered">
                    Actualizar Decanato
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
                            Actulizar
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
    </section>
</template>

<script>
    import DecanatoDataService from '@/services/DecanatoDataService'
    import Decanato from '@/models/Decanato'

    export default {
        name: 'DecanatoForm',
        data() {
            return {
                decanato: new Decanato(),
                id: this.$route.params.id
            }
        },
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.decanato.nombre && this.decanato.siglas)
                    return false;

                return true;
            },

            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL USUARIO ACTUAL */
            currentUser(){
                return this.$store.state.auth.user;
            },

            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL ROL DEL USUARIO ACTUAL, SI ESTA EL USUARIO ESTA ACTIVO */
            roleUser(){
                if(this.currentUser){
                    return this.currentUser.roles;
                }
            }

        },
        mounted(){

            if(this.id){
                /* DE LA CLASE 'DecanatoDataService' LLAMA LA FUNCIÓN DE BUSCAR */
                DecanatoDataService
                    .get(this.id)
                    .then(response => {

                        /* SI LA BUSQUEDA SE REALIZO CON ÉXITO, 
                        *  CAPTURA LA RESPUETA DE LA API
                        *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                        */
                        this.decanato = response.data;
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

            /* SI EL USUARIO NO ESTA ACTIVO LO REDIRIGE AL LOGIN */
            if(!this.currentUser){
                this.$router.push('/');
            }

            /* SI EL USUARIO ESTA ACTIVO Y NO ES ADMIN LO REDIRIGE A LA PANTALLA DE ACTAS */
            if(this.currentUser && !this.roleUser.includes('ROLE_ADMIN')){
                this.$router.push('/actas')
            }

        },
        methods: {
            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.decanato = new Decanato();
                this.$router.push('/decanatos');
            },

            /* METODO PARA ACTUALIZAR */
            actualizarDecanato() {
                /* DE LA CLASE 'DecanatoDataService' LLAMA LA FUNCIÓN DE CREAR */
                DecanatoDataService
                    .update(this.decanato)
                    .then(response => {

                        /* SI LA ACTUALIZACIÖN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        let message = response.data;

                        if(message['message'] == 'exito'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha actualizado con éxito',
                            }).then(result => {
                                this.$router.push('/decanatos');
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
                    title: 'Actualizar Decanato',
                    text: '¿Desea actualizar el decanato?',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#48c774',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Sí',
                }).then(result => {

                    /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE REGISTRAR EL DECANATO */
                    if (result.value) {
                        this.actualizarDecanato();
                    }
                });

            },
        }

    }
</script>