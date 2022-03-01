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
      <ul v-if="orders.length != 0" class="orders">
        <li v-for="(order, index) in orders" :key="index">
          <div class="wrap">
            <span class="date">{{ getTime(order._timestamp) }}</span>
            <div class="name">
              <span class="id">#{{ order._it }}</span>
              <div class="more">
                <div class="price">
                  {{
                    order.discount
                      ? currency(order.discount)
                      : currency(order.total)
                  }}
                </div>
                <v-btn
                  color="accent"
                  icon
                  @click="orders[index].view = !orders[index].view"
                >
                  <v-icon> mdi-chevron-down </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="dropdown" v-show="orders[index].view">
            <ul>
              <li v-for="(item, index) in order.cart" :key="index">
                <p>
                  <b>×{{ item.quantity }}</b> {{ item.name }}
                </p>
              </li>
            </ul>
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
      <v-alert color="accent" type="info" class="mt-5" v-if="orders.length == 0"
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
  data: () => ({
    orders: [],
  }),
  created() {
    this.$store.state.currentRoute = "Мои заказы";
    this.orders = this.$store.state.user.orders.map((element) => ({
      ...element,
      view: false,
    }));
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
    currency(currency) {
      const total_format = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(currency);

      return total_format;
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

ul.orders {
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
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

    .more {
      display: flex;
      align-items: center;
      .price {
        margin-right: 10px;
        font-family: "Exo 2", sans-serif;
        font-size: 20px;
      }
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
        font-family: "Exo 2", sans-serif;
        font-size: 18px;
      }
    }

    .status {
      padding: 0 25px 25px;
    }
  }
}

.dropdown {
  ul {
    list-style: none;
  }

  * {
    font-family: "Exo 2", sans-serif;
  }
}
</style>