<template>
  <el-row type="flex" justify="center">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>封禁列表</h3><hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <block-list-table/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import blockListTable from './table'

export default {
  components: {
    // 封禁列表表格组件
    blockListTable
  }
}
</script>

<style scoped>
</style>
