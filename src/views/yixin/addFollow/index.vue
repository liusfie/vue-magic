<template>
  <el-row type="flex" justify="center" class="game-rules-config">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>新增关注权限</h3><hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <add-follow-form/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import addFollowForm from './form'

export default {
  components: {
    addFollowForm
  }
}
</script>

<style scoped>
</style>
