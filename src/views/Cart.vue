<template>
  <div
    :class="
      $store.state.cart.length != 0 ? 'cart default hasprod' : 'cart default'
    "
  >
    <div class="empty" v-if="$store.state.cart.length == 0">
      <img src="../res/empty_cart.png" alt="" />
      <h3>Ваша корзина пуста</h3>
      <p>Похоже, вы еще не сделали <br />свой выбор...</p>
      <v-btn depressed color="accent" @click="goBack"
        >Вернуться в магазин</v-btn
      >
    </div>

    <div class="list">
      <ul v-if="$store.state.cart.length != 0">
        <li
          v-for="(product, index) in $store.state.cart"
          :key="index"
          class="item"
        >
          <div class="image">
            <img :src="$store.state.url + product.image" alt="" />
          </div>

          <div class="name">
            <span class="product_name">{{ product.name }}</span>
            <span class="weight" v-if="product.weight"
              >{{ product.weight }}гр.</span
            >
            <span class="price"
              >{{
                $store.state.cart[index].id.includes("extra") &&
                $store.state.cart[index].quantity == 1
                  ? "Бесплатно"
                  : product.price + " ₽"
              }}

              <font v-if="Object.keys(product.select).length != 0"
                >{{ product.select.name }} +{{ product.select.price }}₽</font
              ></span
            >
          </div>
          <div class="quantity">
            <div class="group">
              <v-btn
                small
                color="primary"
                depressed
                class="minus"
                @click="quantityMinus(product.id)"
              >
                <v-icon>
                  {{
                    currentProductQuantity(product.id) == 1
                      ? "mdi-delete"
                      : "mdi-minus"
                  }}
                </v-icon>
              </v-btn>

              <v-btn small depressed>
                {{ currentProductQuantity(product.id) }}
              </v-btn>

              <v-btn
                small
                color="primary"
                depressed
                class="plus"
                @click="quantityPlus(product.stock, product.id)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="lets_checkout" v-if="$store.state.cart.length != 0">
      <v-checkbox
        v-show="addExtra"
        label="Получить бесплатный хлеб и морс"
        @change="addExtraProd"
        v-if="getSubtotal >= 170"
      ></v-checkbox>
      <p v-if="getSubtotal < 170">Минимальная сумма для заказа <b>170 ₽</b></p>
      <v-btn
        block
        large
        color="accent"
        @click="toCheckout"
        :disabled="getSubtotal < 170 ? true : false"
      >
        <div class="total">{{ getSubtotal }} ₽</div>
        <span class="text">Оформить заказ</span>
      </v-btn>
    </div>

    <v-dialog v-model="$store.state.removeAllProducts" max-width="320">
      <v-card class="remove_all_products">
        <v-card-title class="d-flex justify-center modal_text">
          Удалить все товары с корзины?
        </v-card-title>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="red"
            depressed
            small
            text
            @click="$store.state.removeAllProducts = false"
          >
            Отменить
          </v-btn>

          <v-btn color="primary" text small @click="clearCart">
            Очистить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data: () => ({
    total: 0,
    addExtra: false,

    extraProducts: [
      {
        id: "bread_extra",
        name: "Хлеб 1 кус.",
        image: "bread.jpg",
        price: 3,
        quantity: 1,
        options: [],
        stock: 25,
        weight: 0,
        select: "",
        extra: true,
      },
      {
        id: "drink_extra",
        quantity: 1,
        name: "Морс 1 стакан (200мл.)",
        price: 20,
        options: [],
        image: "drink.jpg",
        stock: 25,
        weight: 0,
        select: "",
        extra: true,
      },
    ],
  }),
  beforeCreate() {
    if (localStorage.getItem("token") == null) {
      this.$router.push("/profile");
    }
  },
  created() {
    this.$store.state.currentRoute = "Корзина";
    this.$store.state.value = 1;

    this.heveExtra();
  },
  watch: {},
  computed: {
    getSubtotal() {
      let total = 0;
      let prices = [];
      let select_prices = [];
      this.$store.state.cart.map((item) => {
        prices.push(item.quantity * item.price);
        if (Object.keys(item.select).length != 0) {
          select_prices.push(item.quantity * parseInt(item.select.price));
        }
      });

      if (select_prices.length != 0) {
        total =
          prices.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          ) +
          select_prices.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
      } else {
        total = prices.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
      }

      let bread = this.$store.state.cart.find((x) => x.id == "bread_extra");
      let drink = this.$store.state.cart.find((x) => x.id == "drink_extra");

      if (bread != undefined && drink != undefined) {
        total -= 23;
      } else if (bread != undefined && drink == undefined) {
        total -= 3;
      } else if (drink != undefined && bread == undefined) {
        total -= 20;
      }

      return total;
    },
    heveExtra() {
      let bread = this.$store.state.cart.find((x) => x.id == "bread_extra");
      let drink = this.$store.state.cart.find((x) => x.id == "drink_extra");

      if (!bread || !drink) {
        this.addExtra = true;
      } else {
        this.addExtra = false;
      }
    },
  },
  methods: {
    goBack() {
      this.$store.state.value = 0;
      this.$router.push("/");
    },
    currentProductQuantity(id) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === id
      );
      return this.$store.state.cart[indexProductInCart].quantity;
    },
    quantityPlus(stock, id) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === id
      );
      if (this.$store.state.cart[indexProductInCart].quantity < stock) {
        this.$store.state.cart[indexProductInCart].quantity++;
      }
    },

    quantityMinus(id) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === id
      );
      if (this.$store.state.cart[indexProductInCart].quantity != 1) {
        this.$store.state.cart[indexProductInCart].quantity--;
      } else if (this.$store.state.cart[indexProductInCart].quantity == 1) {
        this.$store.state.cart.splice(indexProductInCart, 1);

        let currentIndexOf = this.$store.state.quantityToggle.indexOf(id);
        this.$store.state.quantityToggle.splice(currentIndexOf, 1);
      }
    },

    toCheckout() {
      this.$router.push("/checkout");
    },

    calc() {
      let prices = [];
      let select_prices = [];
      let total = 0;
      this.$store.state.cart.map((item) => {
        prices.push(item.quantity * item.price);
        if (Object.keys(item.select).length != 0) {
          select_prices.push(item.quantity * parseInt(item.select.price));
        }
      });

      total =
        prices.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        ) +
        select_prices.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
    },

    clearCart() {
      this.$store.state.cart = [];
      this.$store.state.quantityToggle = [];
      console.log(this.$store.state);
      this.$store.state.removeAllProducts = false;
    },

    addExtraProducts() {
      const bread = this.$store.state.cart.find((el) => el.id == "bred");
      const drink = this.$store.state.cart.find((el) => el.id == "drink");
    },

    addExtraProd(val) {
      if (val) {
        let bread = this.$store.state.cart.find((x) => x.id == "bread_extra");
        let drink = this.$store.state.cart.find((x) => x.id == "drink_extra");

        if (!bread && !drink) {
          this.extraProducts.map((item) => {
            this.$store.state.cart.push(item);
          });
        } else if (!bread) {
          this.$store.state.cart.push(this.extraProducts[0]);
        } else if (!drink) {
          this.$store.state.cart.push(this.extraProducts[1]);
        }
      } else {
        const bread = this.$store.state.cart.findIndex(
          (el) => el.id == "bread"
        );
        this.$store.state.cart.splice(bread, 1);

        const drink = this.$store.state.cart.findIndex(
          (el) => el.id == "drink"
        );

        this.$store.state.cart.splice(drink, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  height: 100%;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hasprod {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal_text {
  font-size: 16px !important;
}

h3 {
  font-size: 24px;
}

button {
  border-radius: 9px;
}

.item {
  margin-bottom: 24px;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 9px;
  }

  .product_name {
    font-size: 14px;
    line-height: 1;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .weight {
    line-height: 1;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    color: #7c7c7c;
    margin-bottom: 8px;
  }

  .price {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 16px;

    font {
      font-size: 12px;
      font-weight: 300;
      border-bottom: 1px dashed;
    }
  }

  .name {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .quantity {
    width: 90px;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.group {
  width: 50px;

  button:first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    i {
      font-size: 16px;
    }
  }
  button:nth-child(2) {
    border-radius: 0;
    font-size: 16px;
  }
  button:last-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    i {
      font-size: 16px;
    }
  }
}

.lets_checkout button {
  position: relative;
  padding: 0 !important;
  overflow: hidden;
  justify-content: flex-end;

  span.text {
    width: calc(100% - 75px);
    display: block;
  }
}

.lets_checkout button .v-btn__content {
  display: flex;
  align-items: center;
}
.total {
  position: absolute;
  left: 0;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  background: #fff;
  color: #2a2a2a;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
}

p b {
  font-family: "Roboto", sans-serif;
}

button[disabled] {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>