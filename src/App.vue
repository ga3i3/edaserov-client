<template>
  <v-app>
    <AppHeader v-if="getSize <= 500" />
    <AppHeaderDesktop v-if="getSize > 500" />
    <CategoriesSlideDesktop v-if="premession" />
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
import CategoriesSlideDesktop from "./components/Categories/CategoriesSlideDesktop.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppBottomNav,
    AppNavigationDrawer,

    AppHeaderDesktop,
    CategoriesSlideDesktop,
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
      const screen = new ScreenSizeDetector().width;

      const urls = ["Home", "Cart"];
      const current = this.$router.currentRoute.path;
      if (
        screen > 500 &&
        urls.find((element) =>
          element.includes(this.$route.name) ? true : false
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {},
  created() {
    setTimeout(() => {
      console.log(this.$route.name);
    }, 2000);
  },
  mounted() {},
};
</script>

<style lang="scss">
@media screen and (min-width: 500px) {
  @import "assets/styles.desktop.scss";
}
</style>