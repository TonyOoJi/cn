import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态。
    captchaMsg: '发送验证码'
  },
  actions: {
    // Actions 即是定义提交触发更改信息的描述，常见的例子有从服务端获取数据，
    // 在数据获取完成后会调用store.commit()来调用更改 Store 中的状态。可以在组件中使用dispatch来发出 Actions。
    updateCaptchaMsg ({ commit }, data) {
      commit('UPDATE_CAPTCHA_MSG', data)
    }
  },
  mutations: {
    // 调用 mutations 是唯一允许更新应用状态的地方。
    UPDATE_CAPTCHA_MSG (state, data) {
      state.captchaMsg = data
    }
  },
  getters: {
    // Getters 允许组件从 Store 中获取数据，譬如我们可以从 Store 中的 projectList 中筛选出已完成的项目列表
    getCaptchaMsg: function (state) {
      return state.captchaMsg
    }
  },
  modules: {
    // modules 对象允许将单一的 Store 拆分为多个 Store 的同时保存在单一的状态树中。
  }
})
export default store
