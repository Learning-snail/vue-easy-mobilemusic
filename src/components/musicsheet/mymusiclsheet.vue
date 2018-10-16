<template>
  <div>
    <audio ref="audio" @timeupdate="musicTimeUpdate"  id="audio" autoplay></audio>
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
          //判断原来存在的音乐节点，有则让他暂停
          if( this.$store.state.musicele ){
            //让暂停和播放的状态恢复到原来
              this.$store.commit("pause")
              this.$store.state.iff=true
          }
          let audio=document.getElementById("audio")
          audio.src=item.url
          this.$store.commit("set_sheetsinfo",item)
          this.$store.commit("set_show")
          this.$store.commit("set_id",item.id)
          this.$store.commit('set_musicele',audio)
          this.$store.commit('set_sheetsList',this.sheets.info)
          this.$store.commit('musicIndex',index)

        },
        musicTimeUpdate(){
          this.$store.state.current=this.musicele.currentTime
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
  @rem:750/10rem;
  .top{
    height: 500/@rem;
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
    padding: 10/@rem 10/@rem 0 10/@rem;
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
      height: 100/@rem;
      display: flex;
      color:#ccc;
      .number{
        font-size: 14px;
        padding:10/@rem 50/@rem 0 10/@rem;
      }
      .content{
        padding: 20/@rem 0;
        border-bottom: 1px solid #eeefef;
        font-size: 14px;
        .name{
          color:#333;
          margin-bottom: 6/@rem;
        }

        p{
          margin: 0;
        }

    }
    }
  }

</style>
