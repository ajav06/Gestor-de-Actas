<template>
    <section class="section">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title is-centered title is-4">
                    <b-icon
                        icon="domain"
                        size="is-small"
                        style="margin-right: 0.5em;">
                    </b-icon>
                    Gestionar Decanatos
                </p>
            </header>
            
            <div class="card-content">
                <!-- SI NO ESTA REGISTRANDO, SOLO MUESTRA EL BOTON PARA REGISTRAR -->
                <div class="has-text-centered" v-if="!register">
                    <b-button @click="activarCampos()"
                        icon-left="domain-plus"
                        type="is-info">
                        Registar Decanato
                    </b-button>
                </div>

                <!-- EN CASO CONTRARIO, ACTIVA LOS CAMPOS PARA REGISTRAR -->
                <create-decanato v-else v-on:cancelar-registro="activarCampos"/>
                <!-- 'v-on:cancelar-registro' ESPERA QUE EL COMPONENTE
                    CREATE DECANATO EMITA LA SEÑAL DE CANCELAR, CUANDO ESTO PASA
                    OCULTA LOS CAMPOS -->

                <br>
                <list-decanato />
            </div>
        </div>
    </section>
</template>

<script>
    import ListDecanato from '../components/Decanato/List';
    import CreateDecanato from '../components/Decanato/Create'

    export default {
        name: 'Decanato',
        components: {
            CreateDecanato,
            ListDecanato,
        },
        data(){
            return {
                register:false
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
            }
        },
        mounted(){
            /* SI EL USUARIO NO ESTA ACTIVO LO REDIRIGE AL LOGIN */
            if(!this.currentUser){
                this.$router.push('/');
            }

            /* SI EL USUARIO ESTA ACTIVO Y NO ES ADMIN LO REDIRIGE A LA PANTALLA DE ACTAS */
            if(this.currentUser && !this.roleUser.includes('ROLE_ADMIN')){
                this.$router.push('/actas')
            }
        },
        methods:{
             /* ACTIVA LOS CAMPOS PARA REALIZAR LA MODIFICACIÓN */
            activarCampos() {
                this.register = !this.register;
            },
        }

    }
</script>

<style>

</style>