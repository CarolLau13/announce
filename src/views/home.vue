<template>
  <div id="home">
    <el-table :data="info" style="width: 100%">
      <el-table-column prop="title" label="标题" width="200"> </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      info: [],
    };
  },
  created() {
    axios.get("http://localhost:30000/announce").then((res) => {
      console.log(res.data);
      this.info = res.data;
      this.$message("加载完成");
    });
  },
};
</script>

<style scoped>
button {
  display: block;
  margin: 0 auto;
}
</style>