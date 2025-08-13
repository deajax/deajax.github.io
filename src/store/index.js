// src/store/index.js
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      globalCacheData: {}
    }
  },
  mutations: {
    // 添加 SET_GLOBAL_CACHE_DATA mutation
    SET_GLOBAL_CACHE_DATA(state, payload) {
      state.globalCacheData[payload.key] = payload.value
    }
  },
  actions: {
    // 实现 setGlobalCacheData action
    setGlobalCacheData({ commit }, payload) {
      commit('SET_GLOBAL_CACHE_DATA', payload)
    }
  }
})

export default store