<template>
    <div class="container is-fluid">
        <!-- SI NO ESTA REGISTRANDO, SOLO MUESTRA EL BOTON PARA REGISTRAR -->
        <div class="has-text-centered" v-if="!register">
            <button class="button is-info" @click="activarCampos()">Registar Decanato</button>
        </div>

        <!-- EN CASO CONTRARIO, ACTIVA LOS CAMPOS PARA REGISTRAR -->
        <create-decanato v-else v-on:cancelar-registro="activarCampos"/>
        <!-- 'v-on:cancelar-registro' ESPERA QUE EL COMPONENTE
            CREATE DECANATO EMITA LA SEÑAL DE CANCELAR, CUANDO ESTO PASA
            OCULTA LOS CAMPOS -->

        <br>
        <list-decanato />
    </div>
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