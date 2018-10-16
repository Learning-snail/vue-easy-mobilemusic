<template>
    <div :class="show?'foot':'hide'">
      <router-link class="box" :to="{name:'musiclist',query:{id:sheetsinfo.id}}">
        <img :src="sheetsinfo.img_url" alt="" class="img">
        <div class="content">
          <p v-text="sheetsinfo.name" class="name"></p>
          <p v-text="sheetsinfo.singer" class="singer"></p>
        </div>
      </router-link>
      <i class="playPause"  @click="iff?pause():play()" :class="iff? 'icon-pause-detail': 'icon-playdetail'"></i>
      <i></i>
    </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
    export default {
      name: "foot",
      computed:{
        ...mapState([
          "sheetsinfo",
          "iff",
          "mp3",
          "musicele",
          "show"
          ])
      },
      methods:{
      ...mapMutations([
          "pause",
          "play",
        ])
      },
      created(){

      },
      mounted(){

      }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .foot{
    width: 100%;
    height:80/@rem;
    background-color: #fff;
    display: flex;
    .box{
      width: 590/@rem;
      height: 100%;
      display: flex;
      .img{
        padding: 10/@rem 20/@rem 0;
        width:78/@rem;
        height: 78/@rem;
      }
    }
    .content {
      height: 100%;
      font-size: 12px;
      .name {
        color: #333;
        margin: 6/@rem 0;
      }
    }
    p{
      margin: 0;
    }

  }
  .hide{
    display: none;
  }

</style>
