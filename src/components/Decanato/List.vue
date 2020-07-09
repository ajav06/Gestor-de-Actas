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
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Decanato from '../../models/Decanato'
    import ItemDecanato from './Item'

    export default {
        name: 'ListDecanato',
        components: {
            ItemDecanato
        },
        data() {
            return {
                items: null
            }
        },
        mounted(){
            this.$nextTick(function () {
                $('#decanatos').DataTable({
                responsive: true,
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                lengthMenu: [3, 6, 10, 25, 50, 75, 100]
                });
            })

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