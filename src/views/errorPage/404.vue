<template>
  <div style="background:#f0f2f5;margin-top: -20px;">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="imgPic404" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS! {{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页</div>
        <a href="" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
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
      return '特朗普说这个页面你不能进......'
    }
  }
}
</script>

<style scoped>

</style>
