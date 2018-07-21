<template>
  <el-dialog title="活动信息" :visible.sync="formVisible" :close-on-click-modal="false" class="activities-dialog" top="8%">
    <el-form :model="form" label-position="right" label-width="180px" :rules="rules" ref="forms">
      <el-form-item label="活动id：" prop="activityId">
        <el-input v-model.trim="form.activityId" :readonly="dialogKind.title === 'update'"></el-input>
      </el-form-item>
      <el-form-item label="活动系列：" prop="activitySeries">
        <el-input v-model.trim="form.activitySeries" placeholder="请输入活动系列"></el-input>
      </el-form-item>
      <el-form-item label="活动名称：" prop="activityName">
        <el-input v-model.trim="form.activityName" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间：" prop="beginTime">
        <el-date-picker type="datetime" v-model="form.beginTime" placeholder="请选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间：" prop="endTime">
        <el-date-picker type="datetime" v-model="form.endTime" placeholder="请选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动链接：" prop="activityUrl">
        <el-input v-model.trim="form.activityUrl" placeholder="请输入活动链接"></el-input>
      </el-form-item>
      <el-form-item label="活动内容：" prop="activityContent">
        <el-input v-model.trim="form.activityContent" placeholder="请输入活动内容"></el-input>
      </el-form-item>
      <el-form-item label="活动发起者：" prop="founder">
        <el-input v-model.trim="form.founder" placeholder="请输入活动发起者"></el-input>
      </el-form-item>
      <el-form-item label="活动开发者：" prop="developer">
        <el-input v-model.trim="form.developer" placeholder="请输入活动开发者"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model.trim="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { addBlockconf, updateBlockconf } from '@/api/autoDeny/blockConfAPI'
import utils from '@/utils/utils'
import { formatDate } from '@/filters/format'

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
  computed: {
    isVirtualType () {
      return this.form.type === 'VIRTUAL'
    }
  },
  data () {
    return {
      // dialog开关
      formVisible: false,
      // 表单数据
      form: {
        activityContent: '',
        activityId: '',
        activityName: '',
        activitySeries: '',
        activityUrl: '',
        beginTime: '',
        developer: '',
        endTime: '',
        founder: '',
        remark: ''
      },
      timeArr: ['beginTime', 'endTime'],
      // 表单规则
      rules: {
        activityId: [
          { required: true, message: '请输入活动id', trigger: 'blur' }
        ],
        activitySeries: [
          { required: true, message: '请输入活动系列', trigger: 'blur' }
        ],
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        beginTime: [
          {
            required: true,
            message: '请输入日期时间',
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请输入日期时间',
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
        // 如果是日期时间格式，赋值转换为日期时间格式
        if (this.timeArr.indexOf(key) > -1) {
          this.form[key] = formatDate(new Date(data))
          // 如果是非日期时间格式，按正常传递赋值
        } else {
          this.form[key] = data
        }
      })
    },
    // 初始化dialog
    initDialogData () {
      // nextTick，保证dom加载完成之后，初始化
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
        if (res.code === 200) {
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
      updateBlockconf(form).then(res => {
        if (res.code === 200) {
          utils.message.call(this, '更新成功啦~ O(∩_∩)O', 'success')
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
<style lang="less">

</style>
