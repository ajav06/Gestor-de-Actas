<template>
    <section class="section">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title is-centered title is-4">
                    <b-icon
                        icon="finance"
                        size="is-small"
                        style="margin-right: 0.5em;">
                    </b-icon>
                    Reportes
                </p>
            </header>

            <b-tabs type="is-boxed">
                <b-tab-item label="Reporte Total" icon="file-document">

                    <reporte-total/>

                </b-tab-item>

                <b-tab-item label="Decanatos" icon="bank">

                    
                    <reporte-decanato/>

                </b-tab-item>

                <b-tab-item label="Años" icon="calendar">

                    <reporte-anno/>

                </b-tab-item>

                <b-tab-item label="Años por Decanatos" icon="calendar-range-outline">

                    <reporte-anno-decanato/>

                </b-tab-item>
            </b-tabs>

        </div>
    </section>
</template>

<script>
import ReporteTotal from '@/components/Reportes/Total'
import ReporteDecanato from '@/components/Reportes/Decanato'
import ReporteAnno from '@/components/Reportes/Anno'
import ReporteAnnoDecanato from '@/components/Reportes/AnnoDecanato'

export default {
    name:'Reportes',
    components:{
        ReporteTotal,
        ReporteDecanato,
        ReporteAnno,
        ReporteAnnoDecanato
    },
    computed: {
        /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
            RETORNA EL USUARIO ACTUAL */
        currentUser() {
            return this.$store.state.auth.user;
        },

        /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
            RETORNA EL ROL DEL USUARIO ACTUAL, SI ESTA EL USUARIO ESTA ACTIVO */
        roleUser() {
            if (this.currentUser) {
                return this.currentUser.roles;
            }
        },

        /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
            RETORNA VERDADERO SI ES ADMIN Y SI ESTA EL USUARIO ESTA ACTIVO */
        showAdmin() {
            if (this.currentUser && this.roleUser) {
                return this.roleUser.includes('ROLE_ADMIN')
            }
            return false;
        },

        /* ESTE ES UN METODO QUE SIEMPRE ESTA ACTIVO, 
            RETORNA VERDADERO SI ES ADMIN Y SI ESTA EL USUARIO ESTA ACTIVO */
        showSecretario() {
            if (this.currentUser && this.roleUser) {
                return this.roleUser.includes('ROLE_SECRETARIO')
            }
            return false;
        },
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
}
</script>