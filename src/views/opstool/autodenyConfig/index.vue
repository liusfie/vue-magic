<template>
  <mytable v-if="loading" :tableData="tableData" :columnData="columnData" ></mytable>
</template>

<script>
import { getTableData } from '@/api/autodeny'
import mytable from '@/components/mytable.vue'
export default {
  name: 'index',
  components: {mytable},
  data () {
    return {
      columnData: null,
      tableData: null,
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    getData () {
      getTableData(this.listQuery).then(response => {
        this.columnData = response.data.columnData
        this.tableData = response.data.tableData
        this.loading = true
      })
    }
  }
}
</script>

<style scoped>
</style>
