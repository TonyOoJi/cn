<template>
  <div class="loginWrapper">
    <div class="hd">
      <h2>cn</h2>
      <p>CLOUDNOTE-Record every inspiration.</p>
    </div>
    <div class="bd">
      <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
        <el-form-item prop="userName">
          <el-input type="userName" v-model="loginForm.userName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="psd">
          <el-input v-model="loginForm.psd" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submitBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ft">
      <router-link to="/register">还没有账号？马上注册</router-link>
    </div>
  </div>
</template>

<script>
import abe from '../../api/axios_back_end'
// import store from '../../vuex/store'
import {showMsg} from '../../common/utils/util'
import router from '../../router'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        psd: ''
      },
      loginRule: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10 个字符', trigger: 'blur' }
        ],
        psd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 - 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        /* 饿了么的element就是这样写的 */
        if (valid) {
          /* 通过校验之后的submit方法块 */
          var data = {
            'usr': this.loginForm.userName,
            'psd': this.loginForm.psd
          }
          this.doLogin(this, data)
        } else {
          return false
        }
      })
    },
    doLogin (that, data) {
      abe.login(data).then(res => {
        if (res.data.code === 0) {
          sessionStorage.setItem('accessToken', res.data.accessToken)
          sessionStorage.setItem('username', res.data.username)
          sessionStorage.setItem('uid', res.data.uid)
          // store.dispatch('showLogin')
          showMsg(that, true, '登录成功', 'success')
          router.push({path: '/cn/index', params: { username: res.data.username }})
        } else if (res.data.code === 4) {
          showMsg(that, true, '登录失败，账号或密码错误', 'error')
        } else if (res.data.code === 8) {
          showMsg(that, true, '您违反了用户协议，现已被封号处理，请联系管理员', 'error')
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
    font-size: 18px;
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
