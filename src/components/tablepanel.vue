<template>
  <div class="tablepanel">
  <el-card class="box-card" shadow="hover">
    <div v-for="(value, key) in panelData" :key="key" class="text item">
      <el-col :span="12">
        <b>{{ key }}：</b><span>{{ value }}</span></el-col>
    </div>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'tablepanel',
  props: {
    // 传递给panel的数据
    panelData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
