<template>
  <div class="checkout default">
    <div class="fields">
      <v-subheader class="pl-1 pb-4">Контактные данные</v-subheader>
      <v-text-field
        filled
        label="ФИО"
        :hide-details="true"
        class="mb-3"
      ></v-text-field>
      <v-text-field
        filled
        label="Телефон"
        :hide-details="true"
        class="mb-3"
      ></v-text-field>
      <v-text-field
        filled
        label="Email"
        :hide-details="true"
        class="mb-3"
      ></v-text-field>

      <v-subheader class="mt-8 pl-1 pb-4"
        >Каким образом хотите получить заказ</v-subheader
      >

      <v-radio-group v-model="delivery" class="how_get">
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
            <v-subheader class="pl-1 pb-4" v-if="delivery == 'incafe'"
              >Адрес доставки</v-subheader
            >
            <v-dialog
              ref="dialog"
              v-model="modal_time"
              :return-value.sync="time"
              persistent
              width="290px"
              class="time_picker"
              v-if="delivery == 'incafe'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
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
                v-model="time"
                full-width
                :format="'24hr'"
                min="12:00"
                max="16:00"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal_time = false">
                  Отменить
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(time)">
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>

            <v-subheader class="pl-1 pb-4" v-if="delivery == 'tohome'"
              >Адрес доставки</v-subheader
            >
            <div class="address" v-if="delivery == 'tohome'">
              <v-text-field
                filled
                label="Улица"
                :hide-details="true"
                class="street"
              ></v-text-field>
              <v-text-field
                filled
                label="Дом"
                :hide-details="true"
                class="house"
              ></v-text-field>
              <v-text-field
                filled
                label="Квартира"
                :hide-details="true"
                class="apartment"
              ></v-text-field>
            </div>

            <v-subheader
              :class="delivery == 'pickup' ? 'pl-1 pb-4' : 'mt-8 pl-1 pb-4'"
              >У вас имеется промокод?</v-subheader
            >
            <v-text-field
              filled
              label="Промокод"
              :hide-details="true"
              class="mb-3 promocode"
            >
              <template v-slot:append>
                <v-btn small depressed tile color="primary"> приминить </v-btn>
              </template>
            </v-text-field>
          </div>
          <div class="actions">
            <div class="prices">
              <li>
                Общая сумма заказа: <b>{{ getSubtotal }} ₽</b>
              </li>
            </div>
            <v-btn block large color="accent">Подтвердить</v-btn>
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
    </div>
  </div>
</template>

<script>
import Rules from "../components/Rules.vue";
import Privacy from "../components/Privacy.vue";

export default {
  name: "Checkout",
  components: {
    Rules,
    Privacy,
  },
  data: () => ({
    delivery: "",
    time: "",
    modal_time: false,
    place_order: false,

    rules: false,
    privacy: false,
  }),
  created() {
    if (this.$store.state.cart.length == 0) {
      this.$router.push("/cart");
    }
    this.$store.state.currentRoute = "Офомление заказа";
  },
  computed: {
    getSubtotal() {
      let product = 0;
      this.$store.state.cart.map((item) => {
        let subtotal = item.quantity * item.price;
        // console.log(sutotal);
        product = product + subtotal;
      });
      return product;
    },
  },
  methods: {
    placeOrder() {
      this.place_order = true;
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