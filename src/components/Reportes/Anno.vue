<template>
    <section class="section">
        <div class="container is-fluid">
            <b-field grouped group-multiline>

                <b-field>
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
                        :disabled="!fecha">
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
    import ReporteDataService from '@/services/ReporteDataService'
    import PlantillaReporte from './Plantilla'

    export default {
        name: 'ReporteAnno',
        components:{
            PlantillaReporte
        },
        data() {
            return {
                items: [],
                fecha: null,
                meses: null
            }
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
                    .getAnno(this.valorFecha)
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