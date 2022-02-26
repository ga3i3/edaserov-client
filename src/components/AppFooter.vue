<template>
  <footer class="site_footer">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="3" class="col menu">
          <h3>Меню</h3>
          <ul>
            <li><router-link to="/page/dostavka">Доставка</router-link></li>
            <li><router-link to="/cart">Корзина</router-link></li>
            <li><router-link to="/">Каталог</router-link></li>
          </ul>
        </v-col>
        <v-col cols="12" sm="3" class="col profile">
          <h3>Мой кабинет</h3>
          <ul>
            <li><router-link to="/profile">Войти</router-link></li>
            <li><router-link to="/profile">Регистрация</router-link></li>
          </ul>
        </v-col>
        <v-col cols="12" sm="3" class="col contacts">
          <h3>Контакты</h3>
          <ul>
            <li>
              <a href="tel:+79221317785" target="_blank">
                <v-icon>mdi-phone</v-icon>
                +7 (922) 131-77-85
              </a>
            </li>
            <li>
              <a href="mailto:help@edaserov.ru" target="_blank">
                <v-icon>mdi-email</v-icon>
                help@edaserov.ru
              </a>
            </li>
            <li>
              <a to="javascript:void(0)">
                <v-icon>mdi-clock</v-icon>
                с 08:00 до 16:00
              </a>
            </li>
            <li>
              <a to="javascript:void(0)">
                <v-icon>mdi-map-marker</v-icon>
                Россия, Серов
              </a>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" sm="3" class="col last">
          <img src="@/res/logo.png" alt="" />
          <p>© {{ year }} Еда Серов. <br />Все права защищены.</p>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>