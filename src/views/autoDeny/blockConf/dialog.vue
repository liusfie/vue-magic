<template>
  <el-dialog :title="dialogKind.title" :visible.sync="formVisible" :close-on-click-modal="false" class="avatars-dialog" top="2%">
    <el-form :model="form" label-position="right" label-width="140px" :rules="rules" ref="forms">
      <el-form-item label="名称：" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="域名：" prop="server_name">
        <el-input v-model.trim="form.server_name" placeholder="请输入名称，如：api.ttacp8.com"/>
      </el-form-item>
      <el-form-item label="阈值：" prop="threshold">
        <el-input v-model.number="form.threshold" placeholder="请输入触发封禁的阈值"/>
      </el-form-item>
      <el-form-item label="增长量：" prop="increase">
        <el-input v-model.number="form.increase" placeholder="请输入触发封禁的增长量"/>
      </el-form-item>
      <el-form-item label="是否激活：" prop="valid">
        <el-switch v-model.lazy="form.valid"/>
      </el-form-item>
      <el-form-item label="备注：" prop="remarks">
        <el-input v-model.trim="form.remarks" placeholder="请输入备注"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import utils from '@/utils/utils'
import { addBlockconf, updateBlockconf } from '@/api/autoDeny/blockConfAPI'

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
    return {
      // dialog开关
      formVisible: false,
      // 表单数据
      form: {
        name: '',
        server_name: '',
        threshold: '',
        increase: '',
        // switch组件手动开启后，新增数据默认valid为空，所以加了个默认值为true
        valid: true,
        remarks: ''
      },
      // products: [],
      // 表单规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        server_name: [
          {
            required: true,
            message: '请输入要封禁的域名',
            trigger: 'blur'
          }
        ],
        threshold: [
          {
            required: true,
            type: 'number',
            min: 1,
            max: 9999,
            message: '请填写封禁阈值（数字 1~9999）',
            trigger: 'blur'
          }
        ],
        increase: [
          {
            required: false,
            type: 'number',
            min: 1,
            max: 9999,
            message: '请填写封禁的增长量（数字 1~9999）',
            trigger: 'blur'
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
      // 初始化表单数据和表单校验结果 （这个resetFields方法有点搞笑，它记录了第一次的非空赋值，所以，还是老老实实的自己把数据置空吧~）
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
      addBlockconf(form).then(res => {
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
      updateBlockconf(form.id, form).then(res => {
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
