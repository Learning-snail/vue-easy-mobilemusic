<template>
    <div id="user" :class="useriff?'active':'off'" @click.stop="hide">
      <div class="left" @click.stop="left">
        <div class="bg" :style="{backgroundImage:'url('+user.bg+')'}">
          <div class="userinfo">
            <img :src="user.avatar" alt="" width=56 height=56 class="avatar">
            <p v-text="user.name"></p>
            <img src="../../../static/images/vip.png" alt="" class="vip">
            <span class="progress">Lv.{{user.grade}}</span>
            <div class="sign" @click="signed">
              <span><i class="icon-coin" v-show="iconshow"></i>{{sign}}</span>
            </div>
          </div>
        </div>
        <!--content-->
        <div class="content">
          <sidelist iconclass="icon-message" sidetitle="我的消息" disc=""></sidelist>
          <sidelist iconclass="icon-vip" sidetitle="我的会员" disc="2018.05.10到期"></sidelist>
          <sidelist iconclass="icon-market" sidetitle="商城" ></sidelist>
          <p></p>
          <sidelist iconclass="icon-friend" sidetitle="我的好友" ></sidelist>
          <sidelist iconclass="icon-place" sidetitle="附近的人"></sidelist>
          <p></p>
          <sidelist iconclass="icon-theme" sidetitle="个性换肤" disc="官方红"></sidelist>
          <sidelist iconclass="icon-set-time" sidetitle="定时播放"></sidelist>
          <sidelist iconclass="icon-lock" sidetitle="音乐闹钟"></sidelist>
          <sidelist iconclass="icon-car" sidetitle="驾驶模式"></sidelist>
          <sidelist iconclass="icon-cloud" sidetitle="音乐云盘"></sidelist>
        </div>
        <!--footer-->
        <div class="footer">
          <div class="nightmode">
            <i class="icon-night"></i>
            <span>夜间模式</span>
          </div>

          <div class="setting">
            <i class="icon-setting"></i>
            <span>设置</span>
          </div>

          <div class="exit">
            <i class="icon-exit"></i>
            <span>退出</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "user",
        computed:{
          useriff(){
            return this.$store.state.useriff
          }
        },
        data(){
          return {
            user:{},
            sign:"未签到",
            iconshow:true
          }
        },
        methods:{
          hide(){
            this.$store.state.useriff=false
          },
          signed(){
            this.sign="已签到"
            this.iconshow=false
          },
          left(){}
        },
        created(){
          this.$ajax.get("../../../static/data.json")
            .then(res=>{
              this.user=res.data.user
            })
        }
    }
</script>

<style scoped lang="less">
  #user{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background:rgba(0,0,0,0.5);
    .left{
      overflow: hidden;
      margin-top: -38px;
      height: 100%;
      width: 23%;
      background-color: #fff;
      .bg{
        position: relative;
        width: 100%;
        height: 200px;
        background-size:cover;
        .userinfo{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          padding-left:20px;
          font-size: 16px;
          color: #fff;
          .avatar{
            display: block;
            border-radius: 50%;
          }
          p{
            display: inline-block;
            margin:2px 0 ;
            font-weight: 500;
            vertical-align: middle;
            max-width: 180px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden
          }
          .vip{
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
          .progress{
            font-size: 8px;
            padding:1px 4px;
            border-radius: 8px;
            color: #fff;
            font-weight: 400;
            border: 1px solid #fff;
            margin-left: 6px;
            vertical-align: middle;
          }
          .sign{
            display: inline-block;
            height: 14px;
            position: absolute;
            bottom: 19px;
            font-size: 12px;
            right: 30px;
            padding: 4px 8px;
            border: 1px solid #e1e1e1;
            border-radius: 12px;
            color: #fff;
          }

        }
      }
      .content{
        position: relative;
        z-index: 1;
        background-color: #fff;
        p{
          margin: 0;
          background:#f0f0f0;
          height:5px;
          border:1px solid #eee
        }
      }
      .footer{
        position:fixed;
        bottom:0;
        height:40px;
        width:23%;
        display: flex;
        background-color: #fff;
        div{
          font-size:16px;
          height:100%;
          padding: 10px;
          color: #000;
          i{
            font-size:18px;
            vertical-align:middle;
          }
          span{
            font-size:16px;
            vertical-align:middle;
          }
        }
      }
    }

  }
  #user.active{
    display: block;
  }
  #user.off{
    display: none;
  }

</style>
