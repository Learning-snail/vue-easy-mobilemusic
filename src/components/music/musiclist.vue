<template>
      <div class="songList">
        <audio ref="audio" @timeupdate="musicTimeUpdate" @play="musicPlay" @ended="musicend" :src="musicSrc" id="audio" autoplay></audio>
          <hd-back :title="sheetsinfo.name"></hd-back>
        <div class="imgbc">
          <img :src='sheetsinfo.img_url' alt="" class="songimg" width="100%" height="100%">
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
        musicend(){
          this.$store.commit("next")
        },
        musicTimeUpdate(){
          this.$store.state.current=this.musicele.currentTime
        },
        musicPlay(){
          this.$store.commit("set_time",this.musicele.duration)
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
        },
        touchend(){
          this.movewidth= this.movewidth/100*this.duration
          this.$store.state.current=this.movewidth
          this.$store.commit("set_current")
        },
        next(){
          this.$store.commit("next")

        },
        prev(){
          this.$store.commit("prev")
        }

      },
      created(){
        let id = this.$route.query.id
        let item =this.$route.query.item
        if( item ){
          this.$store.commit('set_sheetsList',item.songList)
          this.$store.commit('musicIndex',0)
        }
        if( this.musicid===id ){
          this.iffid=true
        }
        this.$store.commit("set_id",id)
        this.$ajax.get('../../static/data.json')
          .then(res=>{
            res.data.music.all.forEach(item=>{
              if( item.id===id ){
                this.$store.commit("set_sheetsinfo",item)
                this.$store.commit("set_musicSrc",item.url)
              }
            })

          })

      },
      mounted(){
        if( this.$store.state.musicele ){
          if( this.$store.state.iff   ){
            this.$store.commit("pause")
            this.$store.state.iff=true
          }else{
            this.$store.commit("pause")
          }

        }
        let audio = document.getElementById("audio");
        this.$store.commit('set_musicele',audio)
        if( this.iffid ){
          this.$store.commit("set_current")
          if( !this.$store.state.iff ){
            audio.removeAttribute("autoplay")
            this.$store.commit("pause")
          }
        }else{
          this.$store.state.iff=true
        }

        //刷新返回首页
        let that=this
        window.addEventListener('load', function () {
          that.$router.push("/music")
          that.$store.commit("pause")
        })
        },
      beforeCreate(){
        this.$store.commit("set_hide")
      },
      beforeDestroy(){
        this.$store.commit("set_show")
        if( this.iff ){
            this.$store.commit("play")
          this.$store.state.iff=true
        }
        }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .songList{
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    .imgbc{
      overflow: hidden;
      width: 100%;
      height: 100%;
      .songimg{
        filter: blur(40px);
        transform: scale(1.5);
      }
    }

    .cdbg{
      position: absolute;
      top:120/@rem;
      left:0;
      width: 100%;
      height: 800/@rem;
      .orign{
        display: block;
        width: 80%;
        height: 1px;
        background-image: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0));
        margin: 0 auto;
      }
      .pause{
        position: relative;
        width: 180/@rem;
        height: 280/@rem;
        background-image: url('/static/images/swith.png');
        background-size: cover;
        margin: 0 auto;
        transform-origin: 0 0;
        z-index: 1;
        transition: .3s;
      }
      .cd{
        width: 44vh;
        height: 44vh;
        position: absolute;
        top: 140/@rem;
        left: 92/@rem;
        transform: translate3d(0, 0, 0);
        background: url('/static/images/cd-mine.png');
        background-size: 100%;
        img{
          width:62%;
          height: 62%;
          border-radius: 50%;
          margin: 110/@rem;
        }
      }
      .common{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 80/@rem;
        display: flex;
        i{
          flex: 1;
          height: 100%;
          margin-top: 80/@rem;
          text-align: center;
        }
      }
    }
    .time{
      display: flex;
      position: absolute;
      left: 20/@rem;
      bottom: 100/@rem;
      width: 90%;
      height: 80/@rem;
      .line{
        position: relative;
        display: block;
        width: 80%;
        height: 4/@rem;
        background: rgba(244,244,244,0.3);
        .currentline{
          display: block;
          position: absolute;
          top:50%;
          left:0;
          width: 0;
          height: 4/@rem;
          background-color: red;
          z-index: 1;
        }
        .ball{
          display: block;
          position: absolute;
          top:-12/@rem;
          left: 0;
          width: 28/@rem;
          height: 28/@rem;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      p{
        width: 20%;
        height: 100%;
        font-size: 24/@rem;
        color: rgba(255,255,255,0.8);
        margin:-10/@rem 0 0 0;
        text-align: center;
      }
    }
    .musicDetailCtrl{
      display: flex;
      position: absolute;
      left:0/@rem;
      bottom: 0;
      width: 100%;
      height: 130/@rem;
      i{
        flex: 1;
        margin-left: 20/@rem;
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
