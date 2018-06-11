<template>
<div>
  <!-- <div> id:{{ share_id }} </div><br> -->
  <h2>文章：{{ file_name }}</h2><br>
  <div>作者：{{username}}</div><div style="margin-top:10px">创建时间：{{ create_data }}</div><br>
  <mavonEditor v-model="content" class="nn"
    :toolbarsFlag="false"
    :subfield="false"
    defaultOpen="preview"
  />
</div>
</template>
<script>
import abe from '../../api/axios_back_end'
import { mavonEditor } from 'mavon-editor'

export default {
  data () {
    return {
      share_id: this.$route.params.share_id,
      file_name: '',
      username: '',
      create_data: '',
      content: ''
    }
  },
  components: {
    mavonEditor
  },
  beforeCreate () {
    this.$nextTick(function () {
      // 创建组件前的操作
      this.getSharePage()
    })
  },
  computed: {

  },
  methods: {
    getSharePage () {
      var params = {
        'share_id': this.share_id
      }
      abe.getSharePage(params).then(res => {
        // alert('success')
        this.file_name = res.data.file_name
        this.username = res.data.username
        this.content = res.data.content
        this.create_data = res.data.create_data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.nn {
  margin: 0 auto;
  min-height: 300px;
  min-width: 300px;
  width: 70%;
  height: 100%;
}
.nn>>>.v-note-op {
  box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227);
}
.nn>>>.v-note-panel {
  box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227);
}
</style>
