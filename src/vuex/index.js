import Vuex from 'vuex'
import Vue from 'vue'
import audio from './module/audio'
Vue.use(Vuex)
let store =new Vuex.Store({
    state:{
      infoall:[],
      sheetsList:{},//储存音乐列表
      iff:true,
      current:"",  //当前时间
      duration:"", //总时长
      musicele:"",  //目标元素
      sheetsinfo:{},
      show:false, //下边的播放器 是显示 否不显示
      musicid:"", //储存id
      musicIndex:0, //歌曲的位置
      musicSrc:"",//歌曲的src
      useriff:false,
      type:0
    },
    mutations:{
      //歌曲的路径
      set_musicSrc(state,src){
        state.musicSrc=src
      },
      //歌曲的位置
      musicIndex(state,index){
        state.musicIndex=index
      },
      //下一首
      next(state){
        let length=state.sheetsList.length
        switch (state.type) {
          case 0:
            state.musicIndex++
                break
          case 1:
                break
          case 2:
            state.musicIndex=state.musicIndex+Math.floor(Math.random()*(length-state.musicIndex))
                break
        }
        if (state.musicIndex >= length) {
          state.musicIndex = 0
        }
        state.sheetsinfo=state.sheetsList[state.musicIndex]
        state.musicele.setAttribute('src', state.sheetsList[state.musicIndex].url)
        state.musicele.load()
        if( !state.iff ){
          state.iff=true
        }
      },
      //上一首
      prev(state){
        state.musicIndex--
        let length=state.sheetsList.length
        if (state.musicIndex <0) {
          state.musicIndex = length-1
        }
        state.sheetsinfo=state.sheetsList[state.musicIndex]
        state.musicele.setAttribute('src', state.sheetsList[state.musicIndex].url)
        state.musicele.load()
        if( !state.iff ){
          state.iff=true
        }
      },
      //设置总时间
      set_time(state,duration){
          state.duration=duration
      },
      //设置目前时长
      set_currentTime(state,currentTime){
        state.current = currentTime
      },
      //设置元素时长
      set_vedioTime(state){
        state.musicele.currentTime=state.current
      },
      //获取路径
      set_audioSrc(state,audiosrc){
        state.audiosrc=audiosrc
      },
      //设置目标元素
      set_musicele(state,ele){
        state.musicele=ele
      },
      play(state){
        state.iff=true
        state.musicele.play()
      },
      pause(state){
        state.iff=false
        state.musicele.pause()
      },
      //状态改变
      statechange(state){
        state.iff=!state.iff
      },
      //改变vedio的currentTime
      set_current(state){
        state.musicele.currentTime=state.current
      },
      //设置
      set_sheetsinfo(state,sheetsinfo){
        state.sheetsinfo = sheetsinfo
      },
      //改变底部播放器的状态
      set_show(state){
        state.show=true
      },
      set_hide(state){
        state.show=false
      },
      set_id(state,id){
        state.musicid=id
      },
      set_sheetsList(state,info){
        state.sheetsList=info
      }
    },
    getters:{
        filter(state){
          state.sheets = state.infoall.music.sheets
        },

    },
    actions:{
      getCurrent({commit},duration){
        commit("set_currentTime",duration)
      },
    },
  modules:{
      audio
  }
})
export default store
