<template>
  <div class="upload">
    <div>
      <span v-show="isLoading" class="file-info">{{fileName}}</span>
      <span v-show="isLoading">{{count}}/{{total}}</span>
      <progress v-show="isLoading" class="progress" :value="uploadRate" max="100"></progress>
    </div>
    <button class="btn" :class="{'loading': isLoading}" @click="uploader.click()">
      <i class="icon icon-upload"></i>
    </button>
  </div>
</template>
<script>
import http from 'axios'

export default {
  props: ['path'],
  data () {
    return {
      isLoading: false,
      uploader: {},
      uploadRate: 0,
      count: 0,
      total: 0,
      fileName: ''
    }
  },
  methods: {
    async uploads (events) {
      let {target} = events
      let fileList = Array.from(target.files)
      this.isLoading = true
      this.total = fileList.length
      for (let file of fileList) {
        let formdata = new window.FormData()
        formdata.append('file', file)
        this.fileName = file.name
        try {
          await http.post(this.path, formdata, {
            onUploadProgress: event => {
              const {loaded, total} = event
              this.uploadRate = (loaded / total) * 100
            }
          })
        } catch (error) {
          window.alert('上传失败')
        }
        this.count = this.count + 1
      }
      this.count = 0
      this.total = 0
      this.isLoading = false
      this.$emit('updateFileList')
    }
  },
  async beforeMount () {
    this.uploader = document.createElement('input')
    this.uploader.type = 'file'
    this.uploader.multiple = true
    this.uploader.addEventListener('change', this.uploads)
  }
}
</script>
<style scoped>
  .upload {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .upload > div {
    text-align: center;
    width: 150px;
  }
  button {
    margin-left: 15px;
  }
  .file-info{
    display: inline-block;
    width: 105px;
    height: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
  }
</style>
