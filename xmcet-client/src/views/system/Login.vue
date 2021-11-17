<template>
  <div class="login">
    <div class="main">
      <div class="left-box">
        <img src="@/assets/image/img_bg.png" alt="" class="img">
        <div class="text">
          <h3>MT-Admin</h3>
        </div>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <h2 class="title">欢迎登录</h2>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="用户名"
            @focus="isUsername = true"
            @blur="isUsername = false"
          >
            <i
              slot="prefix"
              class="el-icon-user"
              :class="{ 'color-class': isUsername, 'input-icon': true }"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @focus="isPassword = true"
            @blur="isPassword = false"
            @keyup.enter.native="handleLogin"
          >
            <i
              slot="prefix"
              class="el-icon-key"
              :class="{ 'color-class': isPassword, 'input-icon': true }"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            v-model="loginForm.captcha"
            auto-complete="off"
            placeholder="验证码"
            @focus="isValidCode = true"
            @blur="isValidCode = false"
            @keyup.enter.native="handleLogin"
          >
            <i
              slot="prefix"
              class="el-icon-lock"
              :class="{ 'color-class': isValidCode, 'input-icon': true }"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode">
          </div>
        </el-form-item>
        <el-checkbox
          v-model="loginForm.rememberMe"
          style="margin:0px 0px 25px 0px;"
        >记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  底部  -->
    <div class="el-login-footer">
      <span>MT-Admin©2021</span>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { getCodeImg } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      isUsername: false,
      isPassword: false,
      isValidCode: false,
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        captcha: '',
        key: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        captcha: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = res.data.img
        this.loginForm.key = res.data.key
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 })
            Cookies.set('password', encrypt(this.loginForm.password), {
              expires: 30
            })
            Cookies.set('rememberMe', this.loginForm.rememberMe, {
              expires: 30
            })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          // 登录成功后跳转到首页
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' }).catch(e => {
              })
            })
            .catch(() => {
              this.loading = false
              this.getCode()
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #0d1d30;
  // background: red;
  position: relative;
}

.main {
  // position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 940px;
  height: 495px;
  background: rgba(25, 41, 59, 1);
  border-radius: 12px;
  box-shadow: 0px 2px 12px 0px rgba(9, 23, 39, 1);
  color: rgba(255, 255, 255, 1);

  .left-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      align-self: center;
      width: 348px;
      height: 299px;
    }
    .text {
      margin-left: 50px;
      h3 {
        font-size: 32px;
      }
    }
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 299px;
    height: 495px;
    padding: 58px 33px 33px 33px;
    .title {
      width: 85px;
      font-size: 20px;
      margin: 0px auto 62px auto;
      border-bottom: 3px rgba(27, 74, 127, 1) ridge;
      text-align: center;
      color: #333333;
      padding-bottom: 8px;
    }
    .el-input {
      height: 32px;
      input:focus {
        color: rgba(6, 104, 185, 1);
      }

      input {
        outline: none;
        height: 38px;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
      }
    }
    .color-class {
      color: rgba(6, 104, 185, 1);
    }
    .input-icon {
      height: 39px;
      width: 19px;
      margin-left: 2px;
    }
  }
}

.login-code {
  position: absolute;
  width: 88px;
  height: 32px;
  right: 0;
  bottom: 8px;
  img {
    width: 88px;
    height: 32px;
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: absolute;
  transform: translateY(273px);
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  span {
    img {
      height: 12px;
    }
  }
}
</style>
