<template>
  <div class="products products_loop">
    <h1>{{ $store.state.category.name }}</h1>

    <v-alert color="accent" type="info" class="mt-5" v-if="!statusOfCat"
      >Для категории "{{ getCategoryName($store.state.cat) }}" предложение
      действует с {{ $store.state.category.working[0] + ":00" }} до
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

    <v-bottom-sheet v-model="select" inset :attach="true" :persistent="true">
      <v-sheet class="pa-5" height="250px">
        <h3 class="text-lg-h6 text-left">Выберите опцию</h3>
        <v-radio-group>
          <v-radio
            v-for="(option, index) in productOptions"
            :key="index"
            :label="option.name + ' +' + option.price + 'руб.'"
            :value="option"
            @change="changeSelect(option)"
          ></v-radio>
        </v-radio-group>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "ProductsLoopMobile",
  data: () => ({
    select: false,
    quantityToggle: [],
    productOptions: "",
    productId: "",
    products: [],
  }),
  async created() {
    // console.log(this.$store.state.cart);
    await this.getAll();
  },
  computed: {
    statusOfCat() {
      const date = new Date();

      if (this.$store.state.category) {
        const currentCat = this.$store.state.category;

        if (
          date.getHours() >= parseInt(currentCat.working[0]) &&
          date.getHours() <= parseInt(currentCat.working[1])
        ) {
          return true;
        } else {
          return false;
        }
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
        select: "",
      });
      this.productId = product._id;
      if (Object.keys(product.options).length != 0) {
        this.productOptions = product.options;
        this.select = true;
      }
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
</style>