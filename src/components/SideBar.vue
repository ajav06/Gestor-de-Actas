<template>
    <b-sidebar :fullheight="true" type="is-light" position="absolute" :mobile="mobile" :expand-on-hover="true"
         open v-show="currentUser">
        <b-menu class="is-custom-mobile">
            <b-menu-list label="General">
                <b-menu-item icon="home" label="Inicio" tag="router-link" to="/reportes" v-if="showAdmin"></b-menu-item>
                <b-menu-item icon="home" label="Inicio" tag="router-link" to="/actas" v-else></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Gestión">
                <b-menu-item icon="domain" label="Decanatos" tag="router-link" to="/decanatos" v-show="showAdmin"></b-menu-item>
                <b-menu-item icon="file-document-edit" label="Actas" tag="router-link" to="/actas"></b-menu-item>
                <b-menu-item icon="account-multiple" label="Usuarios" tag="router-link" to="/usuarios" v-show="showAdmin"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Accción">
                <b-menu-item icon="logout" label="Cerrar Sesión" @click="cerrarSesion"></b-menu-item>
            </b-menu-list>
        </b-menu>

    </b-sidebar>
</template>

<script>
    export default {
        name: 'SideBar',
        data() {
            return {
                mobile: "reduce",
            }
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

        methods: {
            cerrarSesion() {

                Swal.fire({
                icon: 'info',
                title: 'Cerrar sesión',
                text: '¿Desea cerrar sesión?',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#48c774',
                cancelButtonText: 'No',
                confirmButtonText: 'Sí',

                }).then(result => {
                if (result.value) {
                    this.$store.dispatch('auth/logout');
                    this.$router.push('/');
                }
                });

            }
        }

    }
</script>

<style lang="scss">
    .sidebar-content {
        padding: 1rem;
    }

    @media screen and (max-width: 1023px) {
        .b-sidebar {
            .sidebar-content {
                &.is-mini-mobile {

                    &:not(.is-mini-expand),
                    &.is-mini-expand:not(:hover) {
                        .menu-list {
                            li {
                                a {
                                    span:nth-child(2) {
                                        display: none;
                                    }
                                }

                                ul {
                                    padding-left: 0;

                                    li {
                                        a {
                                            display: inline-block;
                                        }
                                    }
                                }
                            }
                        }

                        .menu-label:not(:last-child) {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .b-sidebar {
            .sidebar-content {
                &.is-mini {

                    &:not(.is-mini-expand),
                    &.is-mini-expand:not(:hover) {
                        .menu-list {
                            li {
                                a {
                                    span:nth-child(2) {
                                        display: none;
                                    }
                                }

                                ul {
                                    padding-left: 0;

                                    li {
                                        a {
                                            display: inline-block;
                                        }
                                    }
                                }
                            }
                        }

                        .menu-label:not(:last-child) {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .sidebar-content {
            max-width: 13rem !important;
        }
    }

    a.router-link-exact-active {
      font-weight: bold !important;
      color: #6f89a2 !important;
      border-radius: 2px;
    }

    a:focus,
    a:focus-within,
    a:hover {
        background-color: #79ceed !important;
        border-radius: 2px;
    }
</style>