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
            default-sort="tipo"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">

                <b-table-column field="tipo" label="Tipo" sortable>
                    {{ props.row.tipo_sesion=='x' ? 'Extraordinario' : 'Ordinaria' }}
                </b-table-column>

                <b-table-column field="fecha" label="Fecha Sesión" sortable>
                    {{ props.row.fecha_sesion }}
                </b-table-column>

                <b-table-column field="resumen" label="Resúmen" sortable>
                    {{ props.row.resumen }}
                </b-table-column>

                <b-table-column field="decanato" label="Decanato" sortable v-if="showAdmin">
                    {{ props.row.decanato.nombre }}
                </b-table-column>

                <b-table-column custom-key="actions" class="is-actions-cell is-centered" label="Opciones">
                    <div class="buttons is-center">

                        <b-button @click="mensajeConfirmacion('d', props.row.pdf)"
                            type="is-warning" 
                            icon-left="folder-download">
                            PDF
                        </b-button>

                        <router-link :to="{name:'Acta.edit', params: {id: props.row.codigo}}" class="button is-info">
                            <b-icon icon="border-color"/> <span>Modificar</span>
                        </router-link>

                        <b-button @click="mensajeConfirmacion('e', props.row.codigo)"
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
                RETORNA VERDADERO SI ES ADMIN Y SI ESTA EL USUARIO ESTA ACTIVO */
            showAdmin() {
                if (this.currentUser && this.roleUser) {
                    return this.roleUser.includes('ROLE_ADMIN')
                }
                return false;
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
        methods:{
            eliminarActa(data) {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE ELIMINAR */
                ActaDataService
                    .remove(data)
                    .then(response => {

                        /* SI LA ELIMINACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        Swal.fire({
                            icon: 'success',
                            title: 'Acta eliminada con éxito.'
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

            descargarPDF(data) {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE GETPDF */
                ActaDataService
                    .getPDF(data)
                    .then(response => {
                        var blob = new Blob([response], { type: 'application/pdf' });

                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob); // for IE
                        }
                        else {
                            var fileURL = URL.createObjectURL(blob);
                            var newWin = window.open(fileURL);
                            newWin.focus();
                            newWin.reload();
                        }
                        
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
            mensajeConfirmacion(tipo, data) {
                
                // SI TIPO ES IGUAL A E(ELIMINAR) PREGUNTA LO SIGUIENTE
                if(tipo=='e'){
                    Swal.fire({
                        icon: 'question',
                        title: 'Eliminar Acta',
                        text: '¿Desea eliminar el Acta?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ELIMINAR ACTA */
                        if (result.value) {
                            this.eliminarActa(data);
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'question',
                        title: 'Descargar PDF',
                        text: '¿Desea descargar el Acta?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE DESCARGAR ACTA */
                        if (result.value) {
                            window.open('https://gestor-actas.herokuapp.com/api/pdf/descargarPDF/' + data, '_blank');
                        }
                    });
                }

            },
        }

    }
</script>
