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
  getFileContent: `${API_ROOT}/file/getFileContent`,
  updataFile: `${API_ROOT}/file/updataFile`,
  newPad: `${API_ROOT}/pad/getNewPad`,
  getPads: `${API_ROOT}/pad/getPads`,
  getShareUrl: `${API_ROOT}/share/getShareUrl`,
  getSharePage: `${API_ROOT}/share/getSharePage`,
  complaint: `${API_ROOT}/share/complaint`,
  deletePad: `${API_ROOT}/pad/deletePad`
}
