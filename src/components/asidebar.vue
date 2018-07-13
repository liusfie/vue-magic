<template>
  <el-menu :default-active="$route.path" v-loading="loading" class="el-menu-demo" background-color="#F7FCFC" text-color="#000000" active-text-color="#FF0000" router>
    <template v-for="data in asideList">
      <el-menu-item :index="data.index" :key="data.index">
        {{data.title}}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { getList } from '@/api/headerbar'
export default {
  name: 'asidebar',
  data () {
    return {
      asideList: null,
      loading: false
    }
  },
  created () {
    this.getasideList()
  },
  methods: {
    getasideList () {
      this.loading = true
      getList(this.listQuery).then(response => {
        this.menuList = response.data.menuList
        this.theroute = '/' + this.$route.path.split('/', 2)[1]
        for (var i = 0, len = this.menuList.length; i < len; i++) {
          if (this.menuList[i].item === undefined) continue
          const item1 = this.menuList[i].item
          for (var j = 0, len1 = item1.length; j < len1; j++) {
            if (item1[j].index === this.theroute) {
              this.asideList = item1[j].item
            }
          }
        }
        this.loading = false
        // console.log(this.asideList)
      })
    }
  },
  watch: {
    '$route': 'getasideList'
  }
}
</script>

<style scoped>
  .el-menu {
    border-right: 0px;
  }
</style>
