<template>
  <v-card
    class="overflow-hidden app_header"
    v-show="$router.currentRoute.path != '/profile' && hideHeader"
  >
    <v-app-bar fixed color="white" elevate-on-scroll class="app_header">
      <v-btn
        icon
        depressed
        class="goback"
        v-if="$router.currentRoute.name != 'Home'"
        @click="goBack"
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >

      <v-toolbar-title class="d-flex align-items-center"
        ><div class="logo_wrap">
          <img src="../res/cutlery.png" alt="" />
        </div>
        <span class="site_name">{{
          $store.state.currentRoute
        }}</span></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
      <v-divider
        vertical
        v-if="
          $store.state.cart.length != 0 && $router.currentRoute.path == '/cart'
        "
      ></v-divider>
      <v-btn
        icon
        @click="$store.state.removeAllProducts = true"
        v-if="
          $store.state.cart.length != 0 && $router.currentRoute.path == '/cart'
        "
      >
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  name: "AppHeader",
  created() {},
  computed: {
    hideHeader() {
      if (
        window.location.href.includes("page") ||
        this.$router.currentRoute.path.includes("page")
      ) {
        return false;
      } else {
        return true;
      }
    },
    // getCurrentRouter() {
    //   if (this.$router.currentRoute.path == "/") {
    //     return "Edaserov";
    //   } else {
    //     return this.$store.state.currentRoute;
    //   }
    // },
    // goBack() {
    //   if (this.$router.currentRoute.path == "/") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
  },
  methods: {
    goBack() {
      if (this.$router.currentRoute.path == "/checkout") {
        this.$router.push("/cart");
      } else if (this.$router.currentRoute.path == "/account/orders") {
        this.$router.push("/account");
      } else {
        this.$store.state.value = 0;
        this.$router.push("/");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>