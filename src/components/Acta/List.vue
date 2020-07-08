<template>
    <div>
        <table class="table" id="decanatos">
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Decanato</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>

                <item-decanato v-for="item of items" :key="item.codigo" :decanato=item />

            </tbody>
        </table>
    </div>
</template>

<script>
    import TableDataService from '../../services/DecanatoDataService';
    import ItemDecanato from './Item'

    export default {
        name: 'ListDecanato',
        components: {
            ItemDecanato
        },
        data() {
            return {
                items: [
                    {
                        codigo: 3,
                        tipo_sesion: 'o',
                        fecha_sesion: '2020-10-01',
                        decanato:{
                            codigo: 1,
                        },
                        pdf: 'akkaslkalsk',
                        resumen: 'JALABOLAS',
                        estatus: 'A'
                    },
                    {
                        codigo: 2,
                        tipo_sesion: 'o',
                        fecha_sesion: '2020-10-01',
                        decanato:{
                            codigo: 1,
                        },
                        pdf: 'akkaslkalsk',
                        resumen: 'JALABOLAS',
                        estatus: 'A'
                    },
                    {
                        codigo: 3,
                        tipo_sesion: 'o',
                        fecha_sesion: '2020-10-01',
                        decanato:{
                            codigo: 1,
                        },
                        pdf: 'akkaslkalsk',
                        resumen: 'JALABOLAS',
                        estatus: 'A'
                    },
                    {
                        codigo: 4,
                        tipo_sesion: 'o',
                        fecha_sesion: '2020-10-01',
                        decanato:{
                            codigo: 1,
                        },
                        pdf: 'akkaslkalsk',
                        resumen: 'JALABOLAS',
                        estatus: 'A'
                    },
                ]
            }
        },
        methods:{
            cargarDatos(){
                /* TableDataService
                    .list()
                    .then(response => {
                        items = response.data
                    })
                    .catch(error => {
                        console.log(error.response.data);      

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.response.data
                        });
                    }); */
                
            }
        },
        created(){
            this.cargarDatos();
        }
        /* 
            mounted(){
                TableDataService
                    .list()
                    .then(response => {
                        items = response.data
                    })
                    .catch(error => {
                        console.log(error.response.data);      

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.response.data
                        });
                    });
            },
         */

    }
</script>

<style>
    .table {
        width: 100%;
        border-radius: 1ex;
        background-color: #79ceed;
    }

    td {
        text-align: center !important;
        vertical-align: middle !important;
    }

    table.dataTable thead .sorting:after,
    table.dataTable thead .sorting_asc:after,
    table.dataTable thead .sorting_asc_disabled:after,
    table.dataTable thead .sorting_desc:after,
    table.dataTable thead .sorting_desc_disabled:after {
        font-family: 'Font Awesome\ 5 Free' !important;
    }
</style>