<template>
  <header class="pc__masthead">
    <div class="top">
      <div class="wrap">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li v-for="(page, index) in $store.state.pages" :key="index">
            <router-link :to="'/page/' + page.slug">{{
              page.name
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <div class="logo">
        <router-link to="/">
          <img src="../res/logo.png" alt="" />
        </router-link>
      </div>
      <div class="menu">
        <!-- <div class="search"> -->
        <!-- <v-text-field
            v-model="search"
            placeholder="Поиск по товарам"
            filled
            dense
            :clearable="true"
            :hide-details="true"
            append-icon="mdi-magnify"
            v-on:keyup.enter="onEnter"
            disabled
          ></v-text-field> -->

        <!-- </div> -->

        <div class="inform d-flex align-center">
          <v-btn text depressed href="mailto:help@edaserov.ru" color="accent">
            <v-icon left>mdi-email</v-icon>
            help@edaserov.ru
          </v-btn>
          <v-btn text depressed color="accent">
            <v-icon left>mdi-clock</v-icon>
            с 8:00 до 16:00
          </v-btn>
        </div>
      </div>
      <div class="actions">
        <ul>
          <li class="login">
            <router-link
              :to="$store.state.user.name != null ? '/account' : '/profile'"
              >Личный кабинет</router-link
            ><Icon icon="bi:person-fill" />
          </li>
          <li class="cart">
            <router-link class="cart" to="/cart">
              <Icon icon="bi:handbag" />
              <span class="count">{{ $store.state.cart.length }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  name: "AppHeaderDesktop",
  components: {
    Icon,
  },
  data: () => ({
    search: "",
  }),
  computed: {
    hasToken() {
      if (localStorage.getItem("token") !== null) {
        return "Личный кабинет";
      } else {
        return "Войти/Регистрация";
      }
    },
    urlForAuth() {
      if (localStorage.getItem("token") !== null) {
        return "/account";
      } else {
        return "/profile";
      }
    },
  },
  methods: {
    onEnter() {
      this.$router.push({
        name: "Search",
        query: {
          s: this.search,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>