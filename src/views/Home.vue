<template>
  <div class="home">
    <swiper :options="options">
      <swiper-slide
        v-for="(slide, index) in cats"
        :key="index"
        :class="'cat-' + index"
      >
        <div class="cat">
          <img :src="require('../res/' + slide.path)" />
          <span>{{ slide.name }}</span>
        </div>
      </swiper-slide>
    </swiper>

    <ProductsLoop />
  </div>
</template>



<script>
import { Icon } from "@iconify/vue2";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

import ProductsLoop from "../components/ProductsLoop.vue";

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    Icon,
    ProductsLoop,
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
  },
};
</script>
