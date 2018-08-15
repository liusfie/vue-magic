<template>
  <el-row type="flex" justify="center">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>内部IP网段</h3><hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <own-network-table/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import ownNetworkTable from './table'

export default {
  components: {
    ownNetworkTable
  }
}
</script>

<style scoped>
</style>
