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
                <span style="font-size:120%;">文档管理
                  <el-button size="mini" type="text" @click="appendFolder()">
                    <i class="el-icon-news"></i>
                  </el-button>
                  <el-button size="mini" type="text" @click="appendFile()">
                    <i class="el-icon-document"></i>
                  </el-button>
                </span><br>
                <span><i class="el-icon-edit"></i>当前正在编辑： {{currentFileName}} <i class="el-icon-location-outline"></i></span>
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
    <!-- 修改目录名弹框 -->
    <el-dialog title="修改名称" :visible.sync="dialogNewNameVisible" width='600px'>
      <el-form v-model="form">
        <el-form-item label="请填写：" label-width='120px'>
          <el-input v-model="form.editName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewNameVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除确认框 -->
    <el-dialog title="移除节点" :visible.sync="dialogRemoveVisible" width='400px'>
      <span style="font-size:160%;">确定要删除吗？你这样做会删除此节点及下级所有节点的！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRemoveVisible = false">取 消</el-button>
        <el-button type="primary" @click="remove()">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogNewNameVisible: false, // 弹框控制显示属性
      dialogRemoveVisible: false, // 弹窗确认删除
      form: {
        editName: '' // 修改名称的接受变量
      },
      tempDirNodeData: null, // 修改名字临时节点
      tempRemoveNode: null, // 移除节点临时指向
      tempRemoveData: null, // 移除节点数据临时指向
      currentFileId: 0, // 当前的文件id
      currentFileName: '',
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
      this.addFileToDB()
      this.updateDirs()
    },
    // 新建子文件
    appendChildFile (data) {
      const newChild = { dir_id: ++this.dirCount, label: '新建文件', type: 'file', file_id: ++this.fileCount }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.addFileToDB()
      this.updateDirs()
    },
    // 删除文件或文件夹
    remove () {
      const parent = this.tempRemoveNode.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.dir_id === this.tempRemoveData.dir_id) // d是children，对其进行了遍历并找到符合的元素的位置
      children.splice(index, 1)
      this.updateDirs()
      this.dialogRemoveVisible = false
    },
    verifyRemove (node, data) {
      this.tempRemoveNode = node
      this.tempRemoveData = data
      this.dialogRemoveVisible = true
    },
    // 改名
    edit () {
      // console.log(this.form.editName)
      // console.log(this.tempDirNodeData.label)
      if (this.form.editName.length !== 0) {
        this.tempDirNodeData.label = this.form.editName
        this.updateDirs()
        this.dialogNewNameVisible = false
        this.tempDirNodeData = null
        this.form.editName = ''
      } else {
        this.$message({
          message: '不输入是不行的',
          type: 'warning'
        })
      }
    },
    showEditDialog (data) {
      this.dialogNewNameVisible = true
      this.tempDirNodeData = data
    },
    // 新增文件后上传后台
    addFileToDB () {
      var params = {
        'username': sessionStorage.getItem('username'),
        'file_id': this.fileCount
      }
      abe.addFile(params)
    },
    // 显示并编辑文档
    showMavonEditor (data) {
      this.currentFileId = data.file_id
      this.currentFileName = data.label
      var params = {
        'username': sessionStorage.getItem('username'),
        'file_id': this.currentFileId
      }
      abe.getFileContent(params).then(res => {
        // alert('success')
        this.content = res.data.content
      }).catch(err => {
        console.log(err)
      })
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
              <el-button size="mini" type="text" on-click={ () => { this.showEditDialog(data) } }>
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="text" on-click={ () => this.verifyRemove(node, data) }>
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
            <span>{node.label}</span>
          </span>
        )
      } else if (data.type === 'file') {
        return (
          <span class="custom-tree-node" on-click={ () => this.showMavonEditor(data) } on-mouseover={ (e) => { e.currentTarget.getElementsByTagName('span')[0].style.display = '' } } on-mouseout={ (e) => { e.currentTarget.getElementsByTagName('span')[0].style.display = 'none' } }>
            <span style="display:none;margin-left:0px;">
              <el-button size="mini" type="text" on-click={ () => { this.showEditDialog(data) } }>
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="text" on-click={ () => this.verifyRemove(node, data) }>
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
  margin-left: 20px;
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
