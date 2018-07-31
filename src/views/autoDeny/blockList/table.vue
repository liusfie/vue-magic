<template>
  <el-row class="table-config">
    <el-col>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="queryForm">
            <el-form-item label="">
              <el-input placeholder="检索" v-model.trim="queryForm.searchcont" @keyup.enter.native="fetchQuery">
              <el-button slot="append" icon="el-icon-search" @click="fetchQuery"/>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showAddDialog">新增</el-button>
              <el-button type="primary" @click="initTable">刷新</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col>
          <el-table :data="tableData.list" stripe border v-loading="loading" size="medium" max-height="500" @row-click="openDetails" highlight-current-row>
            <el-table-column align="center" prop="denyip" label="封禁IP"/>
            <el-table-column align="center" prop="server_name" label="域名"/>
            <el-table-column align="center" prop="begintime" label="开始时间"/>
            <el-table-column align="center" prop="endtime" label="结束时间"/>
            <el-table-column align="center" prop="remarks" label="备注"/>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-col :span="12">
                  <el-button type="primary" icon="el-icon-edit" size="small" @click="updateDialog(scope.row)"/>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteDialog(scope.row)"/>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-pagination class="insert" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="tableData.pageNum" :page-sizes="[10,20,50,100]" :page-size="tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"/>
          <add-update-dialog @handleRefresh="handlePage" :dialogKind="dialogKind" :initDialog.sync="initDialog"/>
        </el-col>
      </el-row>
    </el-col>
    <tablepanel :panelData="panelData"/>
  </el-row>
</template>

<script>
import utils from '@/utils/utils'
import { getBlocklist, deleteBlocklist, getBlocklistDetail } from '@/api/autoDeny/blockListAPI'
import addUpdateDialog from './dialog'
import Tablepanel from '@/components/tablepanel'

export default {
  components: {
    Tablepanel,
    // 添加、修改dialog
    addUpdateDialog
  },
  data () {
    return {
      // 查询表单
      queryForm: {
        searchcont: '',
        pageSize: 10,
        pageNum: 1
      },
      // 配置种类表格数据
      tableData: {
        list: [],
        // 当前页
        pageNum: 1,
        // 当前每页大小
        pageSize: 10,
        // 总条目
        total: 1
      },
      // 表格加载状态
      loading: false,
      // 初始化dialog
      initDialog: false,
      // dialog数据
      dialogKind: {
        title: '',
        rowData: {}
      },
      panelData: {}
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    // 显示细节信息
    openDetails (row) {
      getBlocklistDetail(row.id).then(res => {
        if (res.code === 200) {
          this.panelData = res.data
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 初始化表格数据
    initTable () {
      const initQuery = {
        pageNum: 1,
        pageSize: 10
      }
      this.queryForm.searchcont = ''
      this.fetchAPI(initQuery)
    },
    // 请求api
    fetchAPI (params) {
      this.loading = true
      getBlocklist(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 查询（每次都从当前页开始）
    handlePage () {
      // 查询条件
      const pageForm = {
        ...this.queryForm,
        pageNum: this.tableData.pageNum || 1,
        pageSize: this.tableData.pageSize || 10
      }
      // 请求API
      this.fetchAPI(pageForm)
    },
    // 查询表格数据
    fetchQuery () {
      this.fetchAPI(this.queryForm)
    },
    // 每页大小改变的蝴蝶效应
    changedPageSize (val) {
      // 更新表格数据中的每页大小
      this.tableData.pageSize = val
      // 当前页是否超过了最大页
      const maxPageNum = Math.ceil(
        this.tableData.total / this.tableData.pageSize
      )
      if (this.tableData.pageNum > maxPageNum) {
        this.tableData.pageNum = maxPageNum
      }
      // 当前页是否小于1
      if (this.tableData.pageNum < 1) {
        this.tableData.pageNum = 1
      }
    },
    // 每页大小改变
    handleSizeChange (val) {
      // 处理每页大小改变的蝴蝶效应
      this.changedPageSize(val)
      // 查询种类
      this.handlePage()
    },
    // 当前页的改变
    handleCurrentChange () {
      // 查询种类
      this.handlePage()
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
      this.$confirm('此操作将删除该配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteBlocklist(rowData.id).then(res => {
            if (res.code === 200) {
              utils.message.call(this, res.detail, 'success')
              // 刷新页面
              this.initTable()
            } else {
              utils.message.call(this, res.detail, 'error')
              this.initTable()
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
      margin-bottom: 10px;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
