<template>
  <v-navigation-drawer
    v-model="$store.state.menu_drawer"
    fixed
    temporary
    :right="true"
  >
    <v-list-item :link="true">
      <v-list-item-icon>
        <v-icon>mdi-information</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Оплата и доставка</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :link="true">
      <v-list-item-icon>
        <v-icon>mdi-help</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Вопросы и ответы</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :link="true">
      <v-list-item-icon>
        <v-icon>mdi-headset</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Связь с администрацией</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :link="true">
      <v-list-item-icon>
        <v-icon>mdi-pencil</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Контакты</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mt-5 mb-5"></v-divider>

    <v-list-item :link="true">
      <v-list-item-icon>
        <v-icon>mdi-file-document</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Политика конфиденциальности</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :link="true">
      <v-list-item-icon>
        <v-icon>mdi-file-document</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Правилы сайта</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mt-5 mb-5"></v-divider>

    <v-list-item dense>
      <v-list-item-icon>
        <v-icon>mdi-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Работаем с 8:00 до 16:00</v-list-item-title>
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