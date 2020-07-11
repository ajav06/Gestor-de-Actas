<template>
    <section class="section">
        <div class="card">

            <div class="card-content">

                <h4 class="title is-4 has-text-centered">
                    Actualizar Usuario
                </h4>

                <br>

                <b-field grouped group-multiline>

                    <b-field label="Cedula: " expanded>
                        <b-input type="number" v-model="usuario.cedula" placeholder="Cedula Usuario" required expanded></b-input>
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
                        <b-select placeholder="Seleccione el Decanato" v-model="usuario.decanato.codigo" expanded required>
                            <option v-for="item of decanatos" 
                                :key="item.codigo" :value="item.codigo">
                                {{ item.nombre }} - {{ item.siglas }}
                            </option>
                        </b-select>
                    </b-field>

                    <b-field label="Rol:" expanded>
                        <b-select placeholder="Seleccione el Rol" v-model="usuario.roles[0]" expanded required>
                            <option v-for="item of roles" 
                                :key="item.codigo" :value="item">
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
                            Actualizar
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
    </section>
</template>

<script>
    import UsuarioDataService from '@/services/UsuarioDataService'
    import DecanatoDataService from '@/services/DecanatoDataService'
    import Usuario from '@/models/Usuario'

    export default {
        name: 'UsuarioForm',
        data() {
            return {
                usuario: new Usuario(),
                id: this.$route.params.id,
                decanatos:[],
                roles:[],
            }
        },
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.usuario.cedula && this.usuario.password.length >= 8 && this.usuario.email)
                    return false;

                return true;
            },

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
            }

        },
        mounted(){

            if(this.id){
                /* DE LA CLASE ' UsuarioDataService' LLAMA LA FUNCIÓN DE BUSCAR */
                UsuarioDataService
                    .get(this.id)
                    .then(response => {

                        /* SI LA BUSQUEDA SE REALIZO CON ÉXITO, 
                        *  CAPTURA LA RESPUETA DE LA API
                        *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                        */
                        this.usuario = response.data;
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
            }

            /* SI EL USUARIO NO ESTA ACTIVO LO REDIRIGE AL LOGIN */
            if(!this.currentUser){
                this.$router.push('/');
            }

            /* SI EL USUARIO ESTA ACTIVO Y NO ES ADMIN LO REDIRIGE A LA PANTALLA DE ACTAS */
            if(this.currentUser && !this.roleUser.includes('ROLE_ADMIN')){
                this.$router.push('/actas')
            }

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
        methods: {
            /* METODO QUE VACIA LOS CAMPOS */
            vaciarCampos() {
                this.usuario = new Usuario();
                this.$router.push('/usuarios');
            },

            /* METODO PARA ACTUALIZAR */
            actualizarUsuario() {
                /* DE LA CLASE 'UsuarioDataService' LLAMA LA FUNCIÓN DE CREAR */
                UsuarioDataService
                    .update(this.usuario)
                    .then(response => {

                        /* SI LA ACTUALIZACIÖN SE REALIZO CON ÉXITO, 
                         *  CAPTURA LA RESPUETA DE LA API
                         *  Y MUESTRA UNA MODAL CONFIRMANDOLO Y LUEGO RECARGA LA PÁGINA
                         */

                        let message = response.data;

                        if(message['message'] == 'exito'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Se ha actualizado con éxito',
                            }).then(result => {
                                this.$router.push('/usuarios');
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: message['message']
                            });
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
            mensajeConfirmacion() {

                Swal.fire({
                    icon: 'question',
                    title: 'Actualizar Usuario',
                    text: '¿Desea actualizar el usurio?',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#48c774',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Sí',
                }).then(result => {

                    /* SI PRESIONA LA OPCIÓN 'SÍ' ACTIVA EL METODO DE ACTUALIZAR EL USUARIO */
                    if (result.value) {
                        this.actualizarUsuario();
                    }
                });

            },
        }

    }
</script>