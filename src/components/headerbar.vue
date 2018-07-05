<template>
  <el-menu :default-active="$route.path" v-loading="listLoading" class="el-menu-demo" mode="horizontal"  @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <template v-for="data in menuList">
      <el-submenu :index="data.index" :key="data.index" :show-timeout=0 hide-timeout=0 v-if="typeof data.item !== 'undefined'">
        <template slot="title">
          {{data.title}}
        </template>
        <template v-for="item in data.item">
            <el-menu-item :index="item.index" :key="item.index">
              {{item.title}}
            </el-menu-item>
        </template>
      </el-submenu>
        <el-menu-item :index="data.index" :key="data.index" v-else>
          {{data.title}}
        </el-menu-item>
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
      listLoading: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getMenuList () {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.menuList = response.data.menuList
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
</style>
