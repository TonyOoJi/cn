import config from '../config/config'

var API_ROOT = config.API_ROOT

export default {
  login: `${API_ROOT}/user/login`,
  isLogin: `${API_ROOT}/user/isLogin`,
  register: `${API_ROOT}/user/register`,
  getCaptcha: `${API_ROOT}/mail/getCaptcha`,
  getDirs: `${API_ROOT}/dir/getDirs`,
  updateDirs: `${API_ROOT}/dir/updateDirs`,
  addFile: `${API_ROOT}/file/addFile`,
  getFileContent: `${API_ROOT}/file/getFileContent`
}
