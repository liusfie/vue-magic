<template>
  <div>
    <el-container>
      <el-header>
        <header-bar></header-bar>
      </el-header>
      <el-container>

      <el-main>
        <router-view/>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerBar from '@/components/headerbar.vue'
import sideBar from '@/components/sidebar.vue'

export default {
  name: 'index',
  components: {headerBar, sideBar}
}
</script>

<style scoped>

</style>
