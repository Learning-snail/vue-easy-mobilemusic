<template>
    <div class="typelist">
      <i :class="classname" class="icon"></i>
      <span class="title">{{title}}</span>
      <span class="count">({{count}})</span>
    </div>
</template>

<script>
    export default {
        name: "typelist",
        props:['count','title','classname']
    }
</script>

<style scoped lang="less">
  .typelist{
    height:50px;
    border-bottom: 1px solid #ccc;
    .title{
      font-size: 16px;
      font-weight: 400;
      color:#333;

    }
    .count{
      font-size: 10px;
    }
  }

</style>
