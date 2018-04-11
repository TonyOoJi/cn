<template>
  <div class="loginWrapper">
    <div class="hd">
      <h2>注册</h2>
      <p>开始你的记录旅程</p>
    </div>
    <div class="bd">
      <el-form :model="registerForm" :rules="registerRule" ref="registerForm">
        <el-form-item prop="userName">
          <el-input type="userName" v-model="registerForm.userName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="registerForm.pwd" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="checkPwd">
          <el-input v-model="registerForm.checkPwd" placeholder="请再次输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入接收验证码的邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="registerForm.captcha" placeholder="请输入验证码">
            <el-button slot="append" @click='getCaptcha'>{{ captchaMsg }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')" class="submitBtn">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ft">
      <router-link to="/">已经有账号？马上登录</router-link>
    </div>
  </div>
</template>

<script>
import abe from '../../api/axios_back_end'
import {showMsg} from '../../common/utils/util'
import store from '../../vuex/store'
import router from '../../router'

export default {
  name: 'register',
  data () {
    var validateUser = (rule, value, cb) => {
      var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
      if (value === '') {
        cb(new Error('请输入用户名'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入3-10个字母/汉字/数字/下划线'))
      } else {
        cb()
      }
    }
    var validatePwd = (rule, value, cb) => {
      var pattern = /^\S{3,20}$/g
      if (value === '') {
        cb(new Error('请输入密码'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入3-20个非空白字符'))
      } else {
        if (this.registerForm.checkPwd !== '') {
          this.$refs.registerForm.validateField('checkPwd')
        }
        cb()
      }
    }
    var validateCheckPwd = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pwd) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    return {
      registerForm: {
        userName: '',
        pwd: '',
        checkPwd: '',
        email: '',
        captcha: ''
      },
      registerRule: {
        userName: [
          { validator: validateUser, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        checkPwd: [
          { validator: validateCheckPwd, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    captchaMsg () {
      return store.getters.getCaptchaMsg
      // return 'dasdas'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            'usr': this.registerForm.userName,
            'pwd': this.registerForm.pwd,
            'email': this.registerForm.email,
            'captcha': this.registerForm.captcha
          }
          this.doRegister(this, data)
        } else {
          return false
        }
      })
    },
    getCaptcha () {
      this.$refs.registerForm.validateField('email', (vaild) => {
        if (!vaild) {
          let data = {
            email: this.registerForm.email
          }
          this.sendCaptcha(this, data)
        } else {
          return false
        }
      })
    },
    doRegister (that, data) {
      abe.register(data).then(res => {
        if (res.data.code === 0) {
          showMsg(that, true, '注册成功', 'success')
          router.push({name: 'Login'})
        } else if (res.data.code === 88) {
          showMsg(that, true, '验证码错误', 'error')
        } else if (res.data.code === 99) {
          showMsg(that, true, '用户名已被注册', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 发送验证码
    sendCaptcha (that, data) {
      abe.getCaptcha(data).then(res => {
        let code = res.data.code
        if (code === 0) {
          store.dispatch('updateCaptchaMsg', '发送成功')
        } else if (code === 88) {
          store.dispatch('updateCaptchaMsg', '已经发送')
        } else if (code === 99) {
          showMsg(that, true, '验证码发送失败', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}

.loginWrapper .hd {
  width: 300px;
}

.loginWrapper .hd h2 {
  font-weight: 400;
  color: #20A0FF;
}

.loginWrapper .hd p {
  font-size: 15px;
  color: #1f2f3d;
}

.loginWrapper .bd {
    width: 300px;
}

.loginWrapper .bd .submitBtn {
  width: 100%;
}

.loginWrapper .bd .el-form-item:last-child {
  margin-bottom: 10px;
}

.loginWrapper .ft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
}

.loginWrapper .ft a {
  font-size: 14px;
  text-decoration: none;
  color: #20A0FF;
}
</style>
