<template>
    <div class="mb">
      <!--头部状态-->
      <!--<hd-Nav ></hd-Nav>-->
      <type-list count="28" class="icon-music icon" title="我的音乐"></type-list>
      <type-list count="18" class="icon-zuijinplay icon" title="最近播放"></type-list>
      <type-list count="1" class="icon-diantai icon" title="我的电台"></type-list>
      <type-list count="3" class="icon-collect icon" title="我的收藏"></type-list>
      <music-sheet v-for="(item,index) in getAllList" :key="index" :sheets=[item,index]></music-sheet>
    </div>
</template>

<script>
  import typelist from '../typelist/typelist'
  import musicsheet from '../musicsheet/musicsheet'
  import {mapGetters} from 'vuex'
    export default {
        name: "mymusic",
        data(){
          return {
            sheets:[]
          }
        },
      computed:{
        getAllList(){
          return this.$store.getters.getAllList.sheets
        }
      },
      components:{
          'type-list':typelist,
          'music-sheet':musicsheet
      },
      created(){
          this.$ajax.get('')
      },

    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{}
  .icon{
    padding-left: 20/@rem;
    font-size: 20px;
    line-height: 100/@rem;
    color:#aaa;
    background: rgb(247, 247, 247);
  }
  .icon:before{
    color:red;
  }

</style>
