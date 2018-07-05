const utils = {
  message (message, type) {
    this.$message({
      message: message,
      type: type,
      duration: 5 * 1000,
      showClose: true
    })
  },
  notify (message, type) {
    this.$notify({
      title: '警告',
      message: message,
      type: type,
      duration: 0
    })
  },
  // 异步加载组件
  asyncComponent (path) {
    return () => import(`@/views/${path}`)
  }
}
export default utils
