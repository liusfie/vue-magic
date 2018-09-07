<template>
  <div style="text-align: center">
    <h1 style="margin: 10px;font-size: 63px">Magic Web Service</h1>
    <p style="font-size: 21px">欢迎使用MAGIC运维平台</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  // 刷新时或由其它路由跳转过来时调用
  beforeRouteEnter (to, from, next) {
    next()
  },
  // 该组件被复用时调用（访问其子路由时调用）
  beforeRouteUpdate (to, from, next) {
    next()
  }
}
</script>

<style scoped>
</style>
