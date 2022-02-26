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
        v-mask="'+7 (###) ### ## ##'"
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
          <v-radio
            label="Доставка"
            value="tohome"
            :disabled="!getWorkDelivery"
          ></v-radio>
          <span
            >Работаем с
            {{ delivery_work[0] + ":00 до " + delivery_work[1] + ":00" }}
          </span>
        </div>
      </v-radio-group>
    </div>
    <div class="action text-center">
      <p>
        Нажимая на кнопку вы соглашаетесь с
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

      <v-bottom-sheet v-model="place_order" inset class="order_confirm">
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
            <div class="changes">
              <v-radio-group
                v-model="discountChange"
                v-if="!hidden.includes('all')"
              >
                <div class="amount">
                  <v-radio
                    label="Использовать скидку от суммы заказа"
                    value="fromAmount"
                    v-if="!hidden.includes('fromAmount')"
                  ></v-radio>
                </div>
                <div class="fund">
                  <v-radio
                    label="Использовать накопительную скидку"
                    value="fromFund"
                    v-if="!hidden.includes('fromFund')"
                  ></v-radio>
                </div>
              </v-radio-group>
            </div>

            <div class="prices">
              <li v-if="!form.percent">
                Общая сумма заказа: <b>{{ total }} ₽</b>
              </li>
              <li v-if="form.percent">
                Общая сумма заказа:
                <del
                  ><b>{{ total }} ₽</b></del
                >
                <span class="minus-pecent">-{{ this.form.percent }}%</span>
              </li>
              <li v-if="form.percent">
                Со скидкой:
                <b>{{ form.discount }} ₽</b>
              </li>
              <li v-if="delivery_price != 0 && form.delivery == 'tohome'">
                Доставка: <b>{{ delivery_price }} ₽</b>
              </li>
              <li v-if="delivery_price != 0 && form.delivery == 'tohome'">
                Итого:
                <b>{{
                  parseInt(delivery_price) +
                  (form.discount ? form.discount : total)
                }}</b>
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
        v-model="snackbar.status"
        color="accent"
        rounded="pill"
        elevation="0"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="empty = false"> Закрыть </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";
import Rules from "../Rules.vue";
import Privacy from "../Privacy.vue";

export default {
  name: "ForAuthed",
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
    discountChange: "",
    hidden: "",
    snackbar: {
      text: "",
      status: false,
    },
    modal_time: false,
    place_order: false,
    total: null,
    rules: false,
    privacy: false,

    delivery_work: [],
    delivery_price: 0,
  }),
  created() {
    if (this.$store.state.cart.length == 0) {
      this.$router.push("/cart");
    }
    this.$store.state.currentRoute = "Оформление заказа";
    this.getSubtotal();
    this.checkCalcFundAndTotal();
    this.onLoad();

    this.delivery_work = this.$store.state.params.delivery.working_time;
  },
  watch: {
    discountChange(val) {
      if (val == "fromAmount") {
        this.calcFromAmount();
      } else {
        this.calcFromFund();
      }
    },
  },
  computed: {
    getWorkDelivery() {
      const date = new Date();

      if (
        date.getHours() >=
          parseInt(this.$store.state.params.delivery.working_time[0]) &&
        date.getHours() <=
          parseInt(this.$store.state.params.delivery.working_time[1])
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    onLoad() {
      this.form.phone = this.$store.state.user.phone;
      this.form.email = this.$store.state.user.email;
    },

    placeOrder() {
      if (
        this.form.name.length == 0 ||
        this.form.phone.length == 0 ||
        this.form.email.length == 0 ||
        this.form.delivery.length == 0
      ) {
        this.snackbar.status = true;
        this.snackbar.timeout = 1500;
        this.snackbar.text = "Заполните все поля";
      } else {
        this.place_order = true;

        let total = this.total;
        if (this.form.delivery == "tohome") {
          if (total < this.$store.state.params.delivery.freeupto) {
            this.delivery_price = this.$store.state.params.delivery.default;
          } else if (total >= this.$store.state.params.delivery.freeupto) {
            this.delivery_price = 0;
          }
        } else {
          this.delivery_price = 0;
        }
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

      let bread = this.$store.state.cart.find((x) => x.id == "bread_extra");
      let drink = this.$store.state.cart.find((x) => x.id == "drink_extra");

      if (bread != undefined && drink != undefined) {
        total -= 23;
      } else if (bread != undefined && drink == undefined) {
        total -= 3;
      } else if (drink != undefined && bread == undefined) {
        total -= 20;
      }

      this.total = total.toFixed(2);
    },

    calcFromAmount() {
      let total = this.total;
      if (total < 1000) {
        this.form.percent = "";
        this.form.discount = "";
      }

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
    calcFromFund() {
      const total = this.total;
      const fund = this.$store.state.user.fund;

      if (fund == 0) {
        this.snackbar.status = true;
        this.snackbar.timeout = 3500;
        this.snackbar.text = "У вас недостачно накопительной скидки";

        this.form.percent = "";
        this.form.discount = "";
      } else {
        if (fund >= 1000 && fund < 5000) {
          this.form.percent = 3;
          this.form.discount = total - (total / 100) * 3;
        }
        if (fund >= 5000 && fund < 15000) {
          this.form.percent = 5;
          this.form.discount = total - (total / 100) * 5;
        }
        if (fund >= 15000 && fund < 30000) {
          this.form.percent = 7;
          this.form.discount = total - (total / 100) * 7;
        }
        if (fund >= 30000) {
          this.form.percent = 10;
          this.form.discount = total - (total / 100) * 10;
        }
      }
    },

    checkCalcFundAndTotal() {
      let total = 0;
      let fund = this.$store.state.user.fund;
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

      if (total < 1000 && fund < 1000) {
        this.hidden = "all";
      } else if (total < 1000) {
        this.hidden = "fromAmount";
      } else if (fund < 1000) {
        this.hidden = "fromFund";
      } else if (total > 1000 && fund > 1000) {
        this.hidden = "";
      }

      if (total > 1000 && fund < 1000) {
        this.discountChange = "fromAmount";
      } else if (total < 1000 && fund > 1000) {
        this.discountChange = "fromFund";
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
        user: this.$store.state.user.id,
        total: this.total,
        discount: this.form.discount,
        percent: this.form.percent,
        delivery_price: parseInt(this.delivery_price),
      };

      if (
        data.name.length != 0 &&
        data.phone.length != 0 &&
        data.email.length != 0 &&
        data.delivery.length != 0
      ) {
        if (data.delivery != "incafe") {
          let drink = data.cart.findIndex((x) => x.id == "drink_extra");
          data.cart.splice(drink, 1);
        }

        await this.$axios
          .post(`${process.env.VUE_APP_MAIN_URL}/order/auth`, data, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
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

.minus-pecent {
  font-family: "Roboto", sans-serif;
  padding-left: 15px;
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