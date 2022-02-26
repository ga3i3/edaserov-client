<template>
  <div class="not_found default">
    <div class="empty" v-if="$store.state.cart.length == 0">
      <img src="@/res/404.png" alt="" />
      <h3>Страница не найдена</h3>
      <v-btn depressed color="accent" to="/">Вернуться на главную</v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.not_found {
  height: 100%;
  max-width: 435px;
  margin: 0 auto;
  padding: 0 !important;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h3 {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>