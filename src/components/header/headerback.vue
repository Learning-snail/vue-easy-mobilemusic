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
  .header{
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 50px;
    font-size: 20px;
    padding:10px 10px;
    z-index: 2;
    color:#fff;
    .back{
      margin:10px;
    }
    .search{
      position: fixed;
      top:10px;
      right: 15px;
      font-size: 25px;
    }
    }

</style>

