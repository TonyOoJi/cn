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
      <!-- <el-row class="breadcrumb-row">
        <el-col :span="24" class="breadcrumb-col">
          <div class="grid-content bg-light"></div>
        </el-col>
      </el-row> -->

      <!-- 工作区域 -->
      <el-row class="work-area">
        <!-- aside -->
        <el-col :span="6" class="aside-col">
          <div class="aside">
            <div class="custom-tree-container">
              <div class="block">
                <p>文档管理</p>
                <el-tree
                :data="dirs"
                node-key="dir_id"
                :highlight-current="true"
                :default-expand-all="false"
                :expand-on-click-node="true"
                :render-content="renderContent">
                </el-tree>
              </div>
            </div>
          </div>
        </el-col>

        <!-- editor -->
        <el-col :span="18" class="editor-col">
          <div class="editor">
              <mavonEditor :value="content" class="nn"/>
          </div>
        </el-col>
      </el-row><!-- 工作区域 -->
    <!-- main -->
  </div>
</template>
<script>
import abe from '../../api/axios_back_end'
import { mavonEditor } from 'mavon-editor'
// let dirCount = 1000
// let fileCount = 1000

export default {
  name: 'Note',
  components: {
    mavonEditor
  },
  data () {
    const data = [{
      id: 1,
      content_id: 'test content9527',
      label: '网络有点问题'
    }]
    return {
      content: '',
      dirCount: 0,
      dirs: JSON.parse(JSON.stringify(data))
    }
  },
  beforeCreate () {
    this.$nextTick(function () {
      // 创建组件前的操作
      this.refreshDirs()
    })
  },
  computed: {

  },
  methods: {

    // 后台获取目录刷新
    refreshDirs () {
      var params = {
        'username': sessionStorage.getItem('username')
      }
      abe.getDirs(params).then(res => {
        this.dirs = res.data.dirs
        this.dirCount = res.data.dirCount
        // this.fileCount = res.data.fileCount
      }).catch(err => {
        console.log(err)
      })
    },

    updateDirs () {
      var params = {
        'username': sessionStorage.getItem('username'),
        'dirs': this.dirs,
        'dirCount': this.dirCount
      }
      abe.updateDirs(params).then(res => {
        // alert('success')
        this.refreshDirs()
      }).catch(err => {
        console.log(err)
      })
    },

    appendFolder (data) {
      const newChild = { dir_id: ++this.dirCount, label: '新建文件夹', type: 'folder' }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.updateDirs()
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.dir_id === data.dir_id) // d是children，对其进行了遍历并找到符合的元素的位置
      children.splice(index, 1)
      this.updateDirs()
    },

    show (data) {
      alert(data.file_id)
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.show(data) }>ShowMsg</el-button>
            <el-button size="mini" type="text" on-click={ () => this.appendFolder(data) }>appendFolder</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>
      )
    }
  }
}
</script>
<style scoped>
.nn {
  min-height: 300px;
  min-width: 300px;
  height: 100%;
}
.nn>>>.v-note-op {
  box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227);
}
.nn>>>.v-note-panel {
  box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227);
}
.all {
  height: 100%;
}
.header-col {
  height: 100%;
}
.grid-content {
  /* border-radius: 4px; */
  height: 100%;
}
.breadcrumb-row {
  height: 0%;
}
.breadcrumb-col {
  height: 100%;
}
.work-area {
  height: 100%;
}
.aside-col  {
  height: 100%;
}
.aside {
  height: 100%;
  width: 100%;
  /* border: 0px solid black; */
  /* background-color: rgb(217, 217, 243); */
  /* border: 0 2 0 0px  black */
}
.editor-col {
  height: 100%;
}
.editor {
  height: 100%;
  width: 100%-3px;
  /* border: 1px solid #000; */
  border-left: 3px solid rgb(229,229,229);
  background-color: rgb(221, 243, 226);
}
.bg-dark {
  background-color: #defdf8;
}
.bg-light {
  background-color: #f8f2f8;
}
</style>
