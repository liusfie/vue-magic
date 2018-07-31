<template>
  <div style="background:#f0f2f5; height: 100%;" align="center">
      <div>
        <img :src="imgPic404" alt="404">
      </div>
        <div>Sorry, {{ message }}</div>
        <a href="/#/home">返回首页</a>
    </div>
</template>

<script>
import imgPic404 from '@/assets/404_images/404.png'

export default {
  data () {
    return {
      imgPic404
    }
  },
  computed: {
    message () {
      return 'this page not exist!'
    }
  }
}
</script>

<style scoped>
</style>
