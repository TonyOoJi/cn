import Axios from 'axios'
import API from './resources'

export default {
  // 登陆
  login (data) {
    return Axios.post(API.login, data)
  },
  // 注册
  register (data) {
    return Axios.post(API.register, data)
  },
  // 获取验证码
  getCaptcha (data) {
    return Axios.post(API.getCaptcha, data)
  }
}
