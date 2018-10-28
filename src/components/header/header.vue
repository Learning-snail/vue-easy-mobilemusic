<template>
    <div class="header">
      <user></user>
  <div class="header-warpper">
    <i class="menu icon-menu icon" @click="showuser"></i>
    <div class="middle" >
      <router-link  :to="{name:'musicdetails'}" class="router" active-class="active">
        <i class="music icon-music icon"></i>
      </router-link>
      <router-link  :to="{name:'findmusic'}" class="router">
        <i class="find icon-wangyi icon"></i>
      </router-link>
      <router-link  :to="{name:'community'}" class="router">
        <i class="community icon-community icon"></i>
      </router-link>
    </div>
    <i class="search icon-search icon"></i>
  </div>
</div>
  <!-- <router-link tag="i" to="/search"> -->

  <!-- </router-link> -->

</template>

<script>
    export default {
        name: "hdNav",
      props:{
        index: {
          type: Number,
          default: 0
        },
      },
        data(){
          return {
            select:this.index,
            iff:false
          }
        },
      methods:{
        showuser(){
          this.$store.state.useriff=true
        }
        }
      }

</script>

<style scoped lang="less">
  .header{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #c62f2f;
    .header-warpper{
      height: 100%;
      display: flex;
      justify-items: center;
      justify-content: space-between;
      .middle{
        width: 200px;
        height:100%;
        display: flex;
        a{
          flex: 1;
          display: block;
          height: 100%;
          i{
            display: block;
            margin-top: 10px;
          }
      }
      }
      .menu,.search{
        padding-top: 12px;
      }
    }
    .icon {
      /* 通过设置 font-size 来改变图标大小 */
      width: 1em;
      height: 1em;
      fill: currentColor;
      overflow: hidden;
      font-size: 28px;
      color: #fff;
    }
    .active > i{
      color:#ccafaf
    }
  }

</style>
