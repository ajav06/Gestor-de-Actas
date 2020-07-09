<template>
    <div class="container is-fluid">

        <h3 class="title is-3 has-text-centered">
            Gestionar Actas de Consejo
        </h3>

        <!-- SI NO ESTA REGISTRANDO, SOLO MUESTRA EL BOTON PARA REGISTRAR -->
        <div class="has-text-centered" v-if="!register">
            <button class="button is-info" @click="activarCampos()">Registar Acta</button>
        </div>

        <!-- EN CASO CONTRARIO, ACTIVA LOS CAMPOS PARA REGISTRAR -->
        <create-acta v-else v-on:cancelar-registro="activarCampos"/>
        <!-- 'v-on:cancelar-registro' ESPERA QUE EL COMPONENTE
            CREATE DECANATO EMITA LA SEÑAL DE CANCELAR, CUANDO ESTO PASA
            OCULTA LOS CAMPOS -->

        <br>
        <list-acta v-if="!register" />
    </div>
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