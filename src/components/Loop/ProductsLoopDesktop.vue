<template>
  <div class="products_desktop products_loop">
    <h1>{{ $store.state.category.name }}</h1>
    <v-alert color="accent" type="info" class="mt-5" v-if="!statusOfCat"
      >Для категории "{{ getCategoryName($store.state.cat) }}" предложение
      действует {{ $store.state.category.working[0] + ":00" }} до
      {{ $store.state.category.working[1] + ":00" }}
    </v-alert>
    <ul
      v-if="$store.state.products.length != 0"
      :class="statusOfCat ? 'working' : 'closed'"
    >
      <li v-for="(product, index) in $store.state.products" :key="index">
        <v-card class="mx-auto my-6" elevation="0">
          <v-img height="190" :src="$store.state.url + product.image"></v-img>

          <v-card-title class="d-flex justify-space-between align-center"
            >{{ product.name }} <br /><span
              >{{ product.weight }}гр.</span
            ></v-card-title
          >

          <v-card-text>{{ product.description }}</v-card-text>

          <v-divider
            class="mx-4"
            v-show="product.options.length != 0"
          ></v-divider>

          <div class="options" v-if="product.options.length != 0">
            <v-radio-group>
              <v-radio
                v-for="(option, index) in product.options"
                :key="index"
                :value="option"
                @change="changeOption(product._id, option)"
              >
                <template #label>
                  {{ option.name }} <span>+{{ option.price }} ₽</span>
                </template>
              </v-radio>
            </v-radio-group>
          </div>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions class="d-flex justify-space-between align-center">
            <div class="price">{{ product.price + " ₽" }}</div>
            <div
              v-if="$store.state.quantityToggle.includes(product._id)"
              class="quantity"
            >
              <v-btn
                small
                color="primary"
                depressed
                class="minus"
                @click="quantityMinus(product._id)"
              >
                <v-icon>{{
                  currentProductQuantity(product._id) == 1
                    ? "mdi-delete"
                    : "mdi-minus"
                }}</v-icon>
              </v-btn>

              <v-btn small depressed>
                {{ currentProductQuantity(product._id) }}
              </v-btn>

              <v-btn
                small
                color="primary"
                depressed
                class="plus"
                @click="quantityPlus(product.stock, product._id)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn
              color="primary"
              depressed
              v-if="!$store.state.quantityToggle.includes(product._id)"
              @click="addToCart(product)"
            >
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </li>
    </ul>
    <v-alert
      color="accent"
      type="info"
      class="mt-5"
      v-if="$store.state.products.length == 0"
      >На данный момент в этой категории нет блюд</v-alert
    >
  </div>
</template>

<script>
export default {
  name: "ProductsLoop",
  data: () => ({
    select: false,
    quantityToggle: [],
    productOptions: "",
    productId: "",
    products: [],
    currentProduct: {
      id: "",
      value: {},
    },
  }),
  async created() {
    // console.log(this.$store.state.cart);
    await this.getAll();
  },
  beforeMount() {},
  computed: {
    statusOfCat() {
      const date = new Date();
      const currentCat = this.$store.state.category;

      if (
        date.getHours() >= parseInt(currentCat.working[0]) &&
        date.getHours() <= parseInt(currentCat.working[1])
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    select(val) {
      if (!val) {
        this.productOptions = "";
        this.productId = "";
      }
    },
  },
  methods: {
    getAll() {
      this.$axios
        .get(`${process.env.VUE_APP_MAIN_URL}/product/cat`, {
          headers: {
            cat: "laych",
          },
        })
        .then(
          (res) => {
            this.$store.state.cat = "laych";
            this.$store.state.products = res.data.doc;
            this.$store.commit("categoryAndCheckWork");
          },
          (err) => {
            console.log(err);
          }
        );
    },
    addToCart(product) {
      this.$store.state.quantityToggle.push(product._id);
      this.$store.state.cart.push({
        id: product._id,
        quantity: 1,
        name: product.name,
        price: product.price,
        options: product.options,
        image: product.image,
        stock: product.stock,
        weight: product.weight,
        select:
          this.currentProduct.id == product._id
            ? this.currentProduct.option
            : {},
      });
      this.productId = product._id;
      this.productOptions = product.options;
      this.select = true;
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

    changeSelect(option) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === this.productId
      );
      this.$store.state.cart[indexProductInCart].select = option;

      setTimeout(() => {
        this.select = false;
      }, 500);
    },

    changeOption(id, option) {
      this.currentProduct.id = id;
      this.currentProduct.option = option;

      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === id
      );

      if (indexProductInCart > -1) {
        this.$store.state.cart[indexProductInCart].select = option;
      }
    },
    getCategoryName(name) {
      switch (name) {
        case "hotter":
          return "Горячее";
        case "laych":
          return "Бизнес ланч";
        case "salads":
          return "Салаты";
        case "soups":
          return "Супы";
        case "desserts":
          return "Десерты";
        case "wok":
          return "WOK";
        default:
          return "Все блюды";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  > li {
    width: calc(33% - 15px);
    margin-right: 15px;
    align-self: stretch;

    > * {
      height: calc(100% - 24px);
      display: flex;
      flex-direction: column;

      .v-image {
        height: 190px;
        flex: unset !important;
      }

      .v-card__text {
        margin-bottom: auto;
      }

      hr:last-child {
        margin-top: auto;
      }
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

.v-card__title {
  position: relative;
  font-size: 18px;

  span {
    // position: absolute;
    // bottom: 16px;
    // right: 16px;
    font-family: "Exo 2", sans-serif;
    font-size: 14px;
    color: rgb(80, 80, 80);
  }
}

.price {
  font-family: "Exo 2", sans-serif;
}

.v-card__actions {
  padding-left: 16px;
  padding-right: 16px;
  height: 52px;
}

.options {
  padding: 0 16px;
}
</style>