<template>
  <div class="sidebar">
    <el-menu :default-active="route" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <el-submenu index="1" >
        <template slot="title">
          <i class=""></i>客户管理</template>
        <el-menu-item  index="/customerCenter/userCenter">基本信息</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    route () {
      let router = ''
      if (this.$route.path.match('customer')) {
        router = `/${this.$route.path.split('/')[1]}/${this.$route.path.split('/')[2]}`
      } else {
        router = `/${this.$route.path.split('/')[1]}`
      }
      return router
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2E363F;
  text-align: center;
  font-size: 30px;
}

.el-submenu__icon-arrow {
  right: 70px;
}

.sidebar>ul {
  height: 100%;
}
</style>
