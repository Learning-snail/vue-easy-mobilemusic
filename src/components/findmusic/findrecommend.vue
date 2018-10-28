<template>
    <div class="mb">
      <div class="header"></div>
      <div class="commonList">
        <com-hd to="findmusic" title="个性推荐" active-class="active"></com-hd>
        <com-hd to="musicdetails" title="主播电台"></com-hd>
        <com-hd to="musicdetails" title="排行榜"></com-hd>
      </div>

      <div class="swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in recommendImageList" :key="index">
            <router-link  :to="{name:'musiclist' ,query:{ id:item.songList[0].id,index:index,item:item}}" >
            <img :src="item.src" v-lazy="item.src"  alt="" >
            <div class="logo" v-text="item.type" :style="{backgroundColor:item.color}"></div>
            </router-link>
          </mt-swipe-item>
          
        </mt-swipe>
      </div>

      <div class="recommend-type">
        <div>
          <i class="icon-type icon-fm"></i>
          <p class="title">私人FM</p>
        </div>
        <div>
          <i class="icon-type icon-date"></i>
          <p class="title">每日听歌推荐</p>
        </div>
        <div>
          <i class="icon-type icon-rank-list"></i>
          <p class="title">云音乐热歌榜</p>
        </div>
      </div>

      <div>
        <div class="findsheettitle">
          <span>推荐歌单</span>
          <i class="icon icon-right"></i>
        </div>
        <!--九宫格-->
        <div class="recommend">
        <div v-for="(item,index) in recommendMinSheets" :key="index" class="MinSheets">
          <router-link :to="{name:'mymusicsheet',query:{index:index}}">
          <img :src="item.info[0].img_url" alt="">
            <p v-text="item.bottomtitle" ></p>
          </router-link>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
    import commonList from './commonList'
    export default {
      name: "findrecommend",
      data(){
        return {
          recommendImageList:{},
          recommendMinSheets:{}

        }
      },
      created(){
        this.$ajax.get('../../static/data.json')
          .then(res=>{
            this.recommendImageList = res.data.findmusic.reconmmend.recommendImageList
            this.recommendMinSheets= res.data.findmusic.reconmmend.recommendMinSheets
          })
      },
      mounted(){

      },
      components:{
          "com-hd":commonList
      },
      methods:{
        // nameChange(e){
        //   let commonList = document.querySelector(".commonList")
        //   let child = commonList.children
        //   for (let i = 0, length = child.length; i < length; i++) {
        //     child[i].classList.remove("active")
        //   }
        //   e.srcElement.classList.add("active")
        // },

      }
    }
</script>

<style scoped lang="less">
  .header{
    height:50px;
  }
  .commonList{
    display: flex;
  }
  .active{
    color:red;
    border-bottom: 2px solid #c62f2f;
    text-align: center;
  }
  .swipe{
    position:relative;
    width:100%;
    height: 400px;
    img{
      width:100%;
      height:100%;
    }
    .logo{
      position: absolute;
      right:0;
      bottom: 0;
      width:50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color:#fff;
      font-size: 14px;
    }
  }
  .recommend-type{
    display: flex;
    div{
      flex: 1;
      padding: 0 10px;
      text-align: center;
    .icon-type{
      display: inline-block;
      color: #c62f2f;
      font-size: 32px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #c62f2f;
      border-radius: 50%;
      margin-top:15px;
    }
      .title{
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .findsheettitle{
    position: relative;
    height: 35px;
    font-size: 16px;

    span{
      display: inline-block;
      height: 18px;
      line-height: 18px;
      font-weight: 400;
      padding-left:15px;
    }
    span:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height:18px;
      width: 3px;
      background: #c62f2f;
    }
  }
  .recommend{
    .MinSheets{
      float: left;
      width:33%;
      height: auto;
      margin-right: 2px;
      a{
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 80%;

        }
        p{
          margin: 0;
          padding: 0 3px;
          height: 20%;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-bottom: 20px;
        }
      }
    }
  }

</style>
