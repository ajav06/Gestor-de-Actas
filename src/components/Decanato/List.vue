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
    import ItemDecanato from './Item'

    export default {
        name: 'ListDecanato',
        components: {
            ItemDecanato
        },
        data() {
            return {
                items: [{
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