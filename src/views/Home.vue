<template>
    <section class="hero is-fullheight" id="login">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-7-tablet is-5-desktop is-5-widescreen">
                        <form action="" class="box">

                            <h4 class="subtitle is-4 has-text-centered has-text-grey-dark">Inicar sesión</h4>

                            <hr>

                            <b-field>
                                <b-input placeholder="Nombre de Usuario" 
                                        v-model="user.username" required></b-input>
                            </b-field>

                            <b-field>
                                <b-input placeholder="Contraseña de Usuario"
                                    type="password" 
                                        v-model="user.password" required></b-input>
                            </b-field>

                            <b-field>
                                <b-button @click="loginA()"
                                    type="is-success" 
                                    icon-left="login"
                                    :disabled="camposVacios" expanded>
                                    Iniciar Sesión
                                </b-button>
                            </b-field>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Usuario from '../models/Usuario'

    export default {
        data() {
            return {
                user: new Usuario(),
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

<style lang="scss">
    @media screen and (min-width: 1024px) {
        #login {
            margin-right: 14rem !important;
        }
    }

  @media screen and (max-width: 1023px) {
    #login {
      margin-right: 4.5em !important;
    }
  }
</style>