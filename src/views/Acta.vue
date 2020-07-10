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
                    Gestionar Actas de Consejo
                </p>
            </header>
            
            <div class="card-content">
                <!-- SI NO ESTA REGISTRANDO, SOLO MUESTRA EL BOTON PARA REGISTRAR -->
                <div class="has-text-centered" v-if="!register">
                    <b-button @click="activarCampos()"
                        icon-left="text-box-plus"
                        type="is-info">
                        Registar Acta
                    </b-button>
                </div>

                <!-- EN CASO CONTRARIO, ACTIVA LOS CAMPOS PARA REGISTRAR -->
                <create-acta v-else v-on:cancelar-registro="activarCampos"/>
                <!-- 'v-on:cancelar-registro' ESPERA QUE EL COMPONENTE
                    CREATE DECANATO EMITA LA SEÑAL DE CANCELAR, CUANDO ESTO PASA
                    OCULTA LOS CAMPOS -->

                <br>
                <list-acta v-if="!register" />
            </div>
        </div>
    </section>
</template>

<script>
    import ListActa from '../components/Acta/List';
    import CreateActa from '../components/Acta/Create'

    export default {
        name: 'Acta',
        components: {
            CreateActa,
            ListActa
        },
        computed:{
            /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
                RETORNA EL USUARIO ACTUAL */
            currentUser(){
                return this.$store.state.auth.user;
            },

        },
        mounted(){
            /* SI EL USUARIO NO ESTA ACTIVO LO REDIRIGE AL LOGIN */
            if(!this.currentUser){
                this.$router.push('/');
            }
        },
        data(){
            return {
                register:false
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