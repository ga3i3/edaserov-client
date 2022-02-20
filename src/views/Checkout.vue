<template>
  <div class="wrap">
    <ForGuests v-if="Object.keys($store.state.user).length == 0" />
    <ForAuthed v-if="Object.keys($store.state.user).length != 0" />
  </div>
</template>

<script>
import ForGuests from "../components/Checkout/ForGuests.vue";
import ForAuthed from "../components/Checkout/ForAuthed.vue";

export default {
  name: "Checkout",
  components: {
    ForGuests,
    ForAuthed,
  },
  data: () => ({}),
  created() {
    if (this.$store.state.cart.length == 0) {
      this.$router.push("/cart");
    }
    this.$store.state.currentRoute = "Оформление заказа";
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.checkout {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.action {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.v-subheader {
  padding-left: 0;
}

.how_get {
  margin: 0 !important;

  .line {
    padding: 15px;
    margin-bottom: 10px;
    background-color: rgb(240, 240, 240);
    border-radius: 15px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

.place_order {
  border-radius: 15px;
}

p {
  font-size: 12px;

  a {
    font-weight: 500;
  }
}

.v-subheader {
  height: auto;
}

.address {
  display: flex;
  justify-content: space-between;
}

.street {
  width: calc(50% - 10px);
  margin-right: 5px !important;
}
.house {
  width: calc(25% - 10px);
  margin-right: 5px !important;
}
.apartment {
  width: 25%;
}

.promocode {
  .v-input__append-inner {
    margin: auto !important;
  }

  button {
    border-radius: 9px;
  }
}

.place_older_add {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    border-radius: 15px;
  }
}

.actions {
  display: flex;
  flex-direction: column;

  b {
    font-family: "Roboto", sans-serif;
  }
}

.prices {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 10px;
  border: 1px solid #f1f1f1;
  width: auto;
  border-radius: 15px;
}

#rules {
  .v-dialog {
    min-height: 100% !important;
  }
  #rules_wrap {
    height: calc(100vh - 56px);
    overflow-y: scroll;
  }
}
</style>