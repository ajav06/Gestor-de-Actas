<template>
    <div class="card crear">

        <div class="card-content">

            <h4 class="title is-4 has-text-centered">
                Registrar Usuario
            </h4>

            <br>

            <b-field grouped group-multiline>

                <b-field label="Cedula: " expanded>
                    <b-input type="number" v-model="usuario.username" placeholder="Cedula Usuario" required expanded></b-input>
                </b-field>

                <b-field label="Contraseña:" expanded>
                    <b-input type="password" placeholder="Contraseña Usuario" v-model="usuario.password" required expanded password-reveal minlength="8"></b-input>
                </b-field>

            </b-field>

            <b-field grouped group-multiline>

                <b-field label="Correo Electrónico: " expanded>
                    <b-input type="email" v-model="usuario.email" placeholder="Email Usuario" required expanded></b-input>
                </b-field>

                <b-field label="Decanato:" expanded>
                    <b-select placeholder="Seleccione el Decanato" v-model="usuario.decanato_id" expanded required>
                        <option v-for="item of decanatos" 
                            :key="item.codigo" :selected="item.codigo == 1" :value="item.codigo">
                            {{ item.nombre }} - {{ item.siglas }}
                        </option>
                    </b-select>
                </b-field>

                <b-field label="Rol:" expanded>
                    <b-select placeholder="Seleccione el Rol" v-model="usuario.rol" expanded required>
                        <option v-for="item of roles" 
                            :key="item.codigo" :selected="item.id == 1" :value="item.id">
                            {{ item.rol }}
                        </option>
                    </b-select>
                </b-field>

            </b-field>

            <b-field grouped group-multiline>
                <p class="control">
                    <b-button @click="mensajeConfirmacion()"
                        type="is-success" 
                        icon-left="check"
                        :disabled="camposVacios">
                        Registar
                    </b-button>
                </p>
                <p class="control">
                    <b-button @click="vaciarCampos()"
                        type="is-warning" 
                        icon-left="close">
                        Cancelar
                    </b-button>
                </p>
            </b-field>
        </div>

    </div>
</template>

<script>
    import UsuarioDataService from '../../services/UsuarioDataService'
    import DecanatoDataService from '../../services/DecanatoDataService'
    import Usuario from '../../models/Usuario'

    export default {
        name: 'CreateUsuario',
        data() {
            return {
                usuario: new Usuario(),
                decanatos:[],
                roles:[]
            }
        },
        mounted() {
            DecanatoDataService
                .list()
                .then(response => {
                    this.decanatos = response.data
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

            UsuarioDataService
                .listRole()
                .then(response => {
                    this.roles = response.data
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
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.usuario.username && this.usuario.password.length >= 8 && this.usuario.email)
                    return false;

                return true;
            }
        },
        methods: {
            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.usuario = new Usuario();
                this.$emit('cancelar-registro'); /* EMITE LA SEÑAL DE CANCELAR REGISTRO */
            },

            /* METODO PARA REALIZAR EL REGISTRO */
            crearUsuario() {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE CREAR */
                this.usuario.setRol();
                UsuarioDataService
                    .create(this.usuario)
                    .then(response => {

                        /* SI EL REGISTRO SE REALIZO CON ÉXITO, 
                        *  CAPTURA LA RESPUETA DE LA API
                        *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                        */

                        Swal.fire({
                            icon: 'success',
                            title: 'Se ha registrado con éxito',
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
            mensajeConfirmacion() {

                Swal.fire({
                    icon: 'question',
                    title: 'Registrar Decanato',
                    text: '¿Desea registrar el usuario?',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#48c774',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Sí',
                }).then(result => {

                    /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE REGISTRAR EL USUARIO */
                    if (result.value) {
                        this.crearUsuario();
                    }
                });

            },
        },

    }
</script>
