<template>
  <div class="success_order default">
    <div class="wrap">
      <img src="../res/success.png" alt="" />
      <h3>Мы приняли ваш заказ</h3>
      <p>Спасибо что выбрали нас</p>
      <v-btn depressed color="accent" to="/">Сделать еще заказ</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  data: () => ({}),
  created() {
    this.$store.state.currentRoute = "Оформление заказа";
    this.$store.state.cart = [];
    this.$store.state.quantityToggle = [];
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.success_order {
  height: 100%;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

img {
  height: 297px;
  object-fit: contain;
}

h3 {
  font-size: 24px;
}

.v-btn {
  border-radius: 9px;
}
</style>