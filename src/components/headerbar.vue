<template>
  <el-menu :default-active="$route.path" class="el-menu-demo"  mode="horizontal"  @select="handleSelect"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <template v-for="data in menuList">
      <el-submenu :index="data.index" :key="data.index" v-if="typeof data.item !== 'undefined'">
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
export default {
  name: 'headerbar',
  data () {
    return {
      menuList: [
        {
          index: '/homepage',
          title: '主页'
        },
        {
          index: '/opstool',
          title: '运维工具',
          item: [
            {
              index: '/opstool/autodeny',
              title: '自动封禁'
            },
            {
              index: '/opstool/autodeny2',
              title: '自动封禁2'
            }
          ]
        },
        {
          index: 'other',
          title: '其他',
          item: [
            {
              index: '/login',
              title: '登录'
            },
            {
              index: '/404',
              title: '404页面'
            }
          ]
        }
      ]
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
      this.setActiveIndex(this.menuList, this.$route.path)
      // 把MenuList的数据存入Vuex中
      this.$store.commit('headerbar/setMenuList', this.menuList)
    },
    // 获取route的信息，并设置activeIndex
    setActiveIndex (item, currentPath) {
      item.forEach(itemData => {
        if (itemData.hasOwnProperty('routerLinkTo')) {
          if (itemData.routerLinkTo === currentPath) {
            this.$nextTick(() => {
              this.defaultActive = itemData.index
            })
            return false
          }
        }
        if (itemData.hasOwnProperty('item')) {
          this.setActiveIndex(itemData.item, currentPath)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
