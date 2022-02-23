<template>
  <div class="pc__cats">
    <swiper :options="options">
      <swiper-slide
        v-for="(slide, index) in cats"
        :key="index"
        :class="'cat-' + index"
      >
        <div class="cat" @click="loadCatProducts(slide.slug)">
          <img :src="require('../../res/' + slide.path)" />
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
  name: "CategoriesSlideMobile",
  components: {
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    options: {
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 10,
      loop: false,
      centeredSlides: false,
      allowTouchMove: true,
      centerInsufficientSlides: false,
      centeredSlidesBounds: true,
    },
    cats: [
      {
        name: "Бизнес ланч",
        path: "biznes-lanch.png",
        slug: "laych",
      },
      {
        name: "Салаты",
        path: "salaty.png",
        slug: "salads",
      },
      {
        name: "Супы",
        path: "supy.png",
        slug: "soups",
      },
      {
        name: "Горячее",
        path: "goryachee.png",
        slug: "hotter",
      },
      {
        name: "Десерты",
        path: "deserty.png",
        slug: "desserts",
      },
      {
        name: "WOK",
        path: "wok.png",
        slug: "wok",
      },
    ],
  }),
  methods: {
    loadCatProducts(slug) {
      // console.log(slug);
      this.$axios
        .get(`${process.env.VUE_APP_MAIN_URL}/product/cat`, {
          headers: {
            cat: slug,
          },
        })
        .then(
          (res) => {
            this.$store.state.cat = slug;
            this.$store.state.products = res.data.doc;
            this.$store.commit("categoryAndCheckWork");
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>