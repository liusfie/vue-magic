<template>
  <el-row class="table-config">
    <el-col>
      <el-row>
        <el-col>
          <el-table
    :data="tableData"
     v-loading="loading">
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="server_name" label="域名"></el-table-column>
      <el-table-column align="center" prop="threshold" label="阈值"></el-table-column>
      <el-table-column align="center" prop="increase" label="增长量"></el-table-column>
      <el-table-column align="center" prop="valid" label="启用"></el-table-column>
      <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-col :span="12">
            <el-button type="primary" size="small" @click="updateDialog(scope.row)">修改</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" size="small" @click="deleteDialog(scope.row)">删除</el-button>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" class="insert" @click="showAddDialog">新增</el-button>
        </el-col>
        <el-col :span="12">
          <add-update-dialog @handleRefresh="initTable" :dialogKind="dialogKind" :initDialog.sync="initDialog"></add-update-dialog>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import utils from '@/utils/utils'
import { getBlockconf, deleteBlockconf } from '@/api/autoDeny/blockConfAPI'
import addUpdateDialog from './dialog'

export default {
  components: {
    // 添加、修改dialog
    addUpdateDialog
  },
  filters: {},
  data () {
    return {
      // 配置种类表格数据
      tableData: [],
      // 表格加载状态
      loading: false,
      // 初始化dialog
      initDialog: false,
      // dialog数据
      dialogKind: {
        title: '',
        rowData: {}
      }
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    // 初始化表格数据
    initTable () {
      this.fetchAPI()
    },
    // 请求api
    fetchAPI () {
      this.loading = true
      getBlockconf().then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        if (res.code === 20000) {
          this.tableData = res.data
        } else {
          utils.message.call(this, res.msg, 'error')
        }
      })
    },
    // 触发dialog
    showAddDialog () {
      // 暂时解决日期时间组件的弹出层不跟随dialog
      document.body.scrollTop = 0
      this.dialogKind.title = 'add'
      this.dialogKind.rowData = {}
      this.initDialog = true
    },
    // 触发修改dialog
    updateDialog (rowData) {
      // 暂时解决日期时间组件的弹出层不跟随dialog
      document.body.scrollTop = 0
      this.dialogKind.title = 'update'
      this.dialogKind.rowData = Object.assign({}, rowData)
      this.initDialog = true
    },
    // 触发删除dialog
    deleteDialog (rowData) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteBlockconf(rowData.id).then(res => {
            if (res.code === 200) {
              utils.message.call(this, '删除成功!', 'success')
              // 刷新页面
              this.initTable()
            } else {
              utils.message.call(this, res.msg, 'error')
            }
          })
        })
        .catch(() => {
          utils.message.call(this, '已取消删除!', 'info')
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .table-config {
    .insert {
      margin-top: 10px;
    }
  }
</style>
