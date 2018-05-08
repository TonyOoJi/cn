<template>
  <div class="team">
    <!-- <mavonEditor :value="value"/> -->
    <el-row style="height:100%;">
        <el-col :span="5">
          <div>sadasdas</div>
        </el-col>
        <el-col :span="19" style="height:100%;">
          <iframe
            :src="etherpad_frame_src"
            class="etherpad-ifram">
          </iframe>
        </el-col>
    </el-row>
  </div>
</template>
<script>
// import { mavonEditor } from 'mavon-editor'

export default {
//   components: {
//     mavonEditor
//   },
  data () {
    return {
      etherpad_frame_src: 'http://127.0.0.1:9001/p/iboDjQVTOW?showChat=true&showLineNumbers=true'
    }
  },
  computed: {

  },
  methods: {

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
</style>
