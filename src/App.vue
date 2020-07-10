<template>
  <div id="app">

    <side-bar></side-bar>
    <router-view />

  </div>
</template>

<script>
  import SideBar from '@/components/SideBar'

  export default {
    components: {
      SideBar
    },
  }
</script>

<style lang="scss">
  @media screen and (min-width: 1024px) {
    body {
      padding-left: 14rem !important;
    }
  }

  @media screen and (max-width: 1023px) {
    body {
      padding-left: 4.5em !important;
    }
  }
  // Import Bulma's core
@import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #4099FF;
  $primary-invert: findColorInvert($primary);
  $twitter: #8c67ef;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert),
      "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  .is-light{
    background-color: #c6d4e6 !important;
  }
  // #f5f5f5

  .card, .box{
    background-color: #e9eff3 !important;
  }

  .table, .meses, .crear {
    background-color: #d7ecf0 !important;
  }

  html{
    background-color: $primary !important;
  }

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>