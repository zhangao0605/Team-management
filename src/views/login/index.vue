<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <!--<h3 class="title" style="margin-bottom: 5px"><span class="bg"></span></h3>-->
      <h3 class="title" style="margin-bottom: 30px">欢迎来到Thinkey</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <span class=" iconfont el-icon-user"></span>
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <span class="iconfont el-icon-lock"></span>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <span class="iconfont el-icon-view"
                :class=" pwdType === 'password' ? 'el-icon-yanjing_bi ' : 'el-icon-yanjing-zheng'"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getToken, removeToken, setToken,} from '@/utils/js/token'

  export default {
    name: 'Login',
    data() {
      /*用户名验证规则*/
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      }
      /*密码验证规则*/
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        /*账号密码变量存储*/
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    }
    ,
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {

      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      }
      ,
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            let info={}
            info.password=this.passwordEncryption(this.loginForm.password)
            info.username=this.loginForm.username
            this.$store.dispatch('login/Login',info).then(() => {
              this.loading = false
              this.$router.push({path:'/'})
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: #D4D5DD;
        border: 0px;
        /*-webkit-appearance: none;*/
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #454545;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #D4D5DD inset !important;
          -webkit-text-fill-color: #454545 !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #ECEEF7;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #454545;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #82848a;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #454545;
      cursor: pointer;
      user-select: none;
    }

  }
  .bg {
    display: inline-block;
    height: 40px;
    width: 125px;
    background: url("../../assets/images/logo_1.png") no-repeat;
  }
</style>
