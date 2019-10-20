<template>
  <div id="categroys" class="fullScreen">
    <van-nav-bar :z-index="2" title="奇趣分类" left-arrow @click-left="back" :fixed="true"/>
	<van-tabs v-model="active" @click="getGoodsData(brotherCategory[active].id)">
	  <van-tab :title="item.name" v-for="item in brotherCategory" :key="item.id">
		<categorys-tpl @goods="jumpGoodsPage" :page-data="goodsList" :title="item.name" :front-name="item.front_name"/>
	  </van-tab>
	</van-tabs>
    <router-view/>
  </div>
</template>

<script>
  import * as Https from '../service';
  import goback from '../assets/js/mixins/goback';
  import CategorysTpl from '../components/CategorysTpl';
  export default {
    name: 'Categorys',
    mixins: [goback],
    data() {
      return {
        active: 0,
        brotherCategory: [],
        goodsList: [],
      };
    },
    created() {
      this.loadingStart();
      this.getNavData();
      this.getGoodsData(this.$route.query.id);
    },
    methods: {
      async getNavData() {
        let id = this.$route.query.id;
        let {brotherCategory} = await Https.getCategoryNavData({id});
        this.brotherCategory = brotherCategory;
        this.brotherCategory.forEach((item, index) => {
          if (item.id === this.$route.query.id) {
            this.active = index;
          }
        });
      },
      async getGoodsData(categoryId) {
        let {data} = await Https.getGoodsData({categoryId});
        this.goodsList = data;
        this.$toast.clear();
      },
      jumpGoodsPage(id) {
        console.log(id);
        this.$router.push({
          path: `/categorys/goods`,
          query: {
            gid: id
          }
        })
      },
    },
    components: {
      CategorysTpl
    },
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  #categroys {
	position: fixed;
	z-index: 52;
	padding-top: 46px;
  }
</style>
