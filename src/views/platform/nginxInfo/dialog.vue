<template>
  <el-dialog :title="dialogKind.title" :visible.sync="formVisible" :close-on-click-modal="false">
    <el-form :model="form" label-position="right" label-width="140px" :rules="rules" ref="forms">
      <el-form-item label="内网IP地址：" prop="ipaddrlan">
        <el-input v-model.trim="form.ipaddrlan" placeholder="请输入nginx的内网IP地址" />
      </el-form-item>
      <el-form-item label="外网IP地址：" prop="ipaddrwan">
        <el-input v-model.trim="form.ipaddrwan" placeholder="请输入nginx的外网IP地址" />
      </el-form-item>
      <el-form-item label="所属产品：" prop="product">
        <el-select v-model="form.product" placeholder="请选择所属产品">
          <el-option v-for="item in this.$store.getters.products" :key="item.product" :value="item.product"/>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="item in typeoptions" :key="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
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
import { addNginxInfo, updateNginxInfo } from '@/api/platform/nginxInfo'
import { isvalidIp } from '@/utils/validate'

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
    const validIp = (rule, value, callback) => {
      if (!isvalidIp(value)) {
        callback(new Error('请输入要封禁的合法ip'))
      } else {
        callback()
      }
    }
    return {
      typeoptions: ['user', 'ms', 'inter'],
      productoptions: ['人人中彩票', '天天爱彩票', '嗨玩游戏'],
      // dialog开关
      formVisible: false,
      // 表单数据
      form: {
        ipaddrlan: '',
        ipaddrwan: '',
        product: '',
        type: '',
        remarks: ''
      },
      // 表单规则
      rules: {
        ipaddrlan: [
          {
            required: true,
            trigger: 'blur',
            validator: validIp
          }
        ],
        product: [
          {
            required: true,
            message: '请输入选择所属产品',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择所属类型',
            trigger: 'change'
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
      // 初始化表单数据和表单校验结果（这个resetFields方法有点搞笑，它记录了第一次的非空赋值，所以，还是老老实实的自己把数据置空吧~）
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
      addNginxInfo(form).then(res => {
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
      updateNginxInfo(form.id, form).then(res => {
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
