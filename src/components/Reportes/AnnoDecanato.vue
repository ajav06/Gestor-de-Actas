<template>
    <section class="section">
        <div class="container is-fluid">
            <b-field grouped group-multiline>

                <b-field expanded>
                    <b-select placeholder="Seleccione el Decanato" v-model="decanato" expanded required>
                        <option v-for="item of items" 
                            :key="item.codigo" :selected="item.codigo == 1" :value="item.codigo">
                            {{ item.nombre }} - {{ item.siglas }}
                        </option>
                    </b-select>
                </b-field>

                <b-field expanded>
                    <b-datepicker
                        type="month"
                        placeholder="Seleccione la fecha"
                        icon="calendar-today"
                        trap-focus
                        v-model="fecha">
                    </b-datepicker>
                </b-field>

                <b-field>
                    <b-button @click="buscarReporte"
                        type="is-success" 
                        icon-left="magnify"
                        :disabled="!decanato && !fecha">
                        Buscar
                    </b-button>
                </b-field>

            </b-field>

            <br>
            
            <plantilla-reporte :items=meses />

        </div>
    </section>
</template>

<script>
    import DecanatoDataService from '@/services/DecanatoDataService'
    import ReporteDataService from '@/services/ReporteDataService'
    import PlantillaReporte from './Plantilla'

    export default {
        name: 'ReporteAnnoDecanato',
        components:{
            PlantillaReporte
        },
        data() {
            return {
                items: [],
                decanato: null,
                meses: null,
                fecha: null
            }
        },
        mounted(){

            DecanatoDataService
                .list()
                .then(response => {
                    this.items = response.data
                }, error => {

                    /* 
                    *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
                    */
                   console.log(error);

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error
                    });
                });
        },
        
        computed:{
            valorFecha(){
                var date = new Date(Date.parse(this.fecha));
                return date.getFullYear();
            }
        },

        methods:{
            buscarReporte() {
                /* DE LA CLASE 'DecanatoDataService' LLAMA LA FUNCIÓN DE ELIMINAR */
                ReporteDataService
                    .getDecanatoAnno(this.decanato, this.valorFecha)
                    .then(response => {

                        /* SI LA ELIMINACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        this.meses = response.data;
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
        }

    }
</script>