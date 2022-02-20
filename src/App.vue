<template>
  <v-app>
    <AppHeader v-if="getSize <= 500" />
    <AppHeaderDesktop v-if="getSize > 500" />
    <AppHeaderBottomCats
      v-if="
        getSize > 500 &&
        $router.currentRoute.path != '/account' &&
        $router.currentRoute.path != '/profile' &&
        $router.currentRoute.path != '/checkout'
      "
    />
    <v-main :class="'main_layout ' + $router.currentRoute.name" v-if="!over">
      <router-view />
    </v-main>
    <AppBottomNav v-if="getSize < 500" />
    <AppNavigationDrawer v-if="getSize < 500" />
  </v-app>
</template>

<script>
import ScreenSizeDetector from "screen-size-detector";

import AppHeader from "./components/AppHeader.vue";
import AppBottomNav from "./components/AppBottomNav.vue";
import AppNavigationDrawer from "./components/AppNavigationDrawer.vue";

import AppHeaderDesktop from "./components/AppHeaderDesktop.vue";
import AppHeaderBottomCats from "./components/AppHeaderBottomCats.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppBottomNav,
    AppNavigationDrawer,

    AppHeaderDesktop,
    AppHeaderBottomCats,
  },
  data: () => ({
    width: "",
    over: false,
  }),
  computed: {
    getSize() {
      const screen = new ScreenSizeDetector();
      return screen.width;
    },
    premession() {
      const urls = ["checkout", "profile", "account"];
      if (this.$router.currentRoute.path != "/account") {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // console.log(localStorage.getItem("token"));
  },
  mounted() {},
};
</script>

<style lang="scss">
@media screen and (min-width: 500px) {
  @import "assets/styles.desktop.scss";
}
</style>