<template>
  <el-row type="flex" justify="center">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>NGINX管理</h3><hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <nginx-info-table/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import nginxInfoTable from './table'

export default {
  components: {
    nginxInfoTable
  }
}
</script>

<style scoped>
</style>
