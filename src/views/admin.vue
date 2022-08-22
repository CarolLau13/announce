<template>
  <div style="height: 100%">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-openeds="['1', '3']"
          text-color="#b9c3d1"
          active-text-color="#5a9cf8"
          background-color="#334054"
          @select="handleSelect"
        >
          <el-menu-item index="0">
            <template slot="title"
              ><i class="el-icon-discover"></i>管理后台</template
            >
          </el-menu-item>
          <el-menu-item index="1">
            <template slot="title"
              ><i class="el-icon-info"></i>公告管理</template
            >
          </el-menu-item>
          <el-menu-item index="2">
            <template slot="title"
              ><i class="el-icon-user-solid"></i>用户管理</template
            >
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 15px">
          <span class="setTitle">{{ title }}</span>
          <span style="font-size: 15px">当前用户：</span
          ><span style="color: #5a9cf8"
            ><strong>{{ currentUser }}</strong></span
          >
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="modifyPass"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item divided @click.native="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "management",
  data() {
    return {
      title: "管理后台",
      titles: ["管理后台", "公告管理", "用户管理"],
      currentUser: "",
    };
  },
  created() {
    // console.log("已刷新");
    this.$router.push("/admin/dashboard");
    axios
      .get("/api/users/current")
      .then((res) => {
        // console.log(res.data.name);
        this.currentUser = res.data.name;
      })
      .catch((err) => {
        this.$router.push("/admin/login");
      });
  },
  methods: {
    handleSelect(index) {
      // console.log(index);
      this.title = this.titles[index];
      switch (index) {
        case "0":
          this.$router.push("/admin/dashboard");
          break;
        case "1":
          this.$router.push("/announceManage");
          break;
        case "2":
          this.$router.push("/userManagement");
          break;
      }
    },
    modifyPass() {
      this.$router.push("/modifyPassword");
    },
    logout() {
      axios
        .post("/api/admin/logout")
        .then((res) => {
          // console.log(res);
          this.$router.push("/admin/login");
          this.$message({
            type: "success",
            message: "登出成功!",
          });
        })
        .catch((err) => {
          this.$message.error("登出失败");
        });
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  line-height: 60px;
}

.el-header .setTitle {
  position: absolute;
  left: 20px;
  top: 0;
  font-size: 20px;
  font-weight: 700;
}

.el-aside {
  background-color: #364052;
  color: #333;
  height: 100%;
}

.el-menu {
  width: 100%;
  height: 100%;
  border-right: none;
}

/* 下拉菜单 */
.el-dropdown-link {
  cursor: pointer;
  color: black;
  margin-left: 25px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>