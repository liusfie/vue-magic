<template>
  <el-dialog :title="dialogKind.title" :visible.sync="formVisible" :close-on-click-modal="false">
    <el-form :model="form" label-position="right" label-width="140px" :rules="rules" ref="forms">
      <el-form-item label="封禁IP：" prop="denyip" >
        <el-input v-model.trim="form.denyip" placeholder="请输入要封禁的ip" :disabled="ifdenyip"/>
      </el-form-item>
      <el-form-item label="域名：" prop="server_name">
        <el-input v-model.trim="form.server_name" placeholder="请输入名称，如：api.ttacp8.com" :disabled="ifserver_name" />
      </el-form-item>
      <el-form-item label="开始时间：" prop="begintime">
        <el-date-picker type="datetime" v-model="form.begintime" placeholder="请输入开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false" :disabled="ifbegintime"/>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endtime">
        <el-date-picker type="datetime" v-model="form.endtime" placeholder="请输入结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false"/>
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
import { addBlocklist, updateBlocklist } from '@/api/autoDeny/blockListAPI'
import { formatDate } from '@/filters/format'
import { isvalidIp, isvalidDomainName } from '@/utils/validate'

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
        denyip: '',
        server_name: '',
        product: '',
        begintime: '',
        endtime: '',
        remarks: ''
      },
      timeArr: ['begintime', 'endtime'],
      ifdenyip: false,
      ifserver_name: false,
      ifbegintime: false,
      // products: [],
      // 表单规则
      rules: {
        denyip: [{required: true, trigger: 'blur', validator: validIp}],
        server_name: [
          {
            required: true,
            trigger: 'blur',
            validator: validDomainName
          }
        ],
        begintime: [
          {
            required: true,
            message: '请输入开始日期时间',
            trigger: 'blur'
          }
        ],
        endtime: [
          {
            required: true,
            message: '请输入结束日期时间',
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
        if (this.timeArr.indexOf(key) > -1) {
          this.form[key] = formatDate(new Date(data))
        } else {
          this.form[key] = data
        }
      })
    },
    // 初始化dialog
    initDialogData () {
      // 初始化表单
      this.$nextTick(() => {
        // 初始化表单
        this.ifdenyip = false
        this.ifserver_name = false
        this.ifbegintime = false
        this.initForm()
        // 如果是更新操作 填充表单
        if (this.dialogKind.title === 'update') {
          this.fillUpdate()
          this.ifdenyip = true
          this.ifserver_name = true
          this.ifbegintime = true
        }
      })
    },
    // 新增提交
    submitAdd () {
      this.form.productid = this.$store.getters.productid
      const form = Object.assign({}, this.form)
      addBlocklist(form).then(res => {
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
      updateBlocklist(form.id, form).then(res => {
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
