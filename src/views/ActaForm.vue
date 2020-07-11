<template>
    <section class="section">
        <div class="card">

            <div class="card-content">

                <h4 class="title is-4 has-text-centered">
                    Actualizar Acta de Consejo
                </h4>

                <br>

                <b-field grouped group-multiline>

                        <b-field label="Tipo de Sesión:" expanded>
                            <b-select placeholder="Select un Tipo" v-model="acta.tipo_sesion" expanded required>
                                <option value="o">
                                    Ordinaria
                                </option>
                                <option value="x">
                                    Extraordinaria
                                </option>
                            </b-select>
                        </b-field>

                        <b-field label="Fecha de la Sesión" expanded>
                            <b-datepicker
                                placeholder="Click aquí..."
                                icon="calendar-today"
                                trap-focus
                                v-model="acta.fecha_sesion"
                                :max-date="maxDate"
                                dateFormat='YYYY-MM-DD'
                                required>
                            </b-datepicker>
                        </b-field>

                        <b-field label="Decanato:" expanded v-if="this.roleUser.includes('ROLE_ADMIN')">
                            <b-select placeholder="Select un Tipo" v-model="acta.decanato.codigo" expanded required>
                                <option v-for="item of decanatos" 
                                    :key="item.codigo" :selected="item.codigo == acta.decanato.codigo" :value="item.codigo">
                                    {{ item.nombre }} - {{ item.siglas }}
                                </option>
                            </b-select>
                        </b-field>

                        <b-field label="Decanato:" expanded v-else>
                            <b-input v-model="acta.decanato.codigo" disabled></b-input>
                        </b-field>
                        
                </b-field>

                <b-field label="Resumen:">
                    <b-input type="textarea" v-model="acta.resumen"></b-input>
                </b-field>

                <b-field grouped group-multiline>
                    <p class="control">
                        <b-button @click="mensajeConfirmacion"
                            type="is-success" 
                            icon-left="check"
                            :disabled="camposVacios">
                            Actualizar
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
    import ActaDataService from '@/services/ActaDataService'
    import DecanatoDataService from '@/services/DecanatoDataService'
    import Acta from '@/models/Acta'
    import Decanato from '@/models/Decanato'

    export default {
        name: 'ActaForm',
        data() {
            return {
                id: this.$route.params.id,
                acta: new Acta(),
                maxDate: new Date(),
                pdfUpload: null,
                decanatos:[],
            }
        },
        computed:{
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.acta.fecha_sesion && this.acta.resumen && this.acta.pdf)
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
            },

            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL DECANATO DEL USUARIO ACTUAL, SI ESTA EL USUARIO ESTA ACTIVO */
            decanatoUser(){
                if(this.currentUser){
                    return this.currentUser.decanato_id;
                }
            }
        },
        mounted() {

            if(this.id){
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE BUSCAR */
                ActaDataService
                    .get(this.id)
                    .then(response => {

                        /* SI LA BUSQUEDA SE REALIZO CON ÉXITO, 
                        *  CAPTURA LA RESPUETA DE LA API
                        *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                        */
                        this.acta = response.data;

                        this.acta.fecha_sesion = new Date(Date.parse(this.acta.fecha_sesion));
                        this.acta.fecha_sesion = new Date(this.acta.fecha_sesion.getFullYear(), this.acta.fecha_sesion.getMonth(), this.acta.fecha_sesion.getDate() + 1);

                        this.maxDate = new Date(Date.parse(this.acta.fecha_creacion));
                        this.maxDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() + 1);
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

            /* SI EL USUARIO ESTA ACTIVO Y ES ADMIN CARGA TODOS LOS DECANATOS */
            if(this.currentUser && this.roleUser.includes('ROLE_ADMIN')){
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
            } else if(this.currentUser && !this.roleUser.includes('ROLE_ADMIN')){
                /* SINO CARAGA SOLO SU DECANATOS */
                this.acta.decanato.codigo = this.decanatoUser()
            }
        },
        methods: {

            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.acta = new Acta();
                this.$router.push('/actas'); /* EMITE LA SEÑAL DE CANCELAR REGISTRO */
            },

            /* METODO PARA REALIZAR LA ACTUALIZACIÓN */
            actualizarActa() {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE ACTUZALIZAR */
                ActaDataService
                    .update(this.acta)
                    .then(response => {

                        /* SI LA ACTUALIZACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        let message = response.data;

                        if(message['message'] == 'exito'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha actualizado con éxito',
                            }).then(result => {
                                this.$router.push('/actas');
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
                    })
            },

             /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion() {

                Swal.fire({
                    icon: 'question',
                    title: 'Actualizar Acta',
                    text: '¿Desea actualizar el acta?',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#48c774',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Sí',
                }).then(result => {

                    /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ACTUALIZAR EL ACTA */
                    if (result.value) {
                        this.actualizarActa();
                    }
                });

            },
        },

    }
</script>
