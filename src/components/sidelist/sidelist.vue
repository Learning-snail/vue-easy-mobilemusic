<template>
  <div class="sidelist">
    <i class="icon" :class="iconclass"></i>
    <span class="title">{{sidetitle}}</span>
    <span class="disc" v-show="disc">{{disc}}</span>
  </div>
</template>

<script>
  export default {
    props:["iconclass","sidetitle","disc"],
    data () {
      return {
        showDisc:false
      }
    },
    methods:{

    }

  }
</script>

<style lang="less" scoped>
  @rem:750/10rem;
  .sidelist{
    position:relative;
    width:100%;
    height:80/@rem;
    line-height:80/@rem;
    font-size:0;
    padding:0 30/@rem;
    .icon,.title{
      display:inline-block;
      vertical-align:middle;
    }
    .icon{
      font-size:32/@rem;
      margin-right:6px;
      color:#9a9a9a;
    }
    .title{
      font-size:14px;
      color:#333;
    }
    .disc{
      position:absolute;
      right:90/@rem;
      font-weight:400;
      top:50%;
      transform:translate3d(0,-50%,0);
      color:#9c9c9c;
      font-size:10px;
    }
  }
</style>
