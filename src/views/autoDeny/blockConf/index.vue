<template>
  <el-row type="flex" justify="center" class="game-rules-config">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>封禁配置
          </h3>
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
    // 封禁配置表格组件
    blockConfTable
  }
}
</script>

<style scoped>
</style>
