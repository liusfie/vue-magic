<template>
  <router-view></router-view>
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
