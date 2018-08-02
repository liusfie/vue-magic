<template>
  <el-row type="flex" justify="center" class="game-rules-config">
    <el-col :span="22">
      <el-row>
        <el-col>
          <h3>删除关注权限</h3><hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <delete-follow-form/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import deleteFollowForm from './form'

export default {
  components: {
    deleteFollowForm
  }
}
</script>

<style scoped>
</style>
