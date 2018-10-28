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
      <!--<i></i>-->
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
  .foot{
    width: 100%;
    height:40px;
    background-color: #fff;
    display: flex;
    .box{
      width: 90%;
      height: 100%;
      display: flex;
      .img{
        padding: 5px 10px 0;
        width:39px;
        height: 39px;
      }
    }
    .content {
      height: 100%;
      font-size: 12px;
      .name {
        color: #333;
        margin:3px 0;
      }
    }
    .playPause{
      font-size: 40px;
      cursor: pointer;
    }
    p{
      margin: 0;
    }

  }
  .hide{
    display: none;
  }

</style>
