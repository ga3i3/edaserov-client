<template>
  <v-navigation-drawer
    v-model="$store.state.menu_drawer"
    fixed
    temporary
    :right="true"
  >
    <v-list-item
      :link="true"
      v-for="(page, index) in $store.state.pages"
      :key="index"
      :to="'/page/' + page.slug"
    >
      <v-list-item-content>
        <v-list-item-title>{{ page.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mt-5 mb-5"></v-divider>

    <v-list-item dense>
      <v-list-item-icon>
        <v-icon>mdi-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          >Работаем с {{ $store.state.params.working_time[0] }}:00 до
          {{ $store.state.params.working_time[1] }}:00</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <v-list-item dense>
      <v-list-item-icon>
        <v-icon>mdi-phone</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>+7 (922) 131-77-85</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item dense>
      <v-list-item-icon>
        <v-icon>mdi-email</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>help@edaserov.ru</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-list-item-icon>
        <v-icon>mdi-map-marker</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Россия, Серов</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppNavigationDrawer",
};
</script>

<style lang="scss" scoped>
</style>