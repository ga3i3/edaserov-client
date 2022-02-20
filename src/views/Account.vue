<template>
  <div class="account default">
    <MobileLayout />
  </div>
</template>

<script>
import MobileLayout from "../components/Account/MobileLayout.vue";

export default {
  name: "Account",
  components: {
    MobileLayout,
  },
  data: () => ({}),
  created() {
    this.$store.state.currentRoute = "Личный кабинет";
    this.$store.state.value = 2;

    setTimeout(() => {
      if (Object.keys(this.$store.state.user).length == 0) {
        this.$router.push("/profile");
      }
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
</style>