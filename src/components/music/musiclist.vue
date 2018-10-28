<template>
      <div class="songList">
          <hd-back :title="sheetsinfo.name"></hd-back>
        <div class="imgbc" :style="{backgroundImage:'url('+sheetsinfo.img_url+')'}">
        </div>
        <div class="cdbg">
          <i class="orign"></i>
          <div class="pause"  :class="iff?'on':'off'"></div>
          <div class="cd">
          <img :src="sheetsinfo.img_url" alt="" width="100%" height="100%">
          </div>
          <div class="common">
            <i class="icon icon-like"></i>
            <i class="icon icon-download"></i>
            <i class="icon icon-msg"></i>
            <i class="icon icon-list-circle-small"></i>
          </div>
        </div>
        <!--进度条-->
        <div class="time">
          <p class="timestart" v-text="length(current)"></p>
          <i class="line">
            <i class="currentline" :style="{width:currentwidth}"></i>
            <i class="ball" @touchstart.stop="touchstart" @touchmove.stop="touchmove" @touchend.stop="touchend" :style="{left:currentwidth}">
            </i>
          </i>
          <p class="timeend" v-text="length(duration)"></p>
        </div>

        <!--功能-->
          <div class="musicDetailCtrl">
            <i class="playType" :class="musicPlayType()" @click="setPlayType">
            </i>
            <i class="prev icon-prevdetail" @click="prev">
            </i>
            <i class="playPause"  @click="iff?pause():play()" :class="iff? 'icon-pause-detail': 'icon-playdetail'"></i>
            <i class="next icon-nextdetail" @click="next">
            </i>
            <i class="menu icon-list-music" >
            </i>
          </div>
        </div>

</template>

<script>
  import {mapMutations,mapState} from 'vuex'
    export default {
      name: "musiclist",
      computed:{
        currentwidth(){
          return (this.current/this.duration*100).toFixed(2)+'%'
        },
        ...mapState([
          "iff",
          "duration",
          "current",
          "musicele",
          "musicid",
          "sheetsList",
          "sheetsinfo",
          "musicSrc",
        ])
      },
      data(){
        return {
          mp3:"",
          vx:"",
          width:"",
          movewidth:"",
          iffid:false,
        }
      },
      methods:{
        setPlayType(){
          this.$store.state.type=(++this.$store.state.type)%3
        },
        musicPlayType(){
          let className = ''

          switch (this.$store.state.type) {
            case 0:
              className = 'icon-music-shunxu'
              break
            case 1:
              className = 'icon-music-danqu1'
              break
            case 2:
              className = 'icon-music-random'
              break
          }
          return className
        },
        ...mapMutations([
          "pause",
          "play",
        ]),
        length(time){
          let duration = parseInt(time);
          let minute = parseInt(duration / 60);
          let sec = duration % 60 + '';
          let isM0 = ':';
          if (minute === 0)
          {
            minute = '00';
          }
          else if
          (minute < 10)
          {      minute = '0' + minute;    }
          if (sec.length === 1)
          {      sec = '0' + sec;    }
         return minute + isM0 + sec
        },
        touchstart(e){
        },
        touchmove(e){
          let line =document.querySelector(".line")
          let moveWidth=e.targetTouches[0].pageX-line.offsetLeft
          moveWidth=Math.min(line.clientWidth,moveWidth)
          moveWidth=Math.max(0,moveWidth)
          moveWidth=moveWidth/line.clientWidth*100
          this.movewidth=moveWidth
          this.movewidth= this.movewidth/100*this.duration
          this.$store.state.current=this.movewidth
        },
        touchend(){
          this.$store.commit("set_current")
        },
        next(){
          this.$store.commit("next")
          this.$store.commit("set_time")
          this.$store.commit("set_lyric")
        },
        prev(){
          this.$store.commit("prev")
          this.$store.commit("set_time")
          this.$store.commit("set_lyric")
        }

      },
      created(){
        let id = this.$route.query.id
        let item =this.$route.query.item
        if( item ){
          this.$store.commit('set_sheetsList',item.songList)
          this.$store.commit('musicIndex',0)
        }
        this.$ajax.get('../../static/data.json')
          .then(res=>{
            res.data.music.all.forEach(item=>{
              if(this.musicid!==id&& item.id===id &&this.iffid===false){
                this.$store.commit("set_sheetsinfo",item)
                this.$store.commit("set_musicSrc",item.url)
                this.$store.commit("set_time")
                this.$store.commit("set_id",id)
                this.$store.commit("set_lyric")
              }
            })
          })
      },
      mounted(){
        //刷新返回首页
        let that=this
        window.addEventListener('load', function () {
          that.$router.push("/music")
          that.iffid=true
        })
        },
        }
</script>

<style scoped lang="less">
  .songList{
    position: relative;
    z-index:2;
    height: 100vh;
    overflow: hidden;
    .imgbc{
      height: 100%;
      overflow: hidden;
     background-size:cover ;
    }
    .cdbg{
      position: absolute;
      top:60px;
      left:0;
      width: 100%;
      height: 400px;
      .orign{
        display: block;
        width: 80%;
        height: 1px;
        background-image: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0));
        margin: 0 auto;
      }
      .pause{
        position: relative;
        width: 90px;
        height: 140px;
        background-image: url('/static/images/swith.png');
        background-size: cover;
        margin: 0 auto;
        transform-origin: 0 0;
        transition: .3s;
        z-index: 2;
      }
      .cd{
        width: 44vh;
        height: 44vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        transform: translate3d(0, 0, 0);
        background: url('/static/images/cd-mine.png');
        background-size: 100%;
        img{
          width: 64%;
          height: 64%;
          border-radius: 50%;
          margin: 50px
        }
      }
      .common{
        position: absolute;
        left: 0;
        bottom: -20px;
        width: 100%;

        display: flex;
        i{
          flex: 1;
          text-align: center;
          font-size: 30px;
        }
      }
    }
    .time{
      display: flex;
      position: absolute;
      left: 10px;
      bottom: 50px;
      width: 90%;
      height: 40px;
      .line{
        position: relative;
        display: block;
        width: 80%;
        height: 2px;
        background: rgba(244,244,244,0.3);
        .currentline{
          display: block;
          position: absolute;
          top:50%;
          left:0;
          width: 0;
          height: 2px;
          background-color: red;
        }
        .ball{
          display: block;
          position: absolute;
          top:-6px;
          left: 0;
          width: 14px;
          height: 14px;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      p{
        width: 20%;
        height: 100%;
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        margin:-5px 0 0 0;
        text-align: center;
      }
    }
    .musicDetailCtrl{
      display: flex;
      position: absolute;
      left:0;
      bottom: 0;
      width: 100%;
      height: 75px;
      i{
        flex: 1;
        margin-left: 10px;
        text-align: center;
        font-size: 40px;
      }
    }
  }
  .off{
    transform:rotate(-30deg);
  }
  .on{
    transform:rotate(-10deg);
  }
  i{
    color:#fff;
  }

</style>
