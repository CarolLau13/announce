<template>
  <div id="login">
    <h2>公告管理系统</h2>
    <div class="content">
      <el-input
        placeholder="用户名"
        prefix-icon="el-icon-user-solid"
        class="username"
        v-model="username"
      >
      </el-input>
      <el-input
        placeholder="密码"
        prefix-icon="el-icon-lock"
        show-password
        class="psd"
        v-model="password"
      >
      </el-input>
      <el-button type="primary" class="login" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:30000/admin/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          this.$message({
            type: "success",
            message: "登录成功!",
          });
          this.$router.push("/admin");
        })
        .catch((res) => {
          this.$message.error("登录失败！");
        });
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 150px 0 50px 0;
  text-align: center;
}
.content {
  width: 600px;
  margin: 0 auto;
}
.username,
.psd {
  margin-bottom: 25px;
  text-align: center;
}

.login {
  display: block;
  width: 100%;
}
</style>