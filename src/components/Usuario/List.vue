<template>
    <div>
        <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="2">2 por Páginas</option>
            <option value="3">3 por Páginas</option>
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
            default-sort="id"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">

                <b-table-column field="cedula" label="Cedula" numeric centered sortable>
                    {{ props.row.cedula }}
                </b-table-column>              

                <b-table-column field="roles" label="Rol" sortable>
                    {{ nombreRol(props.row.roles[0]) }}
                </b-table-column>

                <b-table-column field="decanato" label="Decanato" sortable>
                    {{ nombreDecanato(props.row.decanato) }}
                </b-table-column>

                <b-table-column custom-key="actions" class="is-actions-cell is-centered" label="Opciones">
                    <div class="buttons is-right">

                        <router-link :to="{name:'Usuario.edit', params: {id: props.row.id}}" class="button is-info">
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
                items: [],
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 3
            }
        },
        mounted(){
            UsuarioDataService
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
            nombreRol(data){
                return data.rol
            },

            nombreDecanato(data){
                return data.nombre
            },

            eliminarUsuario(data) {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE ELIMINAR */
                UsuarioDataService
                    .remove(data.id)
                    .then(response => {

                        /* SI LA ELIMINACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario eliminado con éxito.'
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

            /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion(data) {

                Swal.fire({
                        icon: 'question',
                        title: 'Eliminar Usuario',
                        text: '¿Desea eliminar el usuario?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ELIMINAR USUARIO */
                        if (result.value) {
                            this.eliminarUsuario(data);
                        }
                    });

            },
        }

    }
</script>