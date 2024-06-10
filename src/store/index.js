import Vue from "vue";
import Vuex from "vuex";
import tree from "./modules/tree";
import log from "./modules/log";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    log,
    tree,
  },
});
