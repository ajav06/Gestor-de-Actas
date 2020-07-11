<template>
    <div class="card crear">

        <div class="card-content">

            <h4 class="title is-4 has-text-centered">
                Registrar Acta de Consejo
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
                            dateFormat='YYYY-MM-DD'
                            required>
                        </b-datepicker>
                    </b-field>
                    
            </b-field>

            <b-field grouped group-multiline>

                    <b-field label="Decanato:" expanded v-if="this.roleUser.includes('ROLE_ADMIN')">
                        <b-select placeholder="Seleccione el Decanato" v-model="acta.decanato.codigo" expanded required>
                            <option v-for="item of decanatos" 
                                :key="item.codigo" :selected="item.codigo == 1" :value="item.codigo">
                                {{ item.nombre }} - {{ item.siglas }}
                            </option>
                        </b-select>
                    </b-field>

                    <b-field label="Decanato:" expanded v-else>
                        <b-input v-model="acta.decanato.codigo" disabled></b-input>
                    </b-field>

                    <b-field label="Archivo Acta:" expanded v-if="!acta.pdf">

                        <b-field grouped group-multiline expanded>
                            <b-field class="file">
                                <b-upload v-model="pdfUpload" accept="application/pdf">
                                    <a class="button is-primary">
                                        <b-icon icon="upload"></b-icon>
                                        <span>Click para cargar</span>
                                    </a>
                                </b-upload>
                                <span class="file-name" v-if="pdfUpload">
                                    {{ pdfUpload.name }}
                                </span>
                            </b-field>

                            <div class="has-text-centered">
                                <b-button class="button is-info" 
                                    :disabled="!pdfUpload" 
                                    @click="mensajeConfirmacion('p')" 
                                    :loading="loading" >
                                    Subir
                                </b-button>
                            </div>
                        </b-field>
                        
                    </b-field>

                    <b-field label="Archivo Acta:" expanded v-else>
                        <b-input disabled v-model="pdfName"></b-input>
                    </b-field>
                    
            </b-field>

            <b-field label="Resumen:">
                <b-input type="textarea" v-model="acta.resumen"></b-input>
            </b-field>

            <b-field grouped group-multiline>
                <p class="control">
                    <b-button @click="mensajeConfirmacion('a')"
                        type="is-success" 
                        icon-left="check"
                        :disabled="camposVacios">
                        Registar
                    </b-button>
                </p>
                <p class="control">
                    <b-button @click="vaciarCampos()"
                        type="is-warning" 
                        icon-left="close"
                        :disabled="acta.pdf">
                        Cancelar
                    </b-button>
                </p>
            </b-field>
        </div>

    </div>
</template>

<script>
    import ActaDataService from '../../services/ActaDataService'
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Acta from '../../models/Acta'
    import Decanato from '../../models/Decanato'

    export default {
        name: 'CreateActa',
        data() {
            return {
                acta: new Acta('','o','',null,'',1,'A'),
                pdfUpload: null,
                pdfName: null,
                decanatos:[],
                loading: false
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
                this.$emit('cancelar-registro'); /* EMITE LA SEÑAL DE CANCELAR REGISTRO */
            },

            /* METODO PARA REALIZAR EL REGISTRO */
            crearActa() {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE CREAR */
                ActaDataService
                    .create(this.acta)
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
                    })
            },

            /* METODO PARA REALIZAR EL REGISTRO */
            subirPDF() {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE SUBIR PDF */
                var formData = new FormData();
                formData.append('file', this.pdfUpload);

                this.pdfUpload = formData;

                 ActaDataService
                    .uploadPDF(this.pdfUpload)
                    .then(response => {

                        /* SI EL REGISTRO SE REALIZO CON ÉXITO, 
                         * CAPTURA LA RESPUETA DE LA API,
                         * GUARDA EL ID DEL PDF EN UNA VARIABLE
                         * Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        this.acta.pdf = response.data['fileId'];

                        this.isLoading = false;

                        Swal.fire({
                            icon: 'success',
                            title: 'Se ha registrado con éxito',
                        });

                    }, error => {
                        /* Y SI HUBO UN ERROR
                         *  CAPTURA LA RESPUETA DEL ERROR LA API
                         *  Y MUESTRA UNA MODAL MOSTRANDO CUAL FUE EL ERROR
                         */
                        
                        this.isLoading = false;
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error
                        });
                    });
            },

             /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion(tipo) {

                if(tipo=='a'){
                    Swal.fire({
                        icon: 'question',
                        title: 'Registrar Acta',
                        text: '¿Desea registrar el acta?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE REGISTRAR EL ACTA */
                        if (result.value) {
                            this.crearActa();
                        }
                    });
                }

                else if(tipo=='p'){
                    Swal.fire({
                        icon: 'question',
                        title: 'Registrar PDF',
                        text: '¿Desea registrar el PDF del acta?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE GUARDAR EL PDF DEL ACTA */
                        if (result.value) {
                            this.loading = true;
                            this.pdfName = this.pdfUpload.name;
                            this.subirPDF();
                        }
                    });
                }

            },
        },

    }
</script>
