<template>
  <el-dialog :title="dialogKind.title" :visible.sync="formVisible" :close-on-click-modal="false" class="avatars-dialog" top="8%">
    <el-form :model="form" label-position="right" label-width="180px" :rules="rules" ref="forms">
      <el-form-item label="头像名称：" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入头像名称"></el-input>
      </el-form-item>
      <el-form-item label="头像类型：" prop="avatarLevelId">
        <el-select v-model.number="form.avatarLevelId" filterable>
          <el-option v-for="avatarLevel in avatarLevels" :key="avatarLevel.id" :value="avatarLevel.id" :label="avatarLevel.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="售价：" prop="price">
        <el-input v-model.number="form.price" placeholder="请输入售价">
          <template slot-scope="append">钻石</template>
        </el-input>
      </el-form-item>
      <el-form-item label="头像权重：" prop="weight">
        <el-input v-model.number="form.weight" placeholder="请输入头像权重"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker type="datetime" v-model="form.startTime" placeholder="请选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-date-picker type="datetime" v-model="form.endTime" placeholder="请选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%" :editable="false"></el-date-picker>
      </el-form-item>
      <el-form-item label="大头像上传：" prop="picUrl">
        <upload :action="uploadAction" imgUrl="picUrl" ref="picUrl" :form="form"></upload>
      </el-form-item>
      <el-form-item label="缩略图头像上传：" prop="thumbnailUrl">
        <upload :action="uploadAction" imgUrl="thumbnailUrl" ref="thumbnailUrl" :form="form"></upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import utils from '@/utils/utils'
import { getBlockconf, addBlockconf, updateBlockconf } from '@/api/autoDeny/blockConfAPI'
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
  data () {
    return {
      // dialog开关
      formVisible: false,
      // 表单数据
      form: {
        id: '',
        name: '',
        price: '',
        picUrl: '',
        thumbnailUrl: '',
        weight: '',
        startTime: '',
        endTime: '',
        avatarLevelId: ''
      },
      avatarLevels: [],
      timeArr: ['startTime', 'endTime'],
      uploadArr: ['picUrl', 'thumbnailUrl'],
      uploadAction: `${this.$store.state.URL.uploadImg}avatars`,
      // 表单规则
      rules: {
        name: [{ required: true, message: '请输入头像名称', trigger: 'blur' }],
        avatarLevelId: [
          {
            required: true,
            message: '请选择头像类型',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            type: 'number',
            message: '请填写售价',
            trigger: 'blur'
          }
        ],
        weight: [
          {
            required: true,
            type: 'number',
            message: '请填写头像权重',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 9999,
            type: 'number',
            message: '头像权重范围1~9999',
            trigger: 'change'
          }
        ],
        startTime: [
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
        ],
        picUrl: [
          {
            required: true,
            message: '请至少上传一张大头像地址哦~ O(∩_∩)O',
            trigger: 'blur'
          }
        ],
        thumbnailUrl: [
          {
            required: true,
            message: '请至少上传一张缩略图头像地址哦~ O(∩_∩)O',
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
  created () {
    this.initCondition()
  },
  methods: {
    initCondition () {
      getBlockconf().then(res => {
        if (res.code === 200) {
          this.avatarLevels = res.data
        } else {
          utils.message.call(this, res.msg, 'error')
        }
      })
    },
    // 初始化表单
    initForm () {
      // 初始化表单数据和表单校验结果 （这个resetFields方法有点搞笑，它记录了第一次的非空赋值，所以，还是老老实实的自己把数据置空吧~）
      this.$refs.forms.resetFields()
      this.uploadArr.forEach(item => {
        this.$refs[item].initUpload()
      })
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
        } else if (key === 'avatarLevel') {
          this.form.avatarLevelId = data.id
        } else {
          this.form[key] = data
        }
        // 填充上传图片组件的数据
        if (this.uploadArr.indexOf(key) > -1) {
          this.$refs[key].fillUpload(data)
        }
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
        if (res.code === 200) {
          utils.message.call(this, '新增成功啦~ O(∩_∩)O', 'success')
          this.formVisible = false
          this.$emit('handleRefresh')
        } else {
          utils.message.call(this, res.msg, 'error')
        }
      })
    },
    // 更新提交
    submitUpdate () {
      const form = Object.assign({}, this.form)
      updateBlockconf(form, form.id).then(res => {
        if (res.code === 200) {
          utils.message.call(this, '更新成功啦~ O(∩_∩)O', 'success')
          this.formVisible = false
          this.$emit('handleRefresh')
        } else {
          utils.message.call(this, res.msg, 'error')
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
