<template>
  <v-app>
    <AppHeader v-if="!over" />
    <v-main :class="'main_layout ' + $router.currentRoute.name" v-if="!over">
      <router-view />
    </v-main>
    <AppBottomNav v-if="!over" />
    <AppNavigationDrawer v-if="!over" />

    <v-dialog v-model="over" persistent max-width="400">
      <v-card elevation="0">
        <v-alert type="warning"
          >Просим прощение, идёт технические работы...</v-alert
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ScreenSizeDetector from "screen-size-detector";

import AppHeader from "./components/AppHeader.vue";
import AppBottomNav from "./components/AppBottomNav.vue";
import AppNavigationDrawer from "./components/AppNavigationDrawer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppBottomNav,
    AppNavigationDrawer,
  },
  data: () => ({
    over: false,
  }),
  created() {
    // const screen = new ScreenSizeDetector();
    // if (screen.width > 500) {
    //   this.over = true;
    // }
  },
  mounted() {},
};
</script>