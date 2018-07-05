<template>
  <el-container>
    <el-header>
      <header-bar/>
    </el-header>
    <el-main>
      <h1>欢迎使用</h1>

    </el-main>
  </el-container>
</template>

<script>
import headerBar from '@/components/headerbar.vue'
export default {
  name: 'index',
  components: {headerBar}
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
