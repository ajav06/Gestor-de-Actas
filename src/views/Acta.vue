<template>
    <div class="container is-fluid">
        <!-- SI NO ESTA REGISTRANDO, SOLO MUESTRA EL BOTON PARA REGISTRAR -->
        <div class="has-text-centered" v-if="!register">
            <button class="button is-info" @click="activarCampos()">Registar Acta</button>
        </div>

        <!-- EN CASO CONTRARIO, ACTIVA LOS CAMPOS PARA REGISTRAR -->
        <create-acta v-else v-on:cancelar-registro="activarCampos"/>
        <!-- 'v-on:cancelar-registro' ESPERA QUE EL COMPONENTE
            CREATE DECANATO EMITA LA SEÑAL DE CANCELAR, CUANDO ESTO PASA
            OCULTA LOS CAMPOS -->

        <!-- <br>
        <list-decanato /> -->
    </div>
</template>

<script>
    import CreateActa from '../components/Acta/Create'

    export default {
        name: 'Acta',
        components: {
            CreateActa,
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