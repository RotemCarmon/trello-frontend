import Vue from 'vue'
import Vuex from 'vuex';
import boardStore from './modules/board-store.js';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    boardStore,
  }
})
