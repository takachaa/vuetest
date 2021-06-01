import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import loading from './components/Loading'
import VueHead from 'vue-head'


Vue.use(VueHead)

Vue.config.productionTip = false

Vue.component('Loading',loading)

//store.dispatch('autoLogin')

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
});


