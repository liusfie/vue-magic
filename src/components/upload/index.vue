<template>
 <el-upload :action="action" :multiple="false" :name="name" :file-list="fileList" :on-success="handleUploadSuccess" :on-error="handleUploadError" :on-remove="handleUploadRemove" :before-upload="handleBeforeUpload" list-type="picture-card">
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">{{textTip}}</div>
        </el-upload>
</template>

<script>
import utils from '@/utils/utils'
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: 'multipartFile'
    },
    textTip: {
      type: String,
      default: '只能上传jpg/png文件，且不超过100M'
    },
    action: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      default: 'imgUrl'
    },
    uploadAllowNum: {
      type: Number,
      default: 1
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 100
    }
  },
  data () {
    return {
      // 上传的列表
      fileList: [],
      // upload当前数目
      uploadNowNum: 0
    }
  },
  methods: {
    initUpload () {
      this.fileList = []
      this.uploadNowNum = 0
    },
    fillUpload (data) {
      if (Object.prototype.toString.call(data) === '[object Array]') {
        data.forEach(item => {
          this.fileList.push({
            name: 'default',
            url: item,
            response: { code: 200, data: item }
          })
        })
        this.uploadAllowNum = data.lenght
      } else {
        this.fileList.push({
          name: 'default',
          url: data,
          response: { code: 200, data: data }
        })
        this.uploadNowNum = 1
      }
    },
    // 处理上传图片的规则
    handleBeforeUpload (file) {
      // 图片格式
      const isJPG = ['image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) !== -1
      // 图片大小
      const legalSize = file.size <= this.maxSize
      // 不合法的提示信息
      let message = ''
      let legal = false
      // 当前上传个数的游标
      this.uploadNowNum++
      if (this.uploadNowNum > this.uploadAllowNum) {
        message = `最多只能选择${this.uploadAllowNum}张图片哦~`
      } else {
        if (!isJPG) {
          message = this.textTip
        } else {
          if (!legalSize) {
            message = this.textTip
          } else {
            legal = true
          }
        }
      }
      // 不合法并进行提示
      !legal && utils.message.call(this, message, 'warning')
      return legal
    },
    // 上传成功和删除上传列表时，重新赋值imgUrl
    setImgUrl (fileList, imgUrl) {
      // 若上传列表没有数据  清空imgUrl
      if (fileList.lenght === 0) {
        this.form[imgUrl] = ''
      } else {
        this.form[imgUrl] = this.uploadAllowNum === 1 ? '' : []
        fileList.forEach(file => {
          if (this.uploadAllowNum === 1) {
            this.form[imgUrl] = file.response.data
          } else {
            this.form[imgUrl].push(file.response.data)
          }
        })
      }
    },
    // 移除奖品配图的粘连操作
    handleUploadRemove (file, fileList) {
      // 当前上传数目自减一
      this.uploadNowNum--
      this.setImgUrl(fileList, this.imgUrl)
    },
    // 上传成功的处理逻辑
    handleUploadSuccess (res, file, fileList) {
      if (res.code === 200) {
        utils.message.call(this, '上传成功~', 'success')
        this.setImgUrl(fileList, this.imgUrl)
      } else {
        utils.message.call(this, res.detail, 'error')
      }
      // 把上传成功的奖品配图地址添加进form
    },
    // 上传失败的处理逻辑
    handleUploadError () {
      // 当前上传数目自减一
      this.uploadNowNum--
      // 上传失败
      utils.message.call(this, '上传图片失败哦~ o(╥﹏╥)o', 'error')
    }
  }
}
</script>
