<template>
    <div class="musicsheet">
      <div class="top" @click="show(sheets[1])" >
      <i class="icon-down icon"></i>
      <span v-text="sheets[0].name" class="title" ></span>
        <span class="count">({{sheets[0].count}})</span>
      </div>

      <div class="hidden">
        <div v-for="(item,index) in sheets[0].detail" :key="index" class="detail">
          <router-link :to="{name:'mymusicsheet' ,query:{id:sheets[1],index:index}}">
          <img :src="item.info[0].img_url" alt="" width="100%" height="100%">
          <div class="name">
            <p v-text="item.name" ></p>
            <p>{{item.count}}首歌曲</p>
          </div>
          </router-link>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "musicsheet",
        props:['sheets'],
      computed:{
      },
        methods:{
          show(index){
            let aDiv = document.querySelectorAll(".hidden")
            let oI = document.querySelectorAll(".icon-down")
            aDiv[index].classList.toggle("active")
            oI[index].style.transform=aDiv[index].classList.contains("active")?'rotate(0)':'rotate(-90deg)'
          },
        },

    }
</script>

<style scoped lang="less">
  .top{
    position: relative;
    height: 28px;
    background-color: #e1e1e1;
    .icon,.title,.count{
      position: absolute;
      top:30%;
      left:25px;
      font-size: 12px;
      //line-height: 28/@rem;
    }
    .icon{
      transition: .3s;
      left:10px;
      transform: rotate(-90deg);
    }
    .count{
      left:100px;
    }

  }
  .detail{
    height: 60px;
    border: 1px solid #e3e4e4;
    background-color: #f3f3f3;
    img{
      width:50px;
      height:50px;
      margin: 5px 0 0 5px;
    }
    .name{
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .hidden{
    display: none;
  }
  .active{
    display: block;
  }
  a{
    width:100%;
    height:100%;
    display: flex;
  }

</style>
