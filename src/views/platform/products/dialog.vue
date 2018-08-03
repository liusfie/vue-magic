<template>
  <el-dialog :title="dialogKind.title" :visible.sync="formVisible" :close-on-click-modal="false" class="avatars-dialog" top="2%">
    <el-form :model="form" label-position="right" label-width="140px" :rules="rules" ref="forms">
      <el-form-item label="产品名称：" prop="product">
        <el-input v-model.trim="form.product" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="英文名称：" prop="ename">
        <el-input v-model.trim="form.ename" placeholder="请输入此产品的英文名称"/>
      </el-form-item>
      <el-form-item label="域名后缀：" prop="sname">
        <el-input v-model.number="form.sname" placeholder="请输入此产品的域名后缀"/>
      </el-form-item>
      <el-form-item label="是否有易信号：">
        <el-switch v-model.lazy="form.hasyixin"/>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model.number="form.remarks" placeholder="请输入备注"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import utils from '@/utils/utils'
import { addProduct, updateProduct } from '@/api/platform/products'
import { isvalidDomainName } from '@/utils/validate'

export default {
  props: {
    // 弹出dialog的开关
    initDialog: {
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
    const validDomainName = (rule, value, callback) => {
      if (!isvalidDomainName(value)) {
        callback(new Error('请输入正确的域名'))
      } else {
        callback()
      }
    }
    return {
      // dialog开关
      formVisible: false,
      // 表单数据
      form: {
        product: '',
        ename: '',
        sname: '',
        hasyixin: true,
        remarks: ''
      },
      // 表单规则
      rules: {
        product: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        sname: [
          {
            required: true,
            trigger: 'blur',
            validator: validDomainName
          }
        ]
      }
    }
  },
  watch: {
    // 外部弹出dialog开关
    initDialog (val) {
      // 赋值给内部开关
      this.formVisible = val
    },
    // 内部关闭dialog开关
    formVisible (val) {
      // 打开内部开关的时候，执行初始化dialog
      this.formVisible && this.initDialogData()
      // 向上传递修改外部开关的动作（.sync的语法糖）
      this.$emit('update:initDialog', val)
    }
  },
  methods: {
    // 初始化表单
    initForm () {
      // 初始化表单数据和表单校验结果
      this.$refs.forms.resetFields()
    },
    // 填充表单
    fillUpdate () {
      // 向表单中填充数据
      const keys = Object.keys(this.dialogKind.rowData)
      keys.forEach(key => {
        const { [key]: data } = this.dialogKind.rowData
        this.form[key] = data
      })
    },
    // 初始化dialog
    initDialogData () {
      // 初始化表单
      this.$nextTick(() => {
        // 初始化表单
        this.initForm()
        // 如果是更新操作 填充表单
        this.dialogKind.title === 'update' && this.fillUpdate()
      })
    },
    // 新增提交
    submitAdd () {
      const form = Object.assign({}, this.form)
      addProduct(form).then(res => {
        if (res.code === 201) {
          utils.message.call(this, '新增成功啦~ O(∩_∩)O', 'success')
          this.formVisible = false
          this.$emit('handleRefresh')
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // 更新提交
    submitUpdate () {
      const form = Object.assign({}, this.form)
      updateProduct(form.id, form).then(res => {
        if (res.code === 200) {
          utils.message.call(this, '更新成功', 'success')
          this.formVisible = false
          this.$emit('handleRefresh')
        } else {
          utils.message.call(this, res.detail, 'error')
        }
      })
    },
    // dialog提交
    submit () {
      // 验证表单
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.dialogKind.title === 'add' && this.submitAdd()
          this.dialogKind.title === 'update' && this.submitUpdate()
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
