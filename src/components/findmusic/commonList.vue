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
  .commonlist{
    height: 35px;
    font-size: 14px;
    flex: 1;
    line-height: 35px;
    text-align: center;
  }

</style>
