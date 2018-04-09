import config from '../config/config'

var API_ROOT = config.API_ROOT

export default {
  login: `${API_ROOT}/user/login`,
  register: `${API_ROOT}register`
}
