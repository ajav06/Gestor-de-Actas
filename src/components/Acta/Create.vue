<template>
    <div class="card">

        <div class="card-content">

            <h4 class="title is-4 has-text-centered">
                Registrar Acta de Consejo
            </h4>

            <br>

            <div class="field is-horizontal">
                <div class="field-body">

                    <div class="field">
                        <label class="label">Tipo de Sesión:</label>
                        <div class="control">
                            <div class="select is-info is-fullwidth">
                                <select v-model="acta.tipo_sesion">
                                    <option value="o" selected>
                                        Ordinaria
                                    </option>
                                    <option value="e" selected>
                                        Extraordinaria
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Fecha de la Sesión:</label>
                        <div class="control">
                            <input type="date" class="label">
                        </div>
                    </div>

                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-body columns">

                    <div class="field column is-6">
                        <label class="label">Decanato:</label>
                        <div class="control">
                            <div class="select is-info is-fullwidth">
                                <select v-model="acta.decanato.codigo">
                                    <option v-for="item of decanatos" 
                                        :key="item.codigo" :selected="item.codigo == 1" :value="item.codigo">
                                        {{ item.nombre }} - {{ item.siglas }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field column is-6">

                        <label class="label">Archivo Acta:</label>

                        <div class="control columns is-vcentered">

                            <div class="file has-name column is-9" id="fileActa">
                                <label class="file-label">
                                    <input type="file" class="file-input" name="pdf" accept="application/pdf" @change="procesarDocumento">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                            Adjunta PDF...
                                        </span>
                                    </span>
                                    <span class="file-name">
                                        No hay archivo cargado
                                    </span>
                                </label>
                            </div>

                            <div class="column is-2 has-text-centered">
                                <button class="button is-info" :disabled="!pdfUpload" @click="mensajeConfirmacion('p')">Subir</button>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>

            <div class="field">
                <label class="label">Resúmen:</label>
                <div class="control">
                    <textarea placeholder="Resúmen Acta" class="textarea" v-model="acta.resumen"></textarea>
                </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
                <p class="control">
                    <button class="button is-success" :disabled="camposVacios" @click="mensajeConfirmacion('a')">
                        Registar
                    </button>
                </p>
                <p class="control">
                    <button class="button is-warning" @click="vaciarCampos()" :disabled="acta.pdf">
                        Cancelar
                    </button>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
    import bulmaCalendar from '../../../node_modules/bulma-calendar/dist/js/bulma-calendar';
    import ActaDataService from '../../services/ActaDataService'

    export default {
        name: 'CreateActa',
        data() {
            return {
                acta: {
                    tipo_sesion: 'o',
                    fecha_sesion: new Date().toLocaleDateString(),
                    decanato:{
                        codigo: 1,
                    },
                    pdf: null,
                    resumen: null,
                    estatus: 'A'
                },
                pdfUpload: false,
                decanatos:[{
                        codigo: 1,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 2,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    }, {
                        codigo: 3,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 4,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    }, {
                        codigo: 5,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 6,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    }, {
                        codigo: 7,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 8,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    }, {
                        codigo: 9,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 10,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    }, {
                        codigo: 11,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 12,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    }, {
                        codigo: 13,
                        nombre: 'Ciencias y Tecnología',
                        siglas: 'DCyT'
                    },
                    {
                        codigo: 14,
                        nombre: 'Civil',
                        siglas: 'DEA'
                    },
                ]
            }
        },
        mounted() {
            const calendars = bulmaCalendar.attach('[type="date"]', {
                type: 'date',
                color: 'info',
                lang: 'es',
                startDate: new Date(this.acta.fecha_sesion),
                dateFormat: 'YYYY-MM-DD'
            });
            
            calendars.forEach(calendar => {
                calendar.on('select', date => {
                    this.acta.fecha_sesion = date.data.value()
                });
            });
        },
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.acta.fecha_sesion && this.acta.resumen && this.acta.pdf)
                    return false;

                return true;
            }
        },
        methods: {
            /* METODO PARA PROCESAR EL PDF DEL INPUT */
            procesarDocumento(event){
                var file = event.target.files || event.dataTransfer.files;

                /* VERIFICA SI HAY UN DOCUMENTO, SI NO HAY FINALIZA EL METODO */
                if(!file.length){
                    return
                }

                /* EN CASO CONTRARIO ALMACENA EL PDF EN UNA VARIBLE */                    
                this.pdfUpload = file[0];
                $('#fileActa .file-name')[0].innerText = file[0].name;
            },

            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.acta.tipo_sesion = null;
                this.acta.fecha_sesion = null;
                this.acta.decanato.codigo = 1;
                this.acta.pdf =null;
                this.acta.resumen =null;
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

            /* METODO PARA REALIZAR EL REGISTRO */
            subirPDF() {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE SUBIR PDF */
                ActaDataService
                    .uploadPDF(this.pdfUpload)
                    .then(response => {

                        /* SI EL REGISTRO SE REALIZO CON ÉXITO, 
                         * CAPTURA LA RESPUETA DE LA API,
                         * GUARDA EL ID DEL PDF EN UNA VARIABLE
                         * Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        this.acta.pdf = response.data['field'];
                        console.log(this.acta.pdf);

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
                            this.crearDecanato();
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
                            this.subirPDF();
                        }
                    });
                }

            },
        },

    }
</script>

<style>
    .datetimepicker-dummy-wrapper {
        background-color: white;
        border: 1px solid #3298dc !important;
        border-radius: 4px;
    }
</style>