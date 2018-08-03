<template>
  <el-row>
    <el-col>
      <el-row>
        <el-col>
          <el-form :model="form" class="demo-form-inline" :rules="rules" ref="forms" label-width="90px">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model.number="form.phone" placeholder="请填写手机号"/>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model.trim="form.name" placeholder="请填写员工姓名"/>
            </el-form-item>
            <el-form-item label="产品：">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"/>
              <el-checkbox-group v-model="form.products" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="oneProduct in allProducts" :label="oneProduct" :key="oneProduct">{{ oneProduct }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="onSubmit">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-col>
    <el-card class="box-card" shadow="never">
      <div><strong>处理结果：</strong></div><br>
      <div v-for="one in panelData" :key="one">
        {{ one }}
      </div>
    </el-card>
  </el-row>
</template>

<script>
import { addFollow } from '@/api/yixin/follow'
import { getProducts } from '@/api/platform/products'
import utils from '@/utils/utils'

export default {
  data () {
    return {
      // 表单数据
      form: {
        phone: '',
        name: '',
        products: ['人人中彩票']
      },
      allProducts: [],
      checkAll: false,
      isIndeterminate: true,
      // 按钮加载状态
      loading: false,
      panelData: [],
      // 表单规则
      rules: {
        phone: [
          {
            required: true,
            type: 'number',
            trigger: 'blur',
            min: 10000000000,
            max: 19999999999,
            message: '请填写正确的手机号'
          }
        ]
      }
    }
  },
  created () {
    this.initCheckbox()
  },
  methods: {
    // 获取所有产品列表
    fetchAPI (params) {
      this.loading = true
      getProducts(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          var list = []
          res.data.list.forEach(function (value) {
            if (value.hasyixin === true) {
              list.push(value.product)
            }
          })
          this.allProducts = list
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 初始化复选框数据
    initCheckbox () {
      const initQuery = {
        pageNum: 1,
        pageSize: 10000
      }
      this.fetchAPI(initQuery)
    },
    // 全选
    handleCheckAllChange (val) {
      this.form.products = val ? this.allProducts : []
      this.isIndeterminate = false
    },
    // 复选框
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.allProducts.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allProducts.length
    },
    // 提交
    submitAdd () {
      this.loading = true
      this.form.products = JSON.stringify(this.form.products)
      const form = Object.assign({}, this.form)
      addFollow(form).then(res => {
        this.loading = false
        this.panelData = res.detail
      })
    },
    onSubmit () {
      // 验证表单
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.submitAdd()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-form-item {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-input {
    width: 280px;
  }
</style>
