<template>
  <div id="app">
    <keep-alive>
      <router-view @showTab="showTabBar"/>
    </keep-alive>
    <TabBar v-if="showTab" :tab-list="tabList"/>
  </div>
</template>

<script>
  import TabBar from './components/common/TabBar'
  export default {
    name: 'App',
    data() {
      return {
        showTab: false,
        tabList: [
          {icon:'iconfont icon-caidaniconshouyehui',name: '首页',url:'/'},
          {icon:'iconfont icon-clone',name: '专题',url:'/topic'},
          {icon:'iconfont icon-sort',name: '分类',url:'/catelog'},
          {icon:'iconfont icon-cart',name: '购物车', url:'/cart'},
          {icon:'iconfont icon-mine',name: '我的',url:'/mine'}
        ]
      }
    },
    created() {
      if(localStorage.getItem('ShopToken')) {
        this.showTabBar()
      } else {
        this.$router.push({
          path: '/login'
        })
        this.$toast.clear()
      }
    },
    methods: {
      showTabBar() {
        this.showTab = true
      }
    },
    components: {
      TabBar
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  #app {
    overflow-x: hidden;
  }
</style>
