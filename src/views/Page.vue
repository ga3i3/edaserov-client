<template>
  <div class="default">
    <img :src="url + page.image" alt="" v-if="getSize <= 500" />
    <div class="header">
      <h1>{{ page.name }}</h1>
      <span
        ><v-icon>mdi-clock-outline</v-icon> {{ getTime(page.created_at) }}</span
      >
    </div>

    <div class="content" v-html="page.content"></div>
  </div>
</template>

<script>
import ScreenSizeDetector from "screen-size-detector";
import dayjs from "dayjs";

import "dayjs/locale/ru";
dayjs.locale("ru");

export default {
  name: "Page",
  data: () => ({
    url: process.env.VUE_APP_MAIN_URL + "/uploads/",
    page: {},
  }),
  async created() {
    await this.$store.commit("params");
    await this.getPage();
  },
  computed: {
    getSize() {
      const screen = new ScreenSizeDetector();
      return screen.width;
    },
  },
  methods: {
    getPage() {
      const page = this.$store.state.pages.find(
        (x) => x.slug == this.$route.params.id
      );
      if (page != undefined) {
        this.page = page;
        this.$store.state.currentRoute = page.name;
      } else {
        this.getPageReq();
      }
    },
    getPageReq() {
      const slug = this.$route.params.id;

      this.$axios
        .get(`${process.env.VUE_APP_MAIN_URL}/page`, {
          headers: {
            slug,
          },
        })
        .then(
          (res) => {
            this.page = res.data.doc;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    getTime(time) {
      return dayjs(time).format("DD/MM/YYYY");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>