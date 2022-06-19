<template>
  <div id="announceManage">
    <el-table :data="userName" style="width: 100%">
      <el-table-column prop="name" label="用户" width="300"> </el-table-column>
      <el-table-column prop="manipualte" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="addUser"
            @click="handleAdd()"
            >新增</el-button
          >
          <!-- 按新增按钮后的弹框 -->
          <el-dialog
            title="新增用户"
            :visible.sync="addDialogFormVisible"
            class="edit"
          >
            <el-form @submit.native.prevent>
              <el-form-item
                label="用户名："
                :label-width="formLabelWidth"
                class="name"
              >
                <el-input v-model="addUserName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="密码："
                :label-width="formLabelWidth"
                class="psd"
              >
                <el-input
                  v-model="password"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addNewConfirmed"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </template></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userManagement",
  data() {
    return {
      userName: [],
      // currentId: -1,
      formLabelWidth: "120px",
      addUserName: "",
      addDialogFormVisible: false,
      password: "",
    };
  },
  created() {
    // 发送网络请求
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios
        .get("http://localhost:30000/users")
        .then((res) => {
          // console.log(res.data);
          this.userName = res.data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message("加载失败！");
          }
        });
    },
    // 监听删除按钮
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .delete("http://localhost:30000/users", {
              data: {
                id: row.id,
              },
            })
            .then((res) => {
              //   console.log(res);
              this.getInfo();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                this.$router.push("/admin/login");
              } else {
                this.$message("删除失败！");
              }
            });
        })
        .catch(() => {});
    },
    // 监听新增按钮
    handleAdd() {
      this.addDialogFormVisible = true;
    },
    // 监听新增按钮里面的确认按钮
    addNewConfirmed() {
      if (this.addUserName.length !== 0 && this.password.length !== 0) {
        this.addDialogFormVisible = false;
        let newUser = { name: this.addUserName, password: this.password };
        axios
          .put("http://localhost:30000/users", newUser)
          .then((res) => {
            console.log(res.data.success);
            if (res.data.success) {
              this.getInfo();
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.addUserName = "";
              this.password = "";
            } else {
              this.$message.error("该用户已存在");
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push("/admin/login");
            } else {
              this.$message("新增用户失败！");
            }
          });
      } else {
        this.$message.error("用户名和密码不能为空");
      }
    },
  },
};
</script>

<style scoped>
.addUser {
  margin-right: 10px;
}

.edit {
  font-weight: normal;
  text-align: left;
  width: 1300px;
}

.name,
.psd {
  width: 550px;
}
</style>