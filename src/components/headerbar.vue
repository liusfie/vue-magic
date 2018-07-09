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
    }
  }
}
</script>

<style scoped>
</style>
