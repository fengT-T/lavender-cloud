<template>
<header class="navbar">
  <section class="navbar-section">
    <img src="../assets/img/cloud.svg" alt="">
    <h5>Lavender</h5>
  </section>
  <section class="navbar-center">
    <ul class="tab">
      <li class="tab-item">
        <a href="#" class="active">网盘</a>
      </li>
      <li class="tab-item">
        <a href="#">分享</a>
      </li>
    </ul>
  </section>
  <section class="navbar-section login-link">
    <div v-show="isLogin">
      <p>feng</p>
      <img class="circle" src="../assets/img/logo.png" alt="...">
    </div>
    <div v-show="!isLogin">
      <router-link to="/login">登录</router-link>
    </div>
  </section>
</header>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      name: state => state.user.name,
      headImgUrl: state => state.user.headImgUrl
    }),
    ...mapGetters([
      'isLogin'
    ])
  }
}
</script>
<style scoped>
h5{
  margin-left: 10px;
}
.navbar{
  margin: 0px 10px;
  align-items: center;
}
.navbar .navbar-section img{
  width: 24px;
  height: 24px;
}
.navbar .navbar-section p {
  margin: 0px 10px 0px 0px;
}
.login-link {
  margin-right: 15px;
}
.login-link div{
  display: flex;
  vertical-align: top;
}
.navbar h5{
  color: rgba(87, 85, 217, 1);
  font-weight: 400;
  margin-bottom: 0px;
}
.navbar p {
  color: rgba(87, 85, 217, 1);
  margin: 0px 25px 0px 0px;
}
</style>
