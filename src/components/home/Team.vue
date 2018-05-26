<template>
  <div class="team">
    <!-- <mavonEditor :value="value"/> -->
    <el-row style="height:100%;">
        <el-col :span="5">
          <div>
              <el-button class="new-apad" @click="showNewPadDialog()">新建一个协作pad</el-button>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            @row-click="openPad">
            <el-table-column
              prop="padname"
              label="拥有的协作文档"
              style="width: 100%">
            </el-table-column>
          </el-table>
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
      etherpad_frame_src: 'http://127.0.0.1:9001/p/iboDjQVTOW?showChat=true&showLineNumbers=true',
      tableData: [{
        padname: 'asdasdasd'
      }],
      dialogNewPadVisible: false, // 弹框控制显示属性
      form: {
        padName: '' // 修改名称的接受变量
      }
    }
  },
  computed: {

  },
  methods: {
    openPad (row, event, column) {
      alert(row.padname)
      this.etherpad_frame_src = 'http://127.0.0.1:9001/p/aaa@4?showChat=true&showLineNumbers=true'
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
          this.$message({
            message: '成功',
            type: 'success'
          })
          // shuaxin
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
}
</style>
