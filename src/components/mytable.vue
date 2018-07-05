<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :stripe=true>
    <template v-for="(value, key) in columnData.prop">
    <el-table-column
      align="center"
      :key="key"
      :prop="value"
      :label="columnData.label[key]">
    </el-table-column>
    </template>
    <el-table-column v-if="columnData.action" align="center" label="操作">
      <template slot-scope="scope">
        <template v-for="(value, key) in columnData.action">
          <el-button :key="key"
          size="mini"
          @click='"handle"+value(scope.$index, scope.row)'>{{value}}</el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'mytable',
  props: {
    columnData: {
      type: Object,
      default: function () {
        return []
      }},
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
