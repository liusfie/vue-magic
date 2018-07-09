<template>
    <el-container>
      <el-header>
        <header-bar/>
      </el-header>
      <el-container>
      <el-main>
        <router-view/>
      </el-main>
      </el-container>
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

</style>
