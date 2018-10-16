const audio= {
  state: {
    //音乐全部信息
    musicAllList: [],
    //我的收藏sheets
    musicSheets: [],
    //音乐列表
    musicList: []
  },
  mutations: {
    setAllList(state, obj) {
      state.musicAllList = obj
      state.musicList = obj.music
    },
    setSheets(state, obj) {
      state.musicSheets = obj
    }
  },
  actions: {
    setAllList({commit}, obj) {
      commit('setAllList', obj)
    }
  },
  getters: {
    getAllList: (state) => state.musicAllList,
  },
}
export default audio
