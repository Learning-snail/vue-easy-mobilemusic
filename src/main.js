// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import Axios from 'axios'
//store
import store from './vuex'
Vue.prototype.$ajax = Axios
Vue.config.productionTip = false
 //引入mintUi
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
Vue.use(Mint);
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
