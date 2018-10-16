<template>
    <div class="header" >
      <i class="back icon-back" @click="back"></i>
      <span v-text="title"></span>
      <i class="search icon-search"></i>
    </div>
</template>

<script>
   import {mapState} from 'vuex'
    export default {
        name: "headerback",
        props:['title'],
        computed:{
          ...mapState([
            "iff",
            "musicele"
          ])
        },
        data(){
          return{
          }
        },
        methods:{
          back(){
            window.history.go(-1)
          }
        },
        beforeDestroy(){
          if( this.musicele ){
            if( this.iff ){
              this.$store.commit("play")
            }
          }
        }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .header{
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100/@rem;
    font-size: 40/@rem;
    padding:20/@rem 20/@rem;
    z-index: 2;
    color:#fff;
    .back{
      margin:20/@rem 20/@rem;
    }
    .search{
      position: fixed;
      top:20/@rem;
      right: 30/@rem;
      font-size: 50/@rem;
    }
    }

</style>

