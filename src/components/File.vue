<template>
  <div class="file" tabindex="-1">
      <div class="image-container">
        <img :src="imgUrl">
      </div>
      <p>{{file.fileName}}</p>
  </div>
</template>
<script>
import {mapState} from 'vuex'

const mimeImg = {
  'directory': '/static/img/dir.svg',
  'application/msword': '/static/img/word.svg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '/static/img/word.svg',
  'application/vnd.ms-powerpoint': '/static/img/powerpoint.svg',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '/static/img/powerpoint.svg',
  'application/vnd.ms-excel': '/static/img/excel.svg',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '/static/img/excel.svg',
  '^text/.*': '/static/img/text.svg',
  'application/pdf': '/static/img/pdf.svg',
  '^video/.*': '/static/img/video.svg',
  '^audio/.*': '/static/img/audio.svg',
  'application/x-rar-compressed': '/static/img/tar.svg',
  'application/x-7z-compressed': '/static/img/tar.svg',
  'application/zip': '/static/img/tar.svg',
  'application/gzip': '/static/img/tar.svg',
  'application/x-xz': '/static/img/tar.svg'
}

export default {
  props: ['file', 'path'],
  computed: {
    ...mapState({
      id: state => state.user.id
    }),
    imgUrl () {
      if (/^image\/.*/.test(this.file.mime)) {
        return `/source/${this.id}${this.path}/${this.file.fileName}`
      }
      for (const mine in mimeImg) {
        if (new RegExp(mine).test(this.file.mime)) {
          return mimeImg[mine]
        }
      }
      return '/static/img/unknow.svg'
    }
  },
  methods: {
    rightClick () {

    }
  }
}
</script>
<style scoped>
.file{
  vertical-align: middle;
  display: inline-block;
  margin: 0px 10px 5px 10px;
  width: 130px;
  height: 150px;
  text-align: center;
  cursor: pointer;
  border-radius: 5%;
}
.file img{
  max-width: 80px;
  max-height: 80px;
}
.file .image-container{
  margin-top: 10px;
  display:flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
  width: 100%;
  height: 80px;
}

.file:hover,.file:focus{
  background: rgba(248, 249, 250, 0.625);
  color: #5764c6;
  text-shadow: 1px 1px 20px;
  outline: none;
  box-shadow: 0px 0px 1px 0px rgba(87, 85, 217, 1);
}
.file p{
  margin: 10px 0px 0px 0px;
  display: inline-block;
  height: 50px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
