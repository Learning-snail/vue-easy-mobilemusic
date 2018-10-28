<template>
  <div id="app">
    <audio ref="audio" @timeupdate="musicTimeUpdate" @play="musicPlay" @ended="musicend"  id="audio" autoplay></audio>
    <hd-nav></hd-nav>
    <router-view/>
    <ft-Music class="footmusic"></ft-Music>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed:{
  },
  data(){
    return {

    }
  },
  methods:{
    musicend(){
      this.$store.commit("next")
    },
    musicTimeUpdate(){
      this.$store.state.current=this.$store.state.musicele.currentTime
    },
    musicPlay(){
      // this.$store.commit("set_time",this.$store.state.musicele.duration)
    },
  },
  created(){
    this.$ajax.get('../static/data.json')
      .then(res=>{
        this.user = res.data.user
        this.$store.state.infoall=res.data
        this.$store.dispatch('setAllList',res.data.music)
        console.log(res.data);
      })
  },
  mounted(){
    let audio = document.getElementById("audio");
    this.$store.commit('set_musicele',audio)
  }
}
</script>

<style scoped lang="less">
  .footmusic{
    position: fixed;
    bottom:0;
    left: 0;
  }
  
</style>
