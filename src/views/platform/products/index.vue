<template>
  <el-row type="flex" justify="center">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>产品管理</h3><hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <block-conf-table/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import blockConfTable from './table'

export default {
  components: {
    blockConfTable
  }
}
</script>

<style scoped>
</style>
