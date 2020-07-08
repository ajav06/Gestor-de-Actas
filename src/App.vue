<template>
  <section id="app" class="hero is-fullheight is-info">

    <div class="hero-head">
      <nav class="navbar">
        <div class="navbar-brand">

          <a role="button" class="navbar-burger" aria-label="menu" data-target="navMenu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" id="navMenu">
          <aside class="menu">
            <p class="menu-label">
              Gestionar
            </p>
            <ul class="menu-list">
              <li>
                <router-link to="/decanatos">Decanato</router-link>
              </li>
              <li>
                <router-link to="/usuarios">Usuario</router-link>
              </li>
              <li>
                <router-link to="/actas">Actas</router-link>
              </li>
            </ul>
          </aside>
        </div>
      </nav>
    </div>

    <div class="hero-body">
      <aside class="menu column is-2">
        <p class="menu-label">
          Gestionar
        </p>
        <ul class="menu-list">
          <li>
            <router-link to="/decanatos">Decanato</router-link>
          </li>
          <li>
            <router-link to="/usuarios">Usuario</router-link>
          </li>
          <li>
            <router-link to="/actas">Actas</router-link>
          </li>
        </ul>
      </aside>

      <router-view />
    </div>

  </section>
</template>

<script>

  export default {
    mounted() {
      // Check for click events on the navbar burger icon
      $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

      });

      $('.table').DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        "lengthMenu": [3, 6, 10, 25, 50, 75, 100]
      });

    },

    updated: function () {

      this.$nextTick(function () {
        $('.table').DataTable({
          "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
          },
          "lengthMenu": [3, 6, 10, 25, 50, 75, 100]
        });
      })

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
            this.$store.dispatch('logoutAction')
          }
        });

      }
    }
  }
</script>

<style>
  @import '../node_modules/bulma/css/bulma.css';
  @import '../node_modules/bulma-calendar/dist/css/bulma-calendar.min.css';

  @media screen and (min-width: 1024px) {
    .hero-head {
      display: none !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .hero-body .menu {
      display: none !important;
      background-color: #c5e7 !important;
    }
  }

  .hero.is-info .navbar-menu {
    background-color: #9dc2e5;
  }

  .hero-body {
    padding: 10px;
    align-items: baseline !important;
  }

  .container {
    align-self: center !important;
  }

  /*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
*/
  .menu-list a {
    color: hsl(0, 0%, 40%) !important;
  }

  .menu-list a.router-link-exact-active {
    font-weight: bold !important;
    color: #6f89a2 !important;
    border-radius: 2px;
  }

  .menu-list a:focus,
  .menu-list a:focus-within,
  .menu-list a:hover {
    background-color: #79ceed !important;
    border-radius: 2px;
  }

  /* .navbar-end a:hover {
    background-color: #79ceed;
    border-radius: 2px;
  } */

  .hero.is-info,
  .hero.is-info .title {
    background-color: #c5e7f1;
    color: hsl(0, 0%, 40%);

  }

  .box {
    /* background-color: #c5e7f1; 
    background-color: #60efdb;
    color:#9dc2e5*/
    background-color: #79ceed;
  }

  .is-success-light {
    background-color: #60efdb
  }
</style>