<template>
  <v-app :class="workTime ? 'working' : 'closed'">
    <!-- <Alert /> -->
    <AppHeader v-if="getSize <= 500" />
    <AppHeaderDesktop v-if="getSize > 500" />
    <CategoriesSlideDesktop v-if="premession" />
    <v-main :class="'main_layout ' + $router.currentRoute.name" v-if="!over">
      <router-view />
    </v-main>
    <AppBottomNav v-if="getSize < 500" />
    <AppNavigationDrawer v-if="getSize < 500" />

    <AppFooter v-if="getSize > 500" />

    <v-dialog v-model="modal" persistent max-width="490">
      <div class="wrap store_closed">
        <img src="./res/sad.png" alt="" />
        <strong>Время заказа истекло!</strong>
        <p>
          Предложение действует <br />
          с
          {{
            Object.keys($store.state.params).length != 0
              ? $store.state.params.working_time[0] +
                ":00" +
                " до " +
                $store.state.params.working_time[1] +
                ":00"
              : ""
          }}
          в будние дни.
        </p>
        <v-btn text @click="modal = false">Закрыть</v-btn>
      </div>
    </v-dialog>

    <v-dialog v-model="closed" persistent max-width="490">
      <div class="wrap store_closed">
        <img src="./res/close.png" alt="" />
        <strong>Не принимаем заказы!</strong>
        <p>На данный момент мы не принимаем заказы, вернитесь чуть позже</p>
        <v-btn text @click="closed = false">Закрыть</v-btn>
      </div>
    </v-dialog>

    <div :class="workTime ? 'work' : 'close'"></div>
  </v-app>
</template>

<script>
import ScreenSizeDetector from "screen-size-detector";

import Alert from "./components/Alert.vue";
import AppHeader from "./components/AppHeader.vue";
import AppBottomNav from "./components/AppBottomNav.vue";
import AppNavigationDrawer from "./components/AppNavigationDrawer.vue";

import AppHeaderDesktop from "./components/AppHeaderDesktop.vue";
import CategoriesSlideDesktop from "./components/Categories/CategoriesSlideDesktop.vue";

import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    Alert,
    AppHeader,
    AppBottomNav,
    AppNavigationDrawer,

    AppHeaderDesktop,
    CategoriesSlideDesktop,

    AppFooter,
  },
  data: () => ({
    width: "",
    over: false,
    access: false,
    modal: false,
    closed: false,
  }),
  beforeCreate() {
    this.$store.commit("params");
  },
  beforeMount() {
    // const date = new Date();
    // if (Object.keys(this.$store.state.params).length != 0) {
    //   // setTimeout(() => {
    //   if (
    //     date.getDay() > 0 &&
    //     date.getDay() < 6 &&
    //     date.getHours() >= parseInt(this.$store.state.params.working_time[0]) &&
    //     date.getHours() <= parseInt(this.$store.state.params.working_time[1])
    //   ) {
    //     this.access = true;
    //   } else {
    //     this.modal = true;
    //   }
    //   // }, 1000);
    // }
    // setTimeout(() => {
    // console.log(this.$store.state.params.working_time);
    // }, 2500);
  },
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
    workTime() {
      const date = new Date();

      if (Object.keys(this.$store.state.params).length != 0) {
        if (this.$store.state.params.working == true) {
          if (
            date.getDay() > 0 &&
            date.getDay() < 6 &&
            date.getHours() >=
              parseInt(this.$store.state.params.working_time[0]) &&
            date.getHours() <=
              parseInt(this.$store.state.params.working_time[1])
          ) {
            this.access = true;
            return true;
          } else {
            this.modal = true;
            return false;
          }
        } else {
          this.closed = true;
          return false;
        }

        // }, 1000);
      }
    },
  },
  methods: {},

  mounted() {},
};
</script>

<style lang="scss">
@media screen and (min-width: 500px) {
  @import "assets/styles.desktop.scss";
}

.store_closed {
  background-color: #fff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    max-width: 150px;
    margin-bottom: 25px;
  }

  strong {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>