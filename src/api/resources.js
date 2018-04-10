import config from '../config/config'

var API_ROOT = config.API_ROOT

export default {
  login: `${API_ROOT}/user/login`,
  isLogin: `${API_ROOT}/user/isLogin`,
  register: `${API_ROOT}register`
}
