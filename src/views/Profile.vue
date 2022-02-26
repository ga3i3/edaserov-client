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
          class="phone mb-5"
          v-model="form_auth.phone"
          v-mask="'+7 (###) ### ## ##'"
        ></v-text-field>
        <v-text-field
          filled
          label="Пароль"
          type="password"
          :hide-details="true"
          class="mb-5"
          v-model="form_auth.password"
        ></v-text-field>
        <div class="actions d-flex mb-10">
          <v-btn color="primary" large depressed @click="signin">Войти</v-btn>
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
          v-model="form_reg.name"
          filled
          label="Имя"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="form_reg.phone"
          filled
          label="Номер телефона"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-phone"
          v-mask="'+7 (###) ### ## ##'"
        ></v-text-field>
        <v-text-field
          v-model="form_reg.email"
          filled
          label="Email"
          type="email"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-at"
        ></v-text-field>
        <v-text-field
          v-model="form_reg.pass"
          filled
          label="Пароль"
          type="password"
          :hide-details="true"
          class="mb-5"
          prepend-inner-icon="mdi-key"
        ></v-text-field>

        <v-text-field
          v-model="form_reg.repass"
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
          <v-btn color="primary" large depressed @click="signup"
            >Регистрация</v-btn
          >
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

    <v-snackbar
      v-model="snackbar.status"
      color="accent"
      rounded="pill"
      elevation="0"
      timeout="2500"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.status = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
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
    snackbar: {
      text: "",
      status: false,
    },

    form_reg: {
      name: "",
      phone: "",
      email: "",
      pass: "",
      repass: "",
    },
    form_auth: {
      phone: "",
      password: "",
    },
  }),
  created() {
    this.$store.state.currentRoute = "Профиль";
  },
  watch: {},
  methods: {
    signup() {
      let data = {
        name: this.form_reg.name,
        phone: this.form_reg.phone,
        email: this.form_reg.email,
        password: this.form_reg.pass,
        repass: this.form_reg.repass,
      };

      if (data.name && data.phone && data.email) {
        if (data.password.length != 0 && data.repass.length != 0) {
          if (data.password.length >= 5 && data.repass.length >= 5) {
            this.$axios
              .post(`${process.env.VUE_APP_MAIN_URL}/user`, data)
              .then((res) => {
                localStorage.setItem("token", res.data.token);

                this.$router.push("/account");
              })
              .catch((err) => {
                if (err.response.data.error == "email in use") {
                  this.snackbar.text = "Идентичный аккаунт уже существует";
                  this.snackbar.status = true;
                }
              });
          } else {
            this.snackbar.text = "У вас легкий пароль";
            this.snackbar.status = true;
          }
        } else {
          this.snackbar.text = "Введите пароль";
          this.snackbar.status = true;
        }
      } else {
        this.snackbar.text = "Заполните все поля";
        this.snackbar.status = true;
      }
    },
    signin() {
      let data = {
        phone: this.form_auth.phone,
        password: this.form_auth.password,
      };

      if (data.phone.length == 18 && data.password.length != 0) {
        this.$axios
          .post(`${process.env.VUE_APP_MAIN_URL}/user/login`, data)
          .then((res) => {
            localStorage.setItem("token", res.data.token);

            this.$router.push("/account");
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.snackbar.text = "Не правильный номер или пароль";
              this.snackbar.status = true;
            }
          });
      } else {
        this.snackbar.text = "Введите корректный номер и пароль";
        this.snackbar.status = true;
      }
    },
  },
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