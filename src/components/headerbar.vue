<template>
  <el-menu :default-active="$route.path" v-loading="loading" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/logo">
      <img src="../assets/logo.svg" height="56">
    </el-menu-item>
    <template v-for="data in menuList">
      <el-submenu :index="data.index" :key="data.index" :show-timeout=0 :hide-timeout=0 v-if="typeof data.item !== 'undefined'">
        <template slot="title">{{data.title}}</template>
        <template v-for="item in data.item">
          <el-submenu :index="item.index" :key="item.index" :show-timeout=0 :hide-timeout=0 v-if="typeof item.item !== 'undefined'">
            <template slot="title">{{item.title}}</template>
            <template v-for="item1 in item.item">
              <el-menu-item :index="item1.index" :key="item1.index">{{item1.title}}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item :index="item.index" :key="item.index" v-else>{{item.title}}</el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item :index="data.index" :key="data.index" v-else>{{data.title}}</el-menu-item>
    </template>
      <el-dropdown style="float: right">
      <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" height="45" style="padding-right: 40px ;padding-top: 8px"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>昵称</el-dropdown-item>
          <router-link to="/">
            <el-dropdown-item>用户信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided><span @click="logout">LogOut</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </el-menu>
</template>

<script>
import { getList } from '@/api/headerbar'
export default {
  name: 'headerbar',
  data () {
    return {
      menuList: null,
      loading: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      this.loading = true
      getList(this.listQuery).then(response => {
        this.menuList = response.data.menuList
        this.loading = false
      })
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style scoped>
  a:link {
    text-decoration: none;
  }

</style>
