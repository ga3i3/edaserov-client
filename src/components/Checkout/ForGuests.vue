<template>
  <div class="checkout default">
    <div class="fields">
      <v-subheader class="pl-1 pb-4">Контактные данные</v-subheader>
      <v-text-field
        filled
        label="ФИО"
        :hide-details="true"
        class="mb-3"
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        filled
        label="Телефон"
        :hide-details="true"
        class="phone mb-3"
        v-model="form.phone"
        v-mask="'(###) ### ## ##'"
      ></v-text-field>
      <v-text-field
        filled
        label="Email"
        :hide-details="true"
        class="mb-3"
        v-model="form.email"
      ></v-text-field>

      <v-subheader class="mt-8 pl-1 pb-4"
        >Каким образом хотите получить заказ</v-subheader
      >

      <v-radio-group v-model="form.delivery" class="how_get">
        <div class="line">
          <v-radio label="Самовывоз" value="pickup"></v-radio>
          <span>С 12:00 до 16:00</span>
        </div>
        <div class="line">
          <v-radio label="В кафе" value="incafe"></v-radio>
          <span
            >Работаем с 12:00 до 16:00 <br />Заказ подадут в назначенное время,
            обслуживает официант</span
          >
        </div>
        <div class="line">
          <v-radio label="На дом" value="tohome"></v-radio>
          <span
            >Работаем с 12:00 до 16:00 <br />Заказ доставим не
            замедлительно</span
          >
        </div>
      </v-radio-group>
    </div>
    <div class="action text-center">
      <p>
        Нажимая на кнопку вы соглашаетесь с
        <a href="javascript:void(0)" @click="rules = true">правилами сайта</a> и
        <a href="javascript:void(0)" @click="privacy = true"
          >политикой конфиденциальности</a
        >
      </p>
      <v-btn
        class="place_order"
        color="accent"
        large
        block
        depressed
        @click="placeOrder"
        >Сделать заказ</v-btn
      >

      <v-bottom-sheet v-model="place_order" inset>
        <v-sheet class="pa-5 place_older_add" height="500px">
          <div class="add_fields">
            <v-subheader class="pl-1 pb-4" v-if="form.delivery == 'pickup'"
              >Адрес с которого можете забрать</v-subheader
            >
            <v-text-field
              v-if="form.delivery == 'pickup'"
              filled
              :hide-details="true"
              class="mb-3"
              readonly
              value="Серов, Свердловская область, Нансена 2А"
            ></v-text-field>

            <v-subheader class="pl-1 pb-4" v-if="form.delivery == 'incafe'"
              >Время подачи</v-subheader
            >
            <v-dialog
              ref="dialog"
              v-model="modal_time"
              :return-value.sync="form.time"
              persistent
              width="290px"
              class="time_picker"
              v-if="form.delivery == 'incafe'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.time"
                  label="Время подачи"
                  filled
                  :hide-details="true"
                  class="mb-3 time_input"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal_time"
                v-model="form.time"
                full-width
                :format="'24hr'"
                min="12:00"
                max="16:00"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal_time = false">
                  Отменить
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(form.time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>

            <v-subheader class="pl-1 pb-4" v-if="form.delivery == 'tohome'"
              >Адрес доставки</v-subheader
            >
            <div class="address" v-if="form.delivery == 'tohome'">
              <v-text-field
                filled
                label="Улица"
                :hide-details="true"
                class="street"
                v-model="form.address.street"
              ></v-text-field>
              <v-text-field
                filled
                label="Дом"
                :hide-details="true"
                class="house"
                v-model="form.address.house"
              ></v-text-field>
              <v-text-field
                filled
                label="Квартира"
                :hide-details="true"
                class="apartment"
                v-model="form.address.apartment"
              ></v-text-field>
            </div>
          </div>
          <div class="actions">
            <div class="prices">
              <li v-if="!form.percent">
                Общая сумма заказа: <b>{{ total }} ₽</b>
              </li>
              <li v-if="form.percent">
                Общая сумма заказа:
                <del
                  ><b>{{ total }} ₽</b></del
                >
              </li>
              <li v-if="form.percent">
                Со скидкой:
                <ins
                  ><b>{{ form.discount }} ₽</b></ins
                >
              </li>
            </div>
            <v-btn block large color="accent" @click="confirmOrder"
              >Подтвердить</v-btn
            >
          </div>
        </v-sheet>
      </v-bottom-sheet>

      <v-bottom-sheet v-model="rules" inset id="rules" :scrollable="true">
        <v-sheet class="pa-5 text-left" id="rules_wrap">
          <h3 class="text-lg-h6 text-left mb-4">Правилы</h3>
          <Rules />
        </v-sheet>
      </v-bottom-sheet>

      <v-bottom-sheet v-model="privacy" inset id="rules" :scrollable="true">
        <v-sheet class="pa-5 text-left" id="rules_wrap">
          <h3 class="text-lg-h6 text-left mb-4">Политика конфиденциальности</h3>
          <Privacy />
        </v-sheet>
      </v-bottom-sheet>

      <v-snackbar
        v-model="empty"
        color="accent"
        rounded="pill"
        elevation="0"
        timeout="1000"
      >
        Заполните все поля
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="empty = false"> Закрыть </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import Rules from "../Rules.vue";
import Privacy from "../Privacy.vue";

export default {
  name: "ForGuests",
  directives: { mask },
  components: {
    Rules,
    Privacy,
  },
  data: () => ({
    form: {
      name: "",
      phone: "",
      email: "",
      delivery: "",
      time: "",
      address: {
        street: "",
        house: "",
        apartment: "",
      },
      time: "",
      discount: "",
      percent: "",
    },
    empty: false,
    modal_time: false,
    place_order: false,
    total: null,
    rules: false,
    privacy: false,
  }),
  created() {
    if (this.$store.state.cart.length == 0) {
      this.$router.push("/cart");
    }
    this.$store.state.currentRoute = "Оформление заказа";
    this.getSubtotal();
  },
  computed: {},
  methods: {
    placeOrder() {
      if (
        this.form.name.length == 0 ||
        this.form.phone.length == 0 ||
        this.form.email.length == 0 ||
        this.form.delivery.length == 0
      ) {
        this.empty = true;
      } else {
        this.place_order = true;
      }
    },
    getSubtotal() {
      let total = 0;
      let prices = [];
      let select_prices = [];
      this.$store.state.cart.map((item) => {
        prices.push(item.quantity * item.price);
        if (Object.keys(item.select).length != 0) {
          select_prices.push(item.quantity * parseInt(item.select.price));
        }
      });

      if (select_prices.length != 0) {
        total =
          prices.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          ) +
          select_prices.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
      } else {
        total = prices.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
      }

      this.total = total;
      if (total >= 1000 && total < 2000) {
        this.form.percent = 5;
        this.form.discount = total - (total / 100) * 5;
      }

      if (total >= 2000 && total < 3000) {
        this.form.percent = 7;
        this.form.discount = total - (total / 100) * 7;
      }

      if (total >= 3000) {
        this.form.percent = 10;
        this.form.discount = total - (total / 100) * 10;
      }
    },

    async confirmOrder() {
      const data = {
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        delivery: this.form.delivery,
        address: this.form.address,
        time: this.form.time,
        cart: this.$store.state.cart,
        user: "guest",
        discount: this.form.discount,
        percent: this.form.percent,
      };

      if (
        data.name.length != 0 &&
        data.phone.length != 0 &&
        data.email.length != 0 &&
        data.delivery.length != 0
      ) {
        await this.$axios
          .post(`${process.env.VUE_APP_MAIN_URL}/order`, data)
          .then(
            (res) => {
              if (res.status == 200) {
                this.$router.push("/success/" + res.data.id);
              }
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        this.empty = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.action {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.v-subheader {
  padding-left: 0;
}

.how_get {
  margin: 0 !important;

  .line {
    padding: 15px;
    margin-bottom: 10px;
    background-color: rgb(240, 240, 240);
    border-radius: 15px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

.place_order {
  border-radius: 15px;
}

p {
  font-size: 12px;

  a {
    font-weight: 500;
  }
}

.v-subheader {
  height: auto;
}

.address {
  display: flex;
  justify-content: space-between;
}

.street {
  width: calc(50% - 10px);
  margin-right: 5px !important;
}
.house {
  width: calc(25% - 10px);
  margin-right: 5px !important;
}
.apartment {
  width: 25%;
}

.promocode {
  .v-input__append-inner {
    margin: auto !important;
  }

  button {
    border-radius: 9px;
  }
}

.place_older_add {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    border-radius: 15px;
  }
}

.actions {
  display: flex;
  flex-direction: column;

  b {
    font-family: "Roboto", sans-serif;
  }
}

.prices {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 10px;
  border: 1px solid #f1f1f1;
  width: auto;
  border-radius: 15px;
}

#rules {
  .v-dialog {
    min-height: 100% !important;
  }
  #rules_wrap {
    height: calc(100vh - 56px);
    overflow-y: scroll;
  }
}
</style>