<template>
    <div>
        <table class="table" id="decanatos">
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Resúmen</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>

                <item-acta v-for="item of items" :key="item.codigo" :acta=item />

            </tbody>
        </table>
    </div>
</template>

<script>
    import ActaDataService from '../../services/ActaDataService';
    import Acta from '../../models/Acta'
    import ItemActa from './Item'

    export default {
        name: 'ListActa',
        components: {
            ItemActa
        },
        data() {
            return {
                items: [
                    new Acta(1, 'o', '2020-10-01', 'asdsdsd', 'JALABOLAS', 1, 'A'),
                    new Acta(2, 'e', '2020-10-01', 'asdsdsd', 'JALABOLAS', 3, 'A'),
                    new Acta(3, 'o', '2020-10-01', 'asdsdsd', 'JALABOLAS', 2, 'A'),
                    new Acta(4, 'e', '2020-10-01', 'asdsdsd', 'JALABOLAS', 1, 'A'),
                    new Acta(5, 'o', '2020-10-01', 'asdsdsd', 'JALABOLAS', 3, 'A'),
                    new Acta(6, 'e', '2020-10-01', 'asdsdsd', 'JALABOLAS', 2, 'A'),
                ]
            }
        },
        methods:{
            cargarDatos(){
                /* ActaDataService
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
                ActaDataService
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