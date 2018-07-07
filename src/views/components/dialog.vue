<template>
  <el-dialog :title="title" :visible.sync="formVisible" :close-on-click-modal="false" class="avatarLevels-dialog" top="8%">
    <!-- 表单信息 -->
    <el-form :model="form" label-position="right" label-width="180px" :rules="rules" ref="forms">
      <el-form-item
        v-for="(formInfo, index) in formList" :key="index"
        :label="formInfo.label"
        :prop="formInfo.prop">
        <!-- 数字 -->
        <el-input v-if="formInfo.type === 'number'" v-model.number="form[formInfo.prop]" :placeholder="formInfo.placeholder"></el-input>
        <!-- 图片 -->
        <upload v-else-if="formInfo.type === 'image'" :form="form" :action="uploadAction(formInfo.function || 'uploadImg')" :imgUrl="formInfo.prop" :ref="formInfo.prop"></upload>
        <!-- 时间 -->
        <el-date-picker v-else-if="formInfo.type === 'time'" type="datetime" v-model="form[formInfo.prop]" :placeholder="formInfo.placeholder" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false"></el-date-picker>
        <!-- radio 单选框 -->
        <el-radio-group v-else-if="formInfo.type === 'radio'" v-model="form[formInfo.prop]" @change="changeRadio(formInfo)">
          <el-radio-button
            v-for="(radioInfo,index) in formInfo.radioList" :key="index"
            :label="radioInfo.prop">{{ radioInfo.text }}</el-radio-button>
        </el-radio-group>
        <!-- select 下拉框 -->
        <el-select v-else-if="formInfo.type === 'select'" v-model="form[formInfo.prop]" placeholder="请选择" style="width: 150px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(selectInfo, index) in formInfo.selectList" :key="index" :label="selectInfo" :value="selectInfo"></el-option>
        </el-select>
        <!-- 普通 input -->
        <el-input v-else v-model.trim="form[formInfo.prop]" :placeholder="formInfo.placeholder"></el-input>

      </el-form-item>
    </el-form>

    <!-- 提交按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import upload from '@/components/upload/index'
import { formatDate } from '@/filters/format'
import utils from '@/utils/utils'

export default {
  components: {
    upload
  },
  props: {
    // 弹窗的标题
    title: {
      type: String,
      default: ''
    },
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
    },
    // form信息们
    formList: {
      type: Array,
      default () {
        return []
      }
    },
    formValue: {
      type: Object,
      default () {
        return {}
      }
    },
    ApiUrls: {
      type: Object,
      default () {
        return {}
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
      // 初始化数据
      this.initData()
      // 打开内部开关的时候，执行初始化dialog
      this.formVisible && this.initDialogData()
      // 向上传递修改外部开关的动作（.sync的语法糖）
      this.$emit('update:initDialog', val)
    }
  },
  data () {
    return {
      // dialog开关
      formVisible: false,
      // 表单中数据
      form: {},
      // 填写规则
      rules: {},
      // 图片数组
      uploadArr: [],
      // 时间数组
      timeArr: [],
      // 切换事件
      changeArr: []
    }
  },
  methods: {
    initDialogData () {
      // 初始化表单
      this.$nextTick(() => {
        if (this.dialogKind.title === 'add') {
          this.form = {}
        } else {
          this.form = this.formValue
        }
        // 初始化表单
        this.initForm()
        // 如果是更新操作 填充表单
        this.dialogKind.title === 'update' && this.fillUpdate()
      })
    },
    // 初始化规则， 图片
    initData () {
      if (!this.formList.length) return
      this.formList.forEach((item) => {
        const rules = item.rules
        // 初始化规则信息
        if (rules) { this.rules[item.prop] = rules }
        // 图片类型要处理
        if (item.type === 'image') { this.uploadArr.push(item.prop) }
        // 时间类型要处理
        if (item.type === 'time') { this.timeArr.push(item.prop) }
        // 切换触发相应事件
        if (item.changeFn) { this.changeArr.push(item.prop) }
      })
    },
    // 初始化表单数据和表单校验结果
    initForm () {
      // （这个 resetFields 方法有点搞笑，它记录了第一次的非空赋值，所以，还是老老实实的自己把数据置空吧~）
      this.$refs.forms.resetFields()
      // 初始化图片上传
      this.uploadArr.forEach(item => {
        this.$refs[item][0].initUpload()
      })
    },
    // 向表单中填充数据
    fillUpdate () {
      const keys = Object.keys(this.form)
      keys.forEach(key => {
        const { [key]: data } = this.dialogKind.rowData
        if (this.timeArr.indexOf(key) > -1) {
          // 如果是日期时间格式，赋值转换为日期时间格式
          this.form[key] = formatDate(new Date(data))
        } else {
          // 如果是非日期时间格式，按正常传递赋值
          this.form[key] = data
        }
        // 填充上传图片组件的数据
        if (this.uploadArr.indexOf(key) > -1) {
          this.$refs[key][0].fillUpload(data)
        }
        // 要触发切换事件
        if (this.changeArr.indexOf(key) > -1) {
          this.$emit('changeType', key, this.form[key])
        }
      })
    },
    // 切换 radio 点击
    changeRadio (formInfo) {
      if (!formInfo.changeFn) return
      /**
       * formInfo.prop,属性
       * this.form[formInfo.prop], 具体选择的值
       * 作为参数传出去
       */
      this.$emit('changeType', formInfo.prop, this.form[formInfo.prop])
    },
    // dialog 提交
    submit () {
      // 验证表单
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.dialogKind.title === 'add' && this.submitAdd()
          this.dialogKind.title === 'update' && this.submitUpdate()
        }
      })
    },
    submitAdd () {
      const form = Object.assign({}, this.form)
      this.ApiUrls.postData && this.ApiUrls.postData(form).then(res => {
        if (res.code === 200) {
          utils.message.call(this, '添加成功啦~ O(∩_∩)O', 'success')
          this.formVisible = false
          this.$emit('handleRefresh')
        } else {
          utils.message.call(this, res.msg, 'error')
        }
      })
    },
    submitUpdate () {
      const form = Object.assign({}, this.form)
      this.ApiUrls.putData && this.ApiUrls.putData(form, form.id || '').then(res => {
        if (res.code === 200) {
          utils.message.call(this, '更新成功啦~ O(∩_∩)O', 'success')
          this.formVisible = false
          this.$emit('handleRefresh')
        } else {
          utils.message.call(this, res.msg, 'error')
        }
      })
    },
    // 图片上传路径
    uploadAction (funciton) {
      const url = `${this.$store.state.URL.uploadImg}${funciton}`
      return url
    }
  }
}
</script>
