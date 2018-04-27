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
                <p>文档管理
                  <el-button size="mini" type="text" @click="appendFolder()">
                    <i class="el-icon-news"></i>
                  </el-button>
                  <el-button size="mini" type="text" @click="appendFile()">
                    <i class="el-icon-document"></i>
                  </el-button>
                </p>
                <div class="dir-tree">
                  <el-tree
                  :data="dirs"
                  node-key="dir_id"
                  :highlight-current="true"
                  :default-expand-all="true"
                  :expand-on-click-node="false"
                  :render-content="renderContent"
                  class="el-tree-mystyle">
                  </el-tree>
                </div>
                <!-- draggable @node-drop="refreshDirs" -->
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
      // id: 1,
      // content_id: 'test content9527',
      // label: '网络有点问题'
    }]
    return {
      currentFileId: 0, // 当前的文件id
      content: '', // 当前显示的内容
      dirCount: 0,
      fileCount: 0,
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
        this.fileCount = res.data.fileCount
        // this.fileCount = res.data.fileCount
      }).catch(err => {
        console.log(err)
      })
    },

    updateDirs () {
      var params = {
        'username': sessionStorage.getItem('username'),
        'dirs': this.dirs,
        'dirCount': this.dirCount,
        'fileCount': this.fileCount
      }
      abe.updateDirs(params).then(res => {
        // alert('success')
        this.refreshDirs()
      }).catch(err => {
        console.log(err)
      })
    },
    // 新建顶级文件夹
    appendFolder () {
      const newFolder = { dir_id: ++this.dirCount, label: '新建文件夹', type: 'folder', children: [] }
      this.dirs.push(newFolder)
      this.updateDirs()
    },
    // 新建子文件夹
    appendChildFolder (data) {
      const newChild = { dir_id: ++this.dirCount, label: '新建文件夹', type: 'folder' }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.updateDirs()
    },
    // 新建顶级文件
    appendFile () {
      const newFile = { dir_id: ++this.dirCount, label: '新建文件', type: 'file', file_id: ++this.fileCount }
      this.dirs.push(newFile)
      this.updateDirs()
    },
    // 新建子文件
    appendChildFile (data) {
      const newChild = { dir_id: ++this.dirCount, label: '新建文件', type: 'file', file_id: ++this.fileCount }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.updateDirs()
    },
    // 删除文件或文件夹
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.dir_id === data.dir_id) // d是children，对其进行了遍历并找到符合的元素的位置
      children.splice(index, 1)
      this.updateDirs()
    },
    // 改名
    edit (data) {
      data.label = 'abc'
      this.updateDirs()
    },

    show (data) {
      alert(data.file_id)
    },

    renderContent (h, { node, data, store }) {
      if (data.type === 'folder') {
        return (
          <span class="custom-tree-node" on-mouseover={ (e) => { e.currentTarget.getElementsByTagName('span')[0].style.display = '' } } on-mouseout={ (e) => { e.currentTarget.getElementsByTagName('span')[0].style.display = 'none' } }>
            <span style="display:none;margin-left:0px;">
              <el-button size="mini" type="text" on-click={ () => this.appendChildFolder(data) }>
                <i class="el-icon-news"></i>
              </el-button>
              <el-button size="mini" type="text" on-click={ () => this.appendChildFile(data) }>
                <i class="el-icon-document"></i>
              </el-button>
              <el-button size="mini" type="text" on-click={ () => this.edit(data) }>
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
            <span>{node.label}</span>
          </span>
        )
      } else if (data.type === 'file') {
        return (
          <span class="custom-tree-node" on-mouseover={ (e) => { e.currentTarget.getElementsByTagName('span')[0].style.display = '' } } on-mouseout={ (e) => { e.currentTarget.getElementsByTagName('span')[0].style.display = 'none' } }>
            <span style="display:none;margin-left:0px;">
              <el-button size="mini" type="text" on-click={ () => this.edit(data) }>
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
            <span>{node.label}</span>
          </span>
        )
      }
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
.dir-tree {
  height: 450px;
  overflow: auto;
  text-align: left;
}
.editor-col {
  height: 100%;
}
.editor {
  height: 100%;
  width: calc(100% - 3px);
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-mystyle {
  display:inline-block;
  margin-left: 0px;
}
</style>
