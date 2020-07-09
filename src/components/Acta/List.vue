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
                items: null
            }
        },
        computed:{
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL USUARIO ACTUAL */
            currentUser(){
                return this.$store.state.auth.user;
            },

            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL ROL DEL USUARIO ACTUAL, SI ESTA EL USUARIO ESTA ACTIVO */
            roleUser(){
                if(this.currentUser){
                    return this.currentUser.roles;
                }
            },

            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL DECANATO DEL USUARIO ACTUAL, SI ESTA EL USUARIO ESTA ACTIVO */
            decanatoUser(){
                if(this.currentUser){
                    return this.currentUser.decanato_id;
                }
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

            /* SI EL USUARIO ESTA ACTIVO Y ES ADMIN CARGA TODAS LAS ACTAS */
            if(this.currentUser && this.roleUser.includes('ROLE_ADMIN')){
                ActaDataService
                    .listAct()
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
            } else if(this.currentUser && !this.roleUser.includes('ROLE_ADMIN')){
                /* SINO  CARGA TODAS LAS ACTAS DE SU DECANATO*/
                ActaDataService
                    .listDecanAct(this.decanatoUser)
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