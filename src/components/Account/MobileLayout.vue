<template>
  <div class="account_menu">
    <div class="user">
      <img src="../../res/user-image.png" alt="" />
      <div class="inf">
        <div class="phone">{{ phoneFormat($store.state.user.phone) }}</div>
        <div class="name">{{ $store.state.user.name }}</div>
      </div>
    </div>
    <ul>
      <li class="fund">
        <div class="line">
          <span class="label">Накопительная скидка</span
          ><span class="value">{{
            $store.state.user.fund == 0
              ? "0%"
              : calcFund($store.state.user.fund)
          }}</span>
        </div>
      </li>
      <li class="orders">
        <div class="line">
          <span class="label">Все заказы</span
          ><span class="value"><Icon icon="bi:arrow-right" /></span>
        </div>
        <div class="description">Всего {{ getOrdersCount }}</div>
      </li>
      <li class="edit">
        <div class="line">
          <span class="label">Настройки</span
          ><span class="value"><Icon icon="bi:arrow-right" /></span>
        </div>
        <div class="description">Редактировать профиль</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import phoneFormatter from "phone-formatter";

export default {
  name: "MobileLayout",
  components: {
    Icon,
  },
  data: () => ({}),
  async created() {},
  computed: {
    getOrdersCount() {
      let count = this.$store.state.user.orders.length;
      if (count == 1) {
        return count + " заказ";
      } else if (count <= 4) {
        return count + " заказа";
      } else {
        return count + " заказов";
      }
    },
  },
  methods: {
    phoneFormat(phone) {
      return phoneFormatter.format(phone, "(NNN) NNN NN NN");
    },
    calcFund(deposit) {
      if (deposit >= 1000 && deposit < 5000) {
        return "3%";
      }
      if (deposit >= 5000 && deposit < 15000) {
        return "5%";
      }
      if (deposit >= 15000 && deposit < 30000) {
        return "7%";
      }
      if (deposit >= 30000) {
        return "10%";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  img {
    width: 70px;
    margin-right: 15px;
    border-radius: 50px;
  }

  .phone {
    font-family: "Exo 2", sans-serif;
    font-weight: 500;
    font-size: 22px;
  }

  .name {
    font-size: 18px;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 25px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    border-top: 5px solid #ef7b4f;
    border-radius: 9px;
  }

  li {
    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        font-size: 18px;
        font-weight: 500;
      }

      .value {
        font-family: "Oswald", sans-serif;
        font-weight: 500;
        color: #ef7b4f;
      }
    }

    .description {
      font-size: 14px;
    }
  }

  li.orders,
  li.edit {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .value {
      svg {
        font-size: 22px;
      }
    }
  }
}
</style>