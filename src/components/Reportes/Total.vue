<template>
    <section class="section">
        <div class="container is-fluid">
            <div class="tile is-ancestor">

                <plantilla-reporte :items=meses />

            </div>
        </div>
    </section>
    
</template>

<script>
import ReporteDataService from '@/services/ReporteDataService'
import PlantillaReporte from './Plantilla'

export default {
    name:'ReporteTotal',
    components:{
        PlantillaReporte
    },
    data(){
       return {
            meses:[],
       }
    },
    mounted(){

        ReporteDataService
            .getTotal()
            .then(response => {
                this.meses = response.data
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
            .catch(error => {
                /* Y SI HUBO UN ERROR
                *  CAPTURA LA RESPUETA DEL ERROR LA API
                *  Y MUESTRA UNA MODAL MOSTRANDO CUAL FUE EL ERROR
                */

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.data
                });
            });

    },
    methods:{

    }
}
</script>