import Vue from "vue";
import App from "./App.vue";

import "./assets/main.scss";
import store from "./store";

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
