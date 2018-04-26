<template>
  <div class="all">
    <!-- 头部导航 -->
    <el-row class="header-row">
      <el-col :span="6" class="header-col">
        <div style="margin:0 auto;">cn</div>
      </el-col>
      <el-col :span="8" class="header-col">
        <el-menu style="margin-top:-4%;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="margin:0 20px 0 20px">笔记</el-menu-item>
          <el-menu-item index="2" style="margin:0 20px 0 20px">协作</el-menu-item>
          <el-menu-item index="3" style="margin:0 20px 0 20px">分享</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="10" class="header-col">
        <div style="margin:0 auto;"><span>欢迎：</span>{{usr}}<el-button plain @click="logout()" style="border:0px;margin-left:3%;">退出</el-button></div>
      </el-col>
    </el-row>

    <!-- main -->
    <div class="main">
      <Note :style="NoteStyle"></Note>
      <Team :style="TeamStyle"></Team>
      <share :style="ShareStyle"></share>
    </div><!-- main -->

  </div>
</template>
<script>
import Note from './Note'
import Team from './Team'
import Share from './Share'
import router from '../../router'

export default {
  name: 'Index',
  components: { Note, Team, Share },
  data () {
    return {
      activeIndex: '1',
      usr: sessionStorage.getItem('username'),
      NoteStyle: {
        display: ''
      },
      TeamStyle: {
        display: 'none'
      },
      ShareStyle: {
        display: 'none'
      }
    }
  },
  computed: {

  },
  methods: {

    handleSelect (index, indexPath) {
      if (index === '1') {
        this.NoteStyle.display = ''
        this.TeamStyle.display = 'none'
        this.ShareStyle.display = 'none'
      } else if (index === '2') {
        this.NoteStyle.display = 'none'
        this.TeamStyle.display = ''
        this.ShareStyle.display = 'none'
      } else if (index === '3') {
        this.NoteStyle.display = 'none'
        this.TeamStyle.display = 'none'
        this.ShareStyle.display = ''
      }
    },

    logout () {
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('uid')
      router.push({path: '/'})
    }
  }
}
</script>
<style scoped>
.all {
  height: 100%;
}
.main {
  height: 92%;
}
</style>
