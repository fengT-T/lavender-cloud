<template>
  <ul class="menu">
    <li class="divider" data-content="操作"></li>
    <li class="menu-item">
      <a @click="$emit('open')">
        <i class="icon icon-apps"></i> &nbsp; 打开
      </a>
      <a @click="$emit('download')" v-show="!isDirectory">
        <i class="icon icon-download"></i> &nbsp; 下载
      </a>
      <a @click="$emit('delete')">
        <i class="icon icon-delete"></i> &nbsp; 删除
      </a>
    </li>
    <li class="divider"></li>
    <li class="menu-item">
      <a href="#" v-show="!isDirectory">
        <i class="icon icon-time"></i> &nbsp; 历史
      </a>
    </li>
</ul>
</template>
<script>
export default {
  props: ['isDirectory']
}
</script>
<style scoped>
.menu {
  width: 100px;
  position: absolute;
}
</style>
