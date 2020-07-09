<template>
    <tr>
        <td>
            <!-- SI NO ESTA MODIFICANDO, SOLO MUESTRA EL NOMBRE -->
            <p v-if="!update">
                {{ acta.tipo_sesion=='x' ? 'Extraordinario' : 'Ordinaria' }}
            </p>

            <!-- EN CASO CONTRARIO, ACTIVA EL CAMPO PARA MODIFICAR -->
            <div class="field" v-else>
                <div class="control">
                    <div class="select is-info is-fullwidth">
                        <select v-model="item.tipo_sesion">
                            <option value="o" :selected="item.tipo_sesion == 'o'">
                                Ordinaria
                            </option>
                            <option value="x" :selected="item.tipo_sesion == 'x'">
                                Extraordinaria
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </td>

        <td>
            <!-- SI NO ESTA MODIFICANDO, SOLO MUESTRA LAS SIGLAS -->
            <p v-if="!update">
                {{ acta.fecha_sesion }}
            </p>

            <!-- EN CASO CONTRARIO, ACTIVA EL CAMPO PARA MODIFICAR -->
            <div class="field" v-else>
                <div class="control">
                    <input type="date" ref="calend" id="calend">
                </div>
            </div>
        </td>

        <td>
            <!-- SI NO ESTA MODIFICANDO, SOLO MUESTRA LAS SIGLAS -->
            <p v-if="!update">
                {{ acta.resumen }}
            </p>

            <!-- EN CASO CONTRARIO, ACTIVA EL CAMPO PARA MODIFICAR -->
            <div class="field" v-else>
                <div class="control">
                    <textarea type="text" class="textarea" v-model="item.resumen"></textarea>
                </div>
            </div>
        </td>

        <td>
            <!-- SI NO ESTA MODIFICANDO, MUESTRA LAS OPCIONES A REALIZAR -->
            <div class="field is-grouped" v-if="!update">
                <div class="control">
                    <button class="button is-info" @click="activarCampos">Modificar</button>
                </div>

                <div class="control">
                    <button class="button is-danger" @click="mensajeConfirmacion('E')">Eliminar</button>
                </div>
            </div>

            <!-- EN CASO CONTRARIO, ACTIVA LAS OPCIONES DE ACEPTAR O CANCELAR LA MODIFICACIÓN -->
            <div class="field is-grouped" v-else>
                <div class="control">
                    <button class="button is-success" @click="mensajeConfirmacion('M')">Actualizar</button>
                </div>

                <div class="control">
                    <button class="button is-warning" @click="activarCampos">Cancelar</button>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    import bulmaCalendar from "../../../node_modules/bulma-calendar/dist/js/bulma-calendar";
    import ActaDataService from '../../services/ActaDataService';
    import Acta from '../../models/Acta'

    export default {
        name: 'ItemActa',
        props: ['acta'],
        data() {
            return {
                item: new Acta(),
                update: false /* BOOLEAN PARA VERIFICAR SI ESTA REALIZANDO UNA MODIFICACIÓN */
            }
        },
        updated(){
            const calendars = bulmaCalendar.attach('[type="date"]', {
                type: 'date',
                color: 'info',
                lang: 'es',
                startDate: new Date(this.item.fecha_sesion),
                dateFormat: 'YYYY-MM-DD'
            });
            
            calendars.forEach(calendar => {
                calendar.on('select', date => {
                    this.item.fecha_sesion = date.data.value()
                    console.log(this.item.fecha_sesion);
                });
            });
        },
        methods: {
            /* ACTIVA LOS CAMPOS PARA REALIZAR LA MODIFICACIÓN */
            activarCampos() {
                this.update = !this.update;
                this.item.codigo = this.acta.codigo;
                this.item.tipo_sesion = this.acta.tipo_sesion;
                this.item.fecha_sesion = this.acta.fecha_sesion;
                this.item.resumen = this.acta.resumen;
                this.item.decanato.codigo = this.acta.decanato.codigo;
                this.item.pdf = this.acta.pdf;
            },

            /* METODO PARA REALIZAR LA ACTUALIZACIÓN */
            actualizarActa() {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE ACTUALIZAR */
                ActaDataService
                    .update(this.item)
                    .then(response => {

                        /* SI LA ACTUALIZACIÓN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        Swal.fire({
                            icon: 'success',
                            title: 'Acta actualizada con éxito.'
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

            eliminarActa() {
                /* DE LA CLASE 'ActaDataService' LLAMA LA FUNCIÓN DE ELIMINAR */
                ActaDataService
                    .remove(this.acta.codigo)
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

            /* METODO DE MENSAJE DE CONFIRMACIÓN */
            mensajeConfirmacion(tipo) {

                /* SI EL TIPO DE CONFIRMACIÓN ES M (MODIFOCAR), MUESTRA EL SIGUIENTE MENSAJE */
                if (tipo == 'M') {
                    Swal.fire({
                        icon: 'question',
                        title: 'Actualizar Acta',
                        text: '¿Desea actualizar el acta?',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#48c774',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Sí',
                    }).then(result => {

                        /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ACTUALIZAR ACTA */
                        if (result.value) {
                            this.actualizarActa();
                        }
                    });
                }

                /* SI EL TIPO DE CONFIRMACIÓN ES E (ELIMINAR), MUESTRA EL SIGUIENTE MENSAJE */
                else if (tipo == 'E') {
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
                            this.eliminarActa();
                        }
                    });
                }

            },


        }

    }
</script>

<style>
    .datetimepicker-dummy-input{
        max-width: 100% !important;
    }
</style>