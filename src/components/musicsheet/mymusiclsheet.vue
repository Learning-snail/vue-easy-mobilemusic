<template>
  <div>
    <div class="top">
      <hd-back title="歌单"></hd-back>
      <img :src=imgUrl alt="">
    </div>
    <div class="musicall">
      <i class="icon-music"></i>
      <span class="text">播放全部</span>
      <span class="count">(共{{sheets.count}}首)</span>
    </div>
    <div class="musiclist">
      <div v-for="(item,index) in sheets.info" :key="index">
        <a href="javascript:;" @click="show(item,index)">
          <p v-text="index+1" class="number"></p>
          <div class="content">
          <p v-text="item.name" class="name"></p>
          <p v-text="item.singer" class="singer"></p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        computed:{
          ...mapState([
            "current",
            "musicele",
            "musicid",
            "sheetsList",
            "iff",
            "sheetsinfo"
          ])
        },
        name: "mymusiclsheet",

        data(){
          return {
            sheets:{},
            imgUrl:""
          }
        },
      methods:{
        show(item,index){
          if( this.musicid===item.id )return
          this.$store.commit("set_sheetsinfo",item)
          this.$store.commit("set_show")
          this.$store.commit("set_id",item.id)
          this.$store.commit('set_sheetsList',this.sheets.info)
          this.$store.commit('musicIndex',index)
          this.$store.commit("set_musicSrc",item.url)
          this.$store.commit('set_time')
          this.$store.commit("play")
        },
      },
        created(){
          let id = this.$route.query.id
          let index = this.$route.query.index
          this.$ajax.get('../../static/data.json')
            .then(res=>{
              if( !(id===undefined) ){
                this.sheets=res.data.music.sheets[id].detail[index];
                this.imgUrl =this.sheets.info[0].img_url
              }else{
                this.sheets=res.data.findmusic.reconmmend.recommendMinSheets[index];
                this.imgUrl =this.sheets.info[0].img_url
              }
            })
        },
    }
</script>

<style scoped lang="less">
  .top{
    height: 380px;
    img{
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      z-index: 1;
    }
  }
  .musicall{
    padding: 5px 5px 0 5px;
    border-bottom: 1px solid #eeefef;
    font-size: 16px;
    .text{
      font-size: 14px;
      color:#333;
    }
    .count{
      font-size: 10px;
      color:#aaa
    }
  }
  .musiclist{
    a{
      height: 50px;
      display: flex;
      color:#ccc;
      .number{
        font-size: 14px;
        padding:5px 25px 0 5px;
      }
      .content{
        padding:10px 0;
        border-bottom: 1px solid #eeefef;
        font-size: 14px;
        .name{
          color:#333;
          margin-bottom: 3px;
        }

        p{
          margin: 0;
        }

    }
    }
  }

</style>
