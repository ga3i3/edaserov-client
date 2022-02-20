<template>
  <header class="pc__masthead">
    <div class="top">
      <div class="wrap">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/contacts">Контакты</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li>
            <router-link to="/payment-delivery">Доставка и оплата</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <div class="logo">
        <img src="../res/logo.png" alt="" />
      </div>
      <div class="menu">
        <div class="search">
          <v-text-field
            placeholder="Поиск по товарам"
            filled
            dense
            :clearable="true"
            :hide-details="true"
            append-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </div>
      <div class="actions">
        <ul>
          <li class="login">
            <router-link :to="urlForAuth">{{ hasToken }}</router-link
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
};
</script>

<style lang="scss" scoped>
</style>