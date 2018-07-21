<template>
  <el-row type="flex" justify="center" :class="className">

    <el-col :span="22">
      <!-- 标题部分 -->
      <el-row v-if="titleObj.page">
        <el-col><h3>{{ titleObj.page }}</h3></el-col>
      </el-row>

      <!-- 条件查询 -->
      <el-row v-if="queryList.length">
        <el-col>
          <el-form :inline="true" :model="queryForm">
            <!-- 循环条件框 -->
            <el-form-item v-for="(queryInfo, index) in queryList" :key="index" :label="queryInfo.label">
              <!-- select 下拉框 -->
              <el-select v-if="queryInfo.type === 'select'" v-model="queryForm[queryInfo.prop]" placeholder="请选择" style="width: 150px" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="(selectInfo,index) in queryInfo.selectList" :key="index"
                  :label="selectInfo.text"
                  :value="selectInfo.prop"></el-option>
              </el-select>
              <!-- input类型 -->
              <el-input v-else v-model.trim="queryForm[queryInfo.prop]"></el-input>
            </el-form-item>
            <!-- 查询按钮 -->
            <el-form-item>
              <el-button type="primary" @click="fetchQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!-- table部分 -->
      <el-row>
        <el-col>
          <el-table :data="tableData.list" stripe border v-loading="loading" element-loading-text="拼命加载中">
            <!-- 序号 -->
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>

            <!-- 循环 -->
            <el-table-column
              v-for="(tableInfo, index) in tableList" :key="index"
              :prop="tableInfo.prop"
              :label="tableInfo.label">
              <template slot-scope="scope">
                <img v-if="tableInfo.type === 'img'" :src="initText(scope.row, tableInfo)" style="width: 50px;height: 50px">
                <p v-else>{{ initText(scope.row, tableInfo) }}</p>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column v-if="operateList && operateList.length" prop="operate" label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  v-for="(operate, index) in operateList" :key="index"
                  :type="operate.classType"
                  size="small"
                  @click="opration(operate, scope.row, operate.prop)">{{ operate.text || '这是个按钮?' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 页码 -->
      <el-row type="flex">
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="tableData.pageNum" :page-sizes="[10,20,50,100]" :page-size="tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"></el-pagination>
        </el-col>
      </el-row>

      <!--  新增 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" class="insert" @click="showAddDialog">新增</el-button>
        </el-col>
      </el-row>

      <!-- 弹窗 -->
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <add-update-dialog
            @handleRefresh="handlePage"
            @changeType="changeType"
            :dialogKind="dialogKind"
            :initDialog.sync="initDialog"
            :title="titleObj.dialog"
            :formList="formList"
            :formValue="formValue"
            :ApiUrls="ApiUrls"></add-update-dialog>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import utils from '@/utils/utils'
import { formatDate } from '@/filters/format'
import addUpdateDialog from './dialog'

export default {
  props: {
    // 父节点的名称
    className: {
      type: String,
      default: 'config-wrap'
    },
    // 标题
    pageTitle: {
      type: String,
      default: '配置、查询平台'
    },
    titleObj: {
      type: Object,
      default () {
        return {
          page: '配置、查询平台',
          dialog: '配置信息新增、修改'
        }
      }
    },
    // 查询条件
    queryList: {
      type: Array,
      default () {
        return []
      }
    },
    // table信息
    tableList: {
      type: Array,
      default () {
        return []
      }
    },
    // 操作栏
    operateList: {
      type: Array,
      default () {
        return []
      }
    },
    // 接口们
    ApiUrls: {
      type: Object,
      default () {
        return {}
      }
    },
    formList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    addUpdateDialog
  },
  data () {
    return {
      // 表格中数据加载状态
      loading: false,
      // 初始化dialog
      initDialog: false,
      // 查询条件
      queryForm: {},
      // 表格展示数据
      tableData: [],
      // dialog数据
      dialogKind: {
        title: '',
        rowData: {}
      },
      formValue: {}
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    // 展示的文案
    initText (rowInfo, dataInfo) {
      const keyName = dataInfo.prop
      const type = dataInfo.type
      if (!keyName) return
      let value = ''
      switch (type) {
        // 时间需要格式化
        case 'time':
          value = formatDate(rowInfo[keyName])
          break
        // select格式的展示文案
        case 'switch':
          if (!(dataInfo.filterList)) {
            console.error('烦请联系FE同学： 请声明filterList字段给出匹配数据')
            return
          };
          dataInfo.filterList.map((item) => {
            if (item.prop === rowInfo[keyName]) {
              value = item.text
            }
          })
          break
        // 直接展示后端字段返回的信息
        default:
          value = rowInfo[keyName]
          break
      }
      return value || '未指定'
    },
    // 格式化日期
    formatDate (row, column, cellValue) {
      return formatDate(cellValue)
    },
    // 返回图片地址
    initImageUrl () {

    },
    /**
     * 操作栏的函数
     * operation: 操作类型
     * rowData: 数据
     * prop: 参数值
     */
    opration (operation, rowData, prop) {
      switch (operation.type) {
        // 修改
        case 'modify': // 修改
          this.updateDialog(rowData)
          break
        // 删除
        case 'delete':
          if (!(this.ApiUrls) || !(this.ApiUrls).deleteData) {
            this.errText(`ApiUrls: deleteData参数`)
            return
          }
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.ApiUrls && this.ApiUrls.deleteData && this.ApiUrls.deleteData((prop && rowData[prop]) || rowData.id)
                .then(res => {
                  if (+res.code === 200) {
                    utils.message.call(this, '删除成功!', 'success')
                    // 刷新数据
                    this.handlePage()
                  } else {
                    utils.message.call(this, res.detail, 'error')
                  }
                })
            })
            .catch(() => {
              utils.message.call(this, '已取消删除!', 'info')
            })
          break
        // 其他操作，需提供执行函数
        default:
          if (!(operation.fn)) {
            this.errText(`operateList：${operation.type}类型的按钮中fn参数`)
            return
          }
          operation.fn && operation.fn(rowData)
          break
      }
    },
    // 触发修改dialog
    updateDialog (rowData) {
      document.body.scrollTop = 0
      // form数据
      this.formValue = rowData
      // 弹窗信息
      this.dialogKind.title = 'update'
      this.dialogKind.rowData = Object.assign({}, rowData)
      // 显示dialog
      this.initDialog = true
    },
    // 初始化表格数据
    initTable () {
      const initQuery = {
        pageNum: 1,
        pageSize: 10
      }
      this.fetchAPI(initQuery)
    },
    // 查询数据
    fetchAPI (params) {
      // 正在拼命加载
      this.loading = true
      // 获取数据的接口
      const fn = this.ApiUrls.getData
      // 开始请求
      fn && fn(params).then(res => {
        // 请求完了
        setTimeout(() => { this.loading = false }, 500)
        // 处理接口响应
        if (res.code === 200) {
          this.tableData = res.data && res.data // 成功
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 按条件查询
    fetchQuery () {
      this.fetchAPI(this.queryForm)
    },
    // 每页大小改变
    handleSizeChange (val) {
      // 处理每页大小改变的蝴蝶效应
      this.changedPageSize(val)
      // 查询
      this.handlePage()
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
    // 当前页的改变
    handleCurrentChange () {
      this.handlePage()
    },
    // 重新获取数据 (每次都从当前页开始)
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
    // 显示新增弹窗
    showAddDialog () {
      // 暂时解决日期时间组件的弹出层不跟随dialog
      document.body.scrollTop = 0
      this.dialogKind.title = 'add'
      this.dialogKind.rowData = {}
      this.initDialog = true
    },
    // 错误提示
    errText (keyName) {
      const text = `烦请联系FE同学：${keyName}尚未声明`
      console.error(text)
      return false
    },
    /**
     * 触发了切换
     * porp: 属性名
     * value: 现在实际的输入值
     */
    changeType (prop, value) {
      this.$emit('changeType', prop, value)
    }
  }
}
</script>

<style lang="less" scoped>
.insert {
  margin-top: 10px;
}
.el-pagination {
  margin-top: 10px;
  position: relative;
  float: right;
}
</style>
