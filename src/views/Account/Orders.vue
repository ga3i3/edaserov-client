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
      Мои заказы
    </h1>

    <div class="account_menu">
      <ul v-if="$store.state.user.orders.length != 0">
        <li v-for="(order, index) in $store.state.user.orders" :key="index">
          <div class="wrap">
            <span class="date">{{ getTime(order._timestamp) }}</span>
            <div class="name">
              <span class="id">#{{ order._it }}</span>
              <v-btn color="accent" icon>
                <v-icon> mdi-chevron-down </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="status">
            <span>{{ order.status ? "В процессе" : "Завершен" }}</span>
            <v-progress-linear
              indeterminate
              color="accent"
              v-if="order.status"
            ></v-progress-linear>
          </div>
        </li>
      </ul>
      <v-alert
        color="accent"
        type="info"
        class="mt-5"
        v-if="$store.state.user.orders.length == 0"
        >Здесь сейчас пусто, оформите заказ.</v-alert
      >
    </div>
  </div>
</template>

<script>
import ScreenSizeDetector from "screen-size-detector";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import "dayjs/locale/ru";
dayjs.locale("ru");

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
  methods: {
    getTime(time) {
      return dayjs(parseInt(time)).fromNow();
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

ul {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    border-top: 5px solid #ef7b4f;
    border-radius: 9px;

    .wrap {
      padding: 25px;
    }

    .date {
      font-family: "Exo 2", sans-serif;
      font-size: 14px;
      font-weight: 300;
    }
    .name {
      line-height: 1;
      margin: 7px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .id {
        font-size: 18px;
      }
    }

    .status {
      padding: 0 25px 25px;
    }
  }
}
</style>