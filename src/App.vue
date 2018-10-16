<template>
  <div id="app">
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
  created(){
    remchange()
    window.addEventListener('resize',remchange)
    function remchange() {
      let html = document.querySelector('html')
      let width = html.getBoundingClientRect().width
      if( width>=750 ){
        width=750
      }
      html.style.fontSize = width/10+'px';
    }
    this.$ajax.get('../static/data.json')
      .then(res=>{
        this.user = res.data.user
        this.$store.state.infoall=res.data
        this.$store.dispatch('setAllList',res.data.music)
      })
  },
}
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .footmusic{
    position: fixed;
    bottom:0;
    left: 0;
  }
  
</style>
