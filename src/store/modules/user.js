import http from 'axios'
const state = {
  name: '',
  id: window.sessionStorage.id || '',
  headImgUrl: '',
  group: {
    id: '',
    name: '',
    permissions: {}
  },
  permissions: {}
}
const getters = {
  isLogin (state) {
    return !!state.id
  }
}
const mutations = {
  setUser (state, payload) {
    window.sessionStorage.id = payload.id // 暂时同步用户id来标记登录状态
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
  }
}
const actions = {
  async getUser ({commit}) {
    commit('setUser', (await http.get('/user')).data)
  }
}
export default {
  state, getters, mutations, actions
}
