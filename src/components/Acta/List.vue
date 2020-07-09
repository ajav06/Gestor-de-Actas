<template>
    <div>
        <table class="table" id="actas">
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
                items: []
            }
        },
        mounted(){
            this.$nextTick(function () {
                $('#actas').DataTable({
                responsive: true,
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                lengthMenu: [3, 6, 10, 25, 50, 75, 100]
                });
            })

            ActaDataService
                .list()
                .then(response => {
                    this.items = response.data
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
        },
        methods:{
            cargarDatos(){
                ActaDataService
                    .list()
                    .then(response => {
                        this.items = response.data
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
                
            }
        }

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