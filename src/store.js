import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isLog: window.sessionStorage.setItem('isLog')=='true'?true:false
  },
  getters:{
    getIsLog(state){
      return state.isLog
    }
  },
  mutations: {
    saveLogState(state, key) {
      state.isLog = key
    }
  },
  actions: {
    setIsLog({commit}) {
      axios.post('/adminIsLog').then(res => {
        if (res.data == 'ok') {
          commit('saveLogState', true)
          window.sessionStorage.setItem('isLog','true')
        } else {
          commit('saveLogState', false)
          window.sessionStorage.setItem('isLog','false')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
})

export default store
