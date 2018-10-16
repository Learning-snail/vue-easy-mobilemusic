import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import hdNav from '../components/header/header'
import musicDetails from '../components/music/musicdetails'
import musicCommend from '../components/findmusic/findrecommend'
import community from '../components/community/community'
import mymusicsheet from '../components/musicsheet/mymusiclsheet'
import musiclist from '../components/music/musiclist'
import back from '../components/header/headerback'
import foot from '../components/foot/foot'
import user from '../components/user/user'
import sidelist from '../components/sidelist/sidelist'
import 'reset.css'
import '../../static/font-icon/demo-files/demo.css'
import '../../static/font-icon/style.css'
Vue.use(Router)
Vue.component('hdNav',hdNav)
Vue.component('hd-back',back)
Vue.component('ftMusic',foot)
Vue.component('user',user)
Vue.component('sidelist',sidelist)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:'/music'
    },
    {
      path: '/music',
      name: 'musicdetails',
      component: musicDetails,
    },
    {
      path: '/findmusic/findrecommend',
      name: 'findmusic',
      component: musicCommend
    },
    {
      path: '/community',
      name: 'community',
      component: community
    },
    {
      path: '/mymusicsheet',
      name: 'mymusicsheet',
      component: mymusicsheet
    },
    {
      path: '/musiclist',
      name: 'musiclist',
      component: musiclist,
    },


  ]
})
