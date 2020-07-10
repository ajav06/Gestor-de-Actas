<template>
    <div>
        <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="5">5 por Páginas</option>
            <option value="10">10 por Páginas</option>
            <option value="15">15 por Páginas</option>
            <option value="20">20 por Páginas</option>
        </b-select>

        <b-table
            :data="items"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="nombre"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">

                <b-table-column field="nombre" label="Nombre" sortable>
                    {{ props.row.nombre }}
                </b-table-column>

                <b-table-column field="siglas" label="Siglas" sortable>
                    {{ props.row.siglas }}
                </b-table-column>

                <b-table-column custom-key="actions" class="is-actions-cell is-centered" label="Opciones">
                    <div class="buttons is-right">

                        <router-link :to="{name:'Decanato.edit', params: {id: props.row.codigo}}" class="button is-info">
                            <b-icon icon="border-color"/> <span>Modificar</span>
                        </router-link>

                        <b-button @click="mensajeConfirmacion(props.row)"
                            type="is-danger" 
                            icon-left="delete">
                            Eliminar
                        </b-button>

                    </div>
                </b-table-column>
            </template>
        
        </b-table>
    </div>
</template>

<script>
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Decanato from '../../models/Decanato'

    export default {
        name: 'ListDecanato',
        data() {
            return {
                items: [],
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 5
            }
        },
        mounted(){

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
        
        methods:{
            eliminarDecanato(data) {
                /* DE LA CLASE 'DecanatoDataService' LLAMA LA FUNCIÓN DE ELIMINAR */
                DecanatoDataService
                    .remove(data.codigo)
                    .then(response => {

                        /* SI LA ELIMINACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        Swal.fire({
                            icon: 'success',
                            title: 'Decanato eliminado con éxito.'
                        }).then(result => {

                            window.location.reload(false);

                        });
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

            mensajeConfirmacion(data) {


                /* SI EL TIPO DE CONFIRMACIÓN ES E (ELIMINAR), MUESTRA EL SIGUIENTE MENSAJE */
                Swal.fire({
                    icon: 'question',
                    title: 'Eliminar Decanato',
                    text: '¿Desea eliminar el decanato?',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#48c774',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Sí',
                }).then(result => {

                    /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ELIMINAR DECANATO */
                    if (result.value) {
                        this.eliminarDecanato(data);
                    }
                });

            },
        }

    }
</script>