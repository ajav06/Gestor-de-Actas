<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" class="box">

                    <h4 class="subtitle is-4 has-text-centered has-text-grey-dark">Inicar sesión</h4>

                    <div class="field">
                        <div class="control">
                            <input type="text" class="input" 
                                placeholder="Nombre de Usuario" 
                                v-model="user.username">
                        </div>
                        <div class="control">
                            <input type="password" class="input" 
                                placeholder="Contraseña" 
                                v-model="user.password">
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button 
                                class="button is-fullwidth is-success" 
                                @click="loginA()"
                                :disabled="camposVacios">
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Usuario from '../models/Usuario'

    export default {
        data() {
            return {
                user: new Usuario('','', '', '', ''),
                loading: false
            }
        },
        computed: {
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, VERIFICANDO QUE LOS 
               CAMPOS ESTAN VACIOS O NO */
            camposVacios() {
                if (this.user.username && this.user.password)
                    return false;

                return true;
            },

            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                QUE RETORNA EL ESTATUS DEL USUARIO */
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            /* SI EL USUARIO ESTA ACTIVO LO ENVIA A LA PANTALLA DE ACTAS */
            if (this.loggedIn){
                this.$router.push('/actas');
            }
        },
        methods: {
            loginA() {
                this.$store.dispatch('auth/login', this.user)
                    .then(() => {
                        this.$router.push('/actas');
                    });
                this.user = new Usuario('', '', '');
            },
        }
    }
</script>