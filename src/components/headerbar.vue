<template>
  <el-menu :default-active="$route.path" v-loading="loading" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/logo">
      <img src="../assets/logo.png" height="56">
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
    <el-button @click="logout" type="text">注销</el-button>
    <el-button type="text"><a href="/admin" style="color: white">Admin后台</a></el-button>
    <el-select v-model="productid" placeholder="请选择" @change="handlechangepro">
      <el-option
        v-for="item in this.$store.getters.products"
        :key="item.id"
        :label="item.product"
        :value="item.id">
      </el-option>
    </el-select>
    <p>欢迎，<strong>{{ $store.getters.username }}</strong></p>
  </el-menu>
</template>

<script>
import { getList } from '@/api/headerbar'
export default {
  name: 'headerbar',
  data () {
    return {
      productid: this.$store.getters.productid,
      menuList: null,
      loading: false
    }
  },
  created () {
    this.getMenuList()
    if (this.$store.getters.products && this.$store.getters.products.length === 0) {
      this.$notify({
        title: '警告',
        message: '请联系管理员添加业务权限',
        type: 'warning',
        position: 'bottom-right',
        duration: 0
      })
    }
  },
  methods: {
    getMenuList () {
      this.loading = true
      getList(this.listQuery).then(response => {
        this.menuList = response.data
        this.loading = false
      })
    },
    handlechangepro (value) {
      this.$store.commit('SET_PRODUCTID', value)
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
  p {
    float: right;
    color: #eeeeee;
    padding-right: 15px
  }
  .el-select {
    float: right;
    padding-right: 15px;
    width:140px ;
    margin-top: 9px
  }
  .el-button {
    float: right;
    padding-right: 18px;
    font-size: 16px;
    color: #eeeeee;
    margin-top: 7px
  }
</style>
