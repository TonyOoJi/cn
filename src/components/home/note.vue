<template>
  <div class="all">
    <!-- 头部导航 -->
    <!-- <el-row class="header-row">
      <el-col :span="24" class="header-col">
        <div class="grid-content bg-dark"></div>
      </el-col>
    </el-row> -->

    <!-- main -->
    <!-- <div class="main"> -->
      <!-- 路径导航 -->
      <el-row class="breadcrumb-row">
        <el-col :span="24" class="breadcrumb-col">
          <div class="grid-content bg-light"></div>
        </el-col>
      </el-row>

      <!-- 工作区域 -->
      <el-row class="work-area">
        <!-- aside -->
        <el-col :span="5" class="aside-col">
          <div class="aside"></div>
        </el-col>

        <!-- editer -->
        <el-col :span="19" class="editer-col">
          <div class="editer .bg-dark"></div>
        </el-col>
      </el-row><!-- 工作区域 -->
    <!-- main -->
  </div>
</template>
<script>
export default {
  name: 'Note',
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scoped>
.all {
  height: 100%;
}
.header-row {
  height: 7%;
}
.header-col {
  height: 100%;
}
.grid-content {
  /* border-radius: 4px; */
  height: 100%;
}
.main {
  height: 93%;
}
.breadcrumb-row {
  height: 6%;
}
.breadcrumb-col {
  height: 100%;
}
.work-area {
  height: 94%;
}
.aside-col  {
  height: 100%;
}
.aside {
  height: 100%;
  width: 100%;
  /* border: 0px solid black; */
  background-color: rgb(217, 217, 243);
}
.editer-col {
  height: 100%;
}
.editer {
  height: 100%;
  width: 100%;
  /* border: 0px solid blue; */
  background-color: rgb(221, 243, 226);
}
.bg-dark {
  background-color: #defdf8;
}
.bg-light {
  background-color: #f8f2f8;
}
</style>
