export const state = () => ({
  dialog: {
    isShow: false,
    title: '',
    message: '',
  },
  overlay: false,
  items: [],
})

export const getters = {
  getDialog(state) {
    return state.dialog
  },
  getOverlay(state) {
    return state.overlay
  },
  getitems(state) {
    return state.items
  },
}

export const mutations = {
  set_dialog(state, payload) {
    state.dialog = {
      ...state.dialog,
      ...payload,
    }
  },
  set_overlay(state) {
    state.overlay = !state.overlay
  },
  set_items(state, payload) {
    state.items.push(payload)
  },
}

export const actions = {
  setDialog({ commit }, data) {
    commit('set_dialog', data)
  },
  toggleOverlay({ commit }) {
    commit('set_overlay')
  },
  async setItems({ commit }) {
    const dataBase = this.$fire.firestore
      .collection('assignments')
      .orderBy('due', 'desc')
    const dbResults = await dataBase.get()
    dbResults.forEach((doc)=>{
      
        commit('set_items', {
            id: doc.id,
            name: doc.data().name,
            due: doc.data().due,
            id: doc.id,
        })
    })
  },
}
