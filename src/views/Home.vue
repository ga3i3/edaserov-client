<template>
  <div class="home">
    <CategoriesSlideMobile v-if="getSize <= 500" />

    <ProductsLoopDesktop v-if="getSize > 500" />
    <ProductsLoopMobile v-if="getSize <= 500" />
  </div>
</template>



<script>
import ScreenSizeDetector from "screen-size-detector";

import { Icon } from "@iconify/vue2";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

import CategoriesSlideDesktop from "../components/Categories/CategoriesSlideDesktop.vue";
import CategoriesSlideMobile from "../components/Categories/CategoriesSlideMobile.vue";

import ProductsLoopMobile from "../components/Loop/ProductsLoopMobile.vue";
import ProductsLoopDesktop from "../components/Loop/ProductsLoopDesktop.vue";

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    Icon,
    CategoriesSlideDesktop,
    CategoriesSlideMobile,
    ProductsLoopMobile,
    ProductsLoopDesktop,
  },
  data: () => ({
    options: {
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
    },
    cats: [
      {
        name: "Бизнес ланч",
        path: "biznes-lanch.png",
      },
      {
        name: "Салаты",
        path: "salaty.png",
      },
      {
        name: "Супы",
        path: "supy.png",
      },
      {
        name: "Горячее",
        path: "goryachee.png",
      },
      {
        name: "Десерты",
        path: "deserty.png",
      },
      {
        name: "WOK",
        path: "wok.png",
      },
    ],
  }),
  created() {
    this.$store.state.currentRoute = "Edaserov";
    this.$store.state.value = 0;
  },
  computed: {
    getSize() {
      const screen = new ScreenSizeDetector();
      return screen.width;
    },
  },
};
</script>
