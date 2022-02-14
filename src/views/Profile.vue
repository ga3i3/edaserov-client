<template>
  <div class="profile default">
    <div class="signin" v-show="auth == 'signin'">
      <img src="../res/signin.png" alt="" />
      <h2 class="text-center">Войти</h2>
      <div class="fields mt-5 pl-5 pr-5">
        <v-text-field
          filled
          label="Номер телефона"
          :hide-details="true"
          class="mb-5"
        ></v-text-field>
        <v-text-field
          filled
          label="Пароль"
          type="password"
          :hide-details="true"
          class="mb-5"
        ></v-text-field>
        <div class="actions d-flex mb-10">
          <v-btn color="primary" large depressed>Войти</v-btn>
          <v-btn
            color="accent"
            large
            depressed
            outlined
            text
            @click="auth = 'signup'"
            >Регистрация</v-btn
          >
        </div>

        <a
          href="javascript:void(0)"
          class="forgot_password"
          @click="auth = 'forgot'"
          >Забыли пароль?</a
        >
      </div>
    </div>

    <div class="signup" v-show="auth == 'signup'">
      <img src="../res/signup.png" alt="" />
      <h2 class="text-center">Регистрация</h2>
      <div class="fields mt-5 pl-5 pr-5">
        <v-text-field
          filled
          label="Имя"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          filled
          label="Номер телефона"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-phone"
        ></v-text-field>
        <v-text-field
          filled
          label="Пароль"
          type="password"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-key"
        ></v-text-field>

        <v-text-field
          filled
          label="Повторите пароль"
          type="password"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-key"
        ></v-text-field>
        <div class="actions d-flex mb-10">
          <v-btn
            color="accent"
            large
            depressed
            text
            outlined
            @click="auth = 'signin'"
          >
            <v-icon left> mdi-chevron-left </v-icon>
            Войти
          </v-btn>
          <v-btn color="primary" large depressed>Регистрация</v-btn>
        </div>
      </div>

      <p class="text-center pl-5 pr-5">
        Нажимая на кнопку "Регистрация" вы соглашаетесь с
        <a href="javascript:void(0)" @click="privacy = true"
          >политикой конфиденциальности</a
        >.
      </p>
    </div>

    <div class="forgot" v-show="auth == 'forgot'">
      <img src="../res/forgot.png" alt="" />
      <h2 class="text-center">Восстановить аккаунт</h2>
      <div class="fields mt-5 pl-5 pr-5">
        <v-text-field
          filled
          label="Номер телефона"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-phone"
        ></v-text-field>

        <div class="actions d-flex justify-center align-center mb-10">
          <v-btn color="primary" large depressed>Отправить пароль</v-btn>
        </div>

        <a
          href="javascript:void(0)"
          class="forgot_password"
          @click="auth = 'signin'"
          >Войти/регистрация</a
        >
      </div>
    </div>

    <v-bottom-sheet v-model="privacy" inset id="rules" :scrollable="true">
      <v-sheet class="pa-5 text-left" id="rules_wrap">
        <h3 class="text-lg-h6 text-left mb-4">Политика конфиденциальности</h3>
        <Privacy />
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import Privacy from "../components/Privacy.vue";

export default {
  name: "Profile",
  components: {
    Privacy,
  },
  data: () => ({
    auth: "signin",
    privacy: false,
  }),
  created() {
    this.$store.state.currentRoute = "Профиль";
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 9px;
}

.actions {
  button:first-child {
    width: calc(40% - 10px);
    margin-right: 10px;
  }
  button:last-child {
    width: 60%;
    border: none;
  }
}

.forgot_password {
  display: block;
  width: 100%;
  text-align: center;
}
p {
  font-size: 12px;
}

img {
  height: 300px;
  object-fit: contain;
}
</style>