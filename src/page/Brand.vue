<template>
  <div id="brand" class="fullScreen">
    <van-nav-bar :z-index="2" :title="brand.name" left-arrow @click-left="back" :fixed="true"/>
    <img :src="brand.list_pic_url" alt="none" class="top-img">
    <div class="desc thickBottom" v-html="brand.simple_desc"></div>
    <small-goods-tpl :goods-list="goodsList"/>
  </div>
</template>

<script>
  import * as Https from '../service'
  import goback from '../assets/js/mixins/goback'
  import SmallGoodsTpl from "../components/SmallGoodsTpl";
  export default {
    name: 'Brand',
    components: {SmallGoodsTpl},
    mixins: [goback],
    data() {
      return {
        brand: {},
        goodsList: []
      }
    },
    created() {
      this.getAllData()
    },
    methods: {
      async getAllData() {
        let id = this.$route.query.id
        let {brand} = await Https.getBrandDetail({id})
        this.brand = brand
        let url = `http://202.96.155.121:8888/api/goods/list?brandId=${id}&page=1&size=10000`
        this.axios.get(url).then(res => {
          let {data: {data: {data}}} = res
          this.goodsList = data
        })
      }
    }
  }
</script>
getBrandDetail
<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #brand {
    overscroll-behavior: contain;
    position: fixed;
    z-index: 52;
    padding-top: 46px;
    font-size: 0;
    .top-img {
      @include wh(210px);
    }
    .desc {
      width: 100%;
      padding: 14px;
      font-size: 15px;
      line-height: 20px;
      text-indent: 2em;
      color: grey;
    }
  }
</style>
