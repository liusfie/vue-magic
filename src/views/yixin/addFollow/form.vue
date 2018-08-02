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
              <el-select v-model="form.product" placeholder="产品名">
                <el-option label="人人中" value="rrzcp8"/>
                <el-option label="天天爱" value="ttacp8"/>
                <el-option label="嗨玩360" value="hiwan360"/>
                <el-option label="人人爱" value="rracp8"/>
                <el-option label="AI足球" value="aifootball365"/>
                <el-option label="人人红" value="rrhcp8"/>
                <el-option label="虚拟竞猜" value="itaojin8"/>
                <el-option label="所有" value="all"/>
              </el-select>
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

export default {
  data () {
    return {
      // 表单数据
      form: {
        phone: '',
        name: '',
        product: ''
      },
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
  },
  methods: {
    // 提交
    submitAdd () {
      this.loading = true
      const form = Object.assign({}, this.form)
      addFollow(form).then(res => {
        this.loading = false
        console.log(res.detail)
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
