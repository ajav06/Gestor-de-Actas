<template>
    <div>
        <table class="table" id="decanatos">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Siglas</th>
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
    import DecanatoDataService from '../../services/DecanatoDataService';
    import Decanato from '../../models/Decanato'
    import ItemDecanato from './Item'

    export default {
        name: 'ListDecanato',
        components: {
            ItemDecanato
        },
        data() {
            return {
                items: [
                    new Decanato(1, 'Ciencias y Tecnología', 'DCyT', 'A') ,
                    new Decanato(2, 'HUMANIDADES Y ARTES', 'DEHA', 'A') ,
                    new Decanato(3, 'INGENIERIA CIVIL', 'DIC', 'A') ,
                    new Decanato(4, 'Ciencias y Tecnología', 'DCyT', 'A') ,
                    new Decanato(5, 'HUMANIDADES Y ARTES', 'DEHA', 'A') ,
                    new Decanato(6, 'INGENIERIA CIVIL', 'DIC', 'A') ,
                ]
            }
        },
        methods:{
            cargarDatos(){
                /* DecanatoDataService
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
                DecanatoDataService
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