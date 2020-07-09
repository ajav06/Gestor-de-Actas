<template>
    <div>
        <table class="table" id="usuarios">
            <thead>
                <tr>
                    <th>Nombre de Usuario</th>
                    <th>Decanato</th>
                    <th>Rol</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>

                <item-usuario v-for="item of items" :key="item.id" :usuario=item />

            </tbody>
        </table>
    </div>
</template>

<script>
    import UsuarioDataService from '../../services/UsuarioDataService'
    import Usuario from '../../models/Usuario'
    import ItemUsuario from './Item'

    export default {
        name: 'ListUsuario',
        components: {
            ItemUsuario
        },
        data() {
            return {
                items: null
            }
        },
        mounted(){
            this.$nextTick(function () {
                $('#usuarios').DataTable({
                responsive: true,
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                lengthMenu: [3, 6, 10, 25, 50, 75, 100]
                });
            })

            UsuarioDataService
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