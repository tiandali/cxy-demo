import { getRel } from '@/api/entity';
const state = {
  relData: {},

}
const mutations = {
  SET_REL: (state, data) => {
    console.log('data: ', data);
    state.relData = data;
  },
}
const actions = {
  getRelData({ commit }, params) {
    console.log('params: ', params);
    const { title } = params
    return new Promise((resolve, reject) => {
      getRel({ title: title }).then(response => {
        const { data } = response
        commit('SET_REL', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
