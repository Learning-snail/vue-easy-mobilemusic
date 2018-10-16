<template>
    <div>
      <!--我的音乐-->
      <my-Music></my-Music>
      <router-view/>
    </div>
</template>

<script>
  import mymusic from '../mymusic/mymusic'
    export default {
        name: "musicdetails",
        components:{
          'my-Music':mymusic
        }
    }
</script>

<style scoped>

</style>
