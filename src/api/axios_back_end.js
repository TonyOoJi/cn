import Axios from 'axios'
import API from './resources'

export default {
  login (data) {
    return Axios.post(API.login, data)
  }
}
