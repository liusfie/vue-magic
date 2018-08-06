<template>
  <el-dialog :title="dialogtitle" :visible.sync="formVisible" :close-on-click-modal="false">
    <el-transfer
      :titles="titles"
      filterable
      filter-placeholder="请输入用户名"
      v-model="hasProducts"
      :props="{key: 'id', label: 'username'}"
      :data="userdata"
      @change="handleChange">
    </el-transfer>
    <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button type="primary" @click="closethisdialog">关闭</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
import utils from '@/utils/utils'
import { getAllInfo } from '@/api/login'
import { addUserProducts, deleteUserProducts, getUserProducts } from '@/api/platform/products'

export default {
  props: {
    // 弹出dialog的开关
    initUserDialog: {
      type: Boolean,
      default: false,
      required: true
    },
    // 传递给dialog的数据
    dialogKind: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      titles: ['未添加', '已添加'],
      dialogtitle: '用户管理：',
      // dialog开关
      formVisible: false,
      // 表单数据
      userdata: [],
      hasProducts: []
    }
  },
  watch: {
    // 外部弹出dialog开关
    initUserDialog (val) {
      // 赋值给内部开关
      this.formVisible = val
    },
    // 内部关闭dialog开关
    formVisible (val) {
      // 打开内部开关的时候，执行初始化dialog
      this.formVisible && this.initDialogData()
      // 向上传递修改外部开关的动作（.sync的语法糖）
      this.$emit('update:initUserDialog', val)
    }
  },
  methods: {
    // 请求api
    fetchAPI () {
      this.loading = true
      getAllInfo().then(res => {
        this.loading = false
        if (res.code === 200) {
          this.userdata = res.data
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 请求已添加的用户
    fetchUserAPI (params) {
      this.loading = true
      getUserProducts(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.hasProducts.push(res.data[i].usernameid)
            }
          }
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 初始化表单
    initForm () {
      // 初始化穿梭框
      const initQuery = {
        product: this.dialogKind.id
      }
      this.dialogtitle = '用户管理：' + this.dialogKind.product
      this.fetchAPI()
      this.fetchUserAPI(initQuery)
    },
    // 初始化dialog
    initDialogData () {
      // 初始化表单
      this.$nextTick(() => {
        this.initForm()
      })
    },
    // 关闭dialog
    closethisdialog () {
      this.formVisible = false
    },
    handleChange (value, direction, movedKeys) {
      const data = {}
      data.keys = movedKeys
      data.productid = this.dialogKind.id
      if (direction === 'right') {
        addUserProducts(data).then(res => {
          if (res.code === 201) {
            utils.message.call(this, '更新成功', 'success')
          } else {
            utils.message.call(this, res.detail, 'error')
          }
        })
      } else if (direction === 'left') {
        deleteUserProducts(data).then(res => {
          if (res.code === 200) {
            utils.message.call(this, '删除成功', 'success')
          } else {
            utils.message.call(this, res.detail, 'error')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
