<template>
  <div class="login">
    <h3>登录</h3>
    <div class="form-group" :class="{'has-error': error.name}">
      <input class="form-input" type="text" v-model="data.name" placeholder="用户名">
      <label class="form-label"></label>
      <p v-show="error.name" class="form-input-hint">{{error.name}}</p>
    </div>
    <div class="form-group" :class="{'has-error': error.password}">
      <input class="form-input" type="password" v-model="data.password" placeholder="密码">
      <p v-show="error.password" class="form-input-hint">{{error.password}}</p>
    </div>
    <div class="form-group">
      <label class="form-switch">
        <input type="checkbox" v-model="data.emember">
        <i class="form-icon"></i>记住密码
      </label>
    </div>
    <button class="btn btn-block" :class="{'loading': isLoading}" @click="login">登录</button>
  </div>
</template>
<script>
import http from 'axios'
import {clone} from 'lodash'

const defaultError = {
  name: '',
  password: ''
}

export default {
  data () {
    return {
      data: {
        name: '',
        password: '',
        remember: false
      },
      isLoading: false,
      error: clone(defaultError)
    }
  },
  methods: {
    async login () {
      this.error = clone(defaultError)
      this.isLoading = true
      try {
        const user = (await http.post('/user/login', this.data)).data
        this.$store.commit('setUser', user)
        this.$router.push('/')
      } catch (error) {
        const {filed, msg} = error.response.data
        this.error[filed] = msg
      }
      this.isLoading = false
    }
  }
}
</script>
<style>
.login{
  width: 300px;
  margin: 15% auto;
  text-align: center;
}
.form-switch {
  text-align: left;
}
</style>
