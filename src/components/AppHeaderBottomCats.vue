<template>
  <div class="pc__cats">
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
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

export default {
  name: "AppHeaderBottomCats",
  components: {
    Swiper,
    SwiperSlide,
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
};
</script>

<style lang="scss" scoped>
</style>