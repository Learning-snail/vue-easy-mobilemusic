<template>

    <router-link :to="{name:to}" v-text="title" class="commonlist"></router-link>
</template>

<script>
    export default {
        name: "commonList",
        props:['title','to'],

    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .commonlist{
    height: 70/@rem;
    font-size: 14px;
    flex: 1;
    line-height: 70/@rem;
    text-align: center;
  }

</style>
