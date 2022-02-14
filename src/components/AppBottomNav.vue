<template>
  <v-bottom-navigation
    v-model="$store.state.value"
    :input-value="active"
    color="primary"
    :fixed="true"
  >
    <v-btn to="/">
      <span>Главная</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/cart">
      <v-badge
        color="accent"
        :content="$store.state.cart.length"
        :value="$store.state.cart.length"
      >
        <span>Корзина</span>
        <v-icon>mdi-shopping</v-icon>
      </v-badge>
    </v-btn>

    <v-btn to="/profile">
      <span>Профиль</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn @click="$store.state.menu_drawer = true" class="open_drawer">
      <span>Меню</span>
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "AppBottomNav",
  data: () => ({
    active: true,
  }),
  created() {},
  computed: {
    getCountCart() {
      return this.$store.state.cart.length;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.v-badge {
  display: flex;
  flex-direction: column-reverse;
}

.open_drawer * {
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>