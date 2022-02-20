<template>
  <div class="account default">
    <h1>
      <v-btn
        depressed
        outlined
        v-if="getSize > 500"
        class="mr-5"
        @click="$router.push('/account')"
      >
        <v-icon left> mdi-chevron-left </v-icon>Назад</v-btn
      >
      My orders
    </h1>
  </div>
</template>

<script>
import ScreenSizeDetector from "screen-size-detector";

export default {
  name: "Orders",
  created() {
    this.$store.state.currentRoute = "Мои заказы";
  },
  computed: {
    getSize() {
      const screen = new ScreenSizeDetector();
      return screen.width;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
</style>