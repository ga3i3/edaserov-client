<template>
  <div class="products">
    <ul>
      <li v-for="(product, index) in $store.state.products" :key="index">
        <v-card class="mx-auto my-6" elevation="1">
          <v-img height="190" :src="product.image"></v-img>

          <v-card-title class="d-flex justify-space-between align-center"
            >{{ product.name }}
            <span>{{ product.weight }}гр.</span></v-card-title
          >

          <v-card-text>{{ product.description }}</v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions class="d-flex justify-space-between align-center">
            <div class="price">{{ product.price + " ₽" }}</div>
            <div
              v-if="$store.state.quantityToggle.includes(product.id)"
              class="quantity"
            >
              <v-btn
                small
                color="primary"
                depressed
                class="minus"
                @click="quantityMinus(product.id)"
              >
                <v-icon>{{
                  currentProductQuantity(product.id) == 1
                    ? "mdi-delete"
                    : "mdi-minus"
                }}</v-icon>
              </v-btn>

              <v-btn small depressed>
                {{ currentProductQuantity(product.id) }}
              </v-btn>

              <v-btn
                small
                color="primary"
                depressed
                class="plus"
                @click="quantityPlus(product.id)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn
              color="primary"
              depressed
              v-if="!$store.state.quantityToggle.includes(product.id)"
              @click="addToCart(product)"
            >
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </li>
    </ul>

    <v-bottom-sheet v-model="select" inset :attach="true" :persistent="true">
      <v-sheet class="pa-5" height="250px">
        <h3 class="text-lg-h6 text-left">Выберите опцию</h3>
        <v-radio-group>
          <v-radio
            v-for="(option, index) in productOptions"
            :key="index"
            :label="option"
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
  name: "ProductsLoop",
  data: () => ({
    select: false,
    quantityToggle: [],
    productOptions: "",
    productId: "",
  }),
  created() {
    console.log(this.$store.state.cart);
  },
  computed: {},
  watch: {
    select(val) {
      if (!val) {
        this.productOptions = "";
        this.productId = "";
      }
    },
  },
  methods: {
    addToCart(product) {
      this.$store.state.quantityToggle.push(product.id);
      this.$store.state.cart.push({
        id: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        options: product.options,
        image: product.image,
        weight: product.weight,
        select: "",
      });
      this.productId = product.id;
      this.productOptions = product.options;
      this.select = true;
    },
    currentProductQuantity(id) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === id
      );
      return this.$store.state.cart[indexProductInCart].quantity;
    },
    quantityPlus(id) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === id
      );
      this.$store.state.cart[indexProductInCart].quantity++;
      console.log(this.$store.state.cart);
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
      console.log(this.$store.state.cart);
    },

    changeSelect(option) {
      let indexProductInCart = this.$store.state.cart.findIndex(
        (x) => x.id === this.productId
      );
      this.$store.state.cart[indexProductInCart].select = option;

      setTimeout(() => {
        this.select = false;
      }, 500);

      console.log(this.$store.state.cart);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>