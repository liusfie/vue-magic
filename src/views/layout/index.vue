<template>
    <el-container>
      <el-header>
        <header-bar/>
      </el-header>
      <el-container>
        <el-aside><aside-bar/></el-aside>
      <el-main>
        <router-view/>
      </el-main>
      </el-container>
    </el-container>
</template>

<script>
import headerBar from '@/components/headerbar.vue'
import asideBar from '@/components/asidebar.vue'

export default {
  name: 'index',
  components: {headerBar, asideBar}
}
</script>

<style scoped>
  .el-container {
    height: 100%;
  }
  .el-aside{
    background-color:#F7FCFC;
    border-right: solid 1px #e6e6e6;
  }
</style>
