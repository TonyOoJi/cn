<template>
  <div class="team">
    <!-- <mavonEditor :value="value"/> -->
    <el-row style="height:100%;">
        <el-col :span="5">
          <div>
            <el-button class="new-apad" @click="showNewPadDialog()">新建一个协作</el-button>
            <el-tooltip class="item" effect="dark" content="将协作链接发送给其他人" placement="bottom-end">
              <el-button style="border:0px;" v-popover:popover><i class="el-icon-share"></i></el-button>
            </el-tooltip>
            <el-popover
              ref="popover"
              placement="bottom"
              title="复制以下链接给团队成员"
              width="400"
              trigger="click"
              :content="urlNow">
            </el-popover>
            <el-tooltip class="item" effect="dark" content="删除当前协作" placement="bottom-end">
              <el-button style="border:0px;" @click="deletePad()"><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
          </div>
          <div style="height: 460px;overflow: auto;">
          <el-table
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            @row-click="openPad">
            <el-table-column
              prop="padname"
              label="拥有的协作文档"
              style="width: 100%">
            </el-table-column>
          </el-table>
          </div>
        </el-col>
        <el-col :span="19" style="height:100%;">
          <iframe
            :src="etherpad_frame_src"
            class="etherpad-ifram">
          </iframe>
        </el-col>
    </el-row>
    <el-dialog title="新建pad" :visible.sync="dialogNewPadVisible" width='600px'>
      <el-form v-model="form">
        <el-form-item label="请填写：" label-width='120px'>
          <el-input v-model="form.padName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewPadVisible = false">取 消</el-button>
        <el-button type="primary" @click="newPad()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import abe from '../../api/axios_back_end'
// import { mavonEditor } from 'mavon-editor'

export default {
//   components: {
//     mavonEditor
//   },
  data () {
    return {
      etherpad_frame_src: '',
      tableData: [],
      dialogNewPadVisible: false, // 弹框控制显示属性
      form: {
        padName: '' // 修改名称的接受变量
      },
      urlNow: '', // 当前pad的url
      padid: '',
      padname: '' // 当前
    }
  },
  beforeCreate () {
    this.$nextTick(function () {
      // 创建组件前的操作
      this.refreshPads()
    })
  },
  computed: {

  },
  methods: {
    openPad (row, event, column) {
      this.etherpad_frame_src = row.url + '?showChat=true&showLineNumbers=true&alwaysShowChat=true&userName=' + sessionStorage.getItem('username')
      this.urlNow = row.url + '?showChat=true&showLineNumbers=true&alwaysShowChat=true'
      // alert(this.etherpad_frame_src)
      this.padid = row.padid
      this.padname = row.padname
    },
    // 显示新建编辑框
    showNewPadDialog (data) {
      this.dialogNewPadVisible = true
    },
    // newpad
    newPad () {
      if (this.form.padName.length !== 0) {
        var params = {
          'username': sessionStorage.getItem('username'),
          'newPadName': this.form.padName
        }
        abe.newPad(params).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '名称重复，请重新命名',
              type: 'error'
            })
          }
          // shuaxin
          this.refreshPads()
          // this.refreshDirs()
        }).catch(err => {
          console.log(err)
        })
        this.dialogNewPadVisible = false
        this.form.padName = ''
      } else {
        this.$message({
          message: '不输入是不行的',
          type: 'warning'
        })
      }
    },
    // getpads
    refreshPads () {
      var params = {
        'username': sessionStorage.getItem('username')
      }
      abe.getPads(params).then(res => {
        this.tableData = res.data.pads
      }).catch(err => {
        console.log(err)
      })
    },
    // delete
    deletePad () {
      var params = {
        'padid': this.padid,
        'username': sessionStorage.getItem('username'),
        'padname': this.padname
      }
      abe.deleltePad(params).then(res => {
        this.refreshPads()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.etherpad-ifram {
    width: 98%;
    /* height: 516px; */
    height: 100%;
    border-width: 0px;
}
.team {
    height: 100%;
}
.new-apad {
    margin-top: 5px;
    border:0px;
}
</style>
