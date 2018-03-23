<template>
  <div class="file-manager" @click.right.prevent="rightClick">
      <f-menu
        v-show="showRightMenu"
        :style="{'top': y,'left': x}"
        :isDirectory="selectFileIsDirectory"
        @delete="deleteFile(selectFileIndex)"
        @download="download(selectFileIndex)"
        @open="open(selectFileIndex)"></f-menu>

    <div class="file-manger-header">
      <ul class="breadcrumb">
        <li class="breadcrumb-item" v-for="(i, index) in pathList" :key="i">
          <a class="c-hand" @click="getFileList(concatLeftPath(index))">{{index === 0 ? 'Home' : i}}</a>
        </li>
      </ul>
      <f-upload
        @updateFileList="getFileList(path)"
        :path="`/source/${this.id}${this.path}`"></f-upload>
    </div>

    <f-file
      v-for="(i, index) in fileList"
      :index="index"
      :key="i.ino"
      :path="path"
      :file="i"
      @dblclick.native="open(index)">
    </f-file>
  </div>
</template>
<script>
import fMenu from './menu'
import http from 'axios'
import {mapState} from 'vuex'
import fFile from './File'
import fUpload from './Upload'

export default {
  data () {
    return {
      fileList: [{}],
      path: '',
      showRightMenu: false,
      x: 0,
      y: 0,
      selectFileIndex: 0
    }
  },
  components: {
    fFile, fMenu, fUpload
  },
  computed: {
    ...mapState({
      id: state => state.user.id
    }),
    pathList () {
      return this.path.split('/')
    },
    selectFileIsDirectory () {
      return this.fileList[this.selectFileIndex] && this.fileList[this.selectFileIndex].isDirectory
    }
  },
  methods: {
    // 获得文件列表
    async getFileList (path) {
      let newList = []
      ;(await http.get(`/dir/${this.id}${path}`)).data.forEach(file => {
        file.isDirectory ? newList.unshift(file) : newList.push(file)
      })
      this.path = path
      this.fileList = newList
    },
    // 右键处理
    rightClick (e) {
      const event = e
      let file
      const elePath = event.path
      if (elePath[1].className === 'file') {
        file = elePath[1]
      } else if (elePath[2].className === 'file') {
        file = elePath[2]
      } else {
        return
      }
      this.showRightMenu = true
      const {pageY, pageX} = e
      this.y = pageY + 'px'
      this.x = pageX + 'px'
      this.selectFileIndex = file.getAttribute('index')
    },
    // 合成路径
    concatLeftPath (index) {
      let path = ''
      for (let i = 0; i < index; i++) {
        path = path + '/' + this.pathList[i]
      }
      return path + this.pathList[index]
    },
    // 一系列的增删改查操作
    async open (index) {
      const {fileName, isDirectory} = this.fileList[index]
      if (isDirectory) {
        await this.getFileList(`${this.path}/${fileName}`)
      }
    },
    download (index) {
      const {fileName} = this.fileList[index]
      const link = document.createElement('a')
      link.href = `/source/${this.id}${this.path}/${fileName}`
      link.download = fileName
      link.click()
    },
    async deleteFile (index) {
      const {fileName, isDirectory} = this.fileList[index]
      const url = `${isDirectory ? '/dir/' : '/source/'}${this.id}${this.path}/${fileName}`
      await http.delete(url)
      await this.getFileList(this.path)
    }
  },
  async beforeMount () {
    document.addEventListener('click', () => { this.showRightMenu = false })
    await this.getFileList('')
  }
}
</script>
<style scoped>
.file-manager{
  margin: 10px 30px 5px 30px;
}
.file-manger-header {
  display: flex;
  justify-content: space-between;
  margin: 0px 40px;
}
.file-manger-header .upload{
  width: 200px;
}
</style>
