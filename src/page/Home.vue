<template>
  <div id="home" class="fullScreen" v-if="showHome">
    <Banner :banner="homeData.banner" image_url="image_url"/>
    <main-topic :channel="homeData.channel"/>
    <div class="brand">
      <div class="title">
        品牌制造商直供
      </div>
      <div class="brand-item" v-for="item in homeData.brandList" :key="item.id" @click="goToNextPage('/brand', item.id)">
        <div class="name">{{item.name}}</div>
        <div class="price">{{item.floor_price}}元起</div>
        <img :src="item.new_pic_url" alt="none">
      </div>
    </div>
    <div class="new-goods thickBottom">
      <div class="title onePx_border">新品首发</div>
      <div class="new-goods-item" v-for="item in homeData.newGoodsList" :key="item.id">
        <img v-lazy="item.list_pic_url" alt="none" />
        <div class="name">{{item.name}}</div>
        <div class="price">￥{{item.retail_price}}</div>
      </div>
    </div>
    <div class="hot-goods thickBottom">
      <div class="title onePx_border">人气推荐</div>
      <div class="hot-goods-item onePx_bottom" v-for="item in homeData.hotGoodsList" :key="item.id">
        <img v-lazy="item.list_pic_url" alt="none" />
        <div class="infos">
          <div class="name">{{item.name}}</div>
          <div class="detail">{{item.goods_brief}}</div>
          <div class="price">￥{{item.retail_price}}</div>
        </div>
      </div>
    </div>
    <div class="top-goods">
      <div class="title onePx_border">专题精选</div>
      <slider>
        <div v-for="item in homeData.topicList" :key="item.id" class="item-swipe">
          <img :src="item.item_pic_url" alt="none" class="swipe-image">
          <div class="swipe-title">
            {{item.title}}<span>￥ {{item.price_info}} 起</span>
          </div>
          <div class="swipe-detail">{{item.subtitle}}</div>
        </div>
      </slider>
    </div>
    <div class="cate-goods" v-for="item in homeData.categoryList" :key="item.id">
      <div class="cate-title">{{item.name}}</div>
      <div class="goods-list" v-for="element in item.goodsList" :key="element.id">
        <img v-lazy="element.list_pic_url" alt="none">
        <div class="name">{{element.name}}</div>
        <div class="price">￥ {{element.retail_price}}</div>
      </div>
      <div class="more-list">
        <div class="item">
          <div>更多{{item.name}}好物</div>
          <img :src="icon" alt="none"/>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import goback from '../assets/js/mixins/goback'
  import * as Https from '../service'
  import Banner from '../components/common/Banner'
  import MainTopic from '../components/MainTopic'
  import Slider from '../components/common/Slider'
  export default {
    name: 'Home',
    mixins: [goback],
    data() {
      return {
        showHome: false,
        homeData: {},
        icon: require('@/assets/img/icon_go_more.png'),
      }
    },
    created() {
      this.loadingStart()
      this.getData()
    },
    methods: {
      async getData() {
        let {data, errno} = await Https.getHomeData()
        if (errno === 0) {
          this.homeData = data
          this.$toast.clear()
          this.showHome = true
        }
      },
      goToNextPage(newPath, id) {
        this.$router.push({
          path: newPath,
          query: {
            id
          }
        })
      }
    },
    components: {
      Banner,
      MainTopic,
      Slider
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #home {
    background: transparent;
    overflow-x: hidden;
    padding-bottom: 60px;
    .title {
      height: 56px;
      text-align: center;
      font-size: 15px;
      line-height: 56px;
      letter-spacing: 1.3px;
      font-weight: bold;
    }
    .brand {
      font-size: 0;
      .brand-item {
        background: none;
        display: inline-block;
        @include wh(105px, 50%);
        position: relative;
        img {
          @include imgBase();
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .name {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 16px;
        }
        .price {
          color: darkgrey;
          position: absolute;
          top: 32px;
          left: 10px;
          font-size: 12px;
        }
      }
    }
    .new-goods {
      padding-bottom: 10px;
      font-size: 0;
      .new-goods-item {
        text-align: center;
        display: inline-block;
        width: 50%;
        img {
          @include wh(160px, 100%);
        }
        .name {
          font-size: 15px;
        }
        .price {
          margin-top: 15px;
          color: darkred;
          font-size: 15px;
        }
      }
    }
    .hot-goods {
      .hot-goods-item {
        display: flex;
        @include wh(155px, 94%);
        margin: 0 auto;
        padding: 3px 0;
        img {
          width: 155px;
          height: 100%;
        }
        .infos {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-size: 16px;
          }
          .detail {
            font-size: 13px;
            padding: 13px 0;
            color: darkgrey;
          }
          .price {
            color: darkred;
            font-size: 16px;
          }
        }
      }
    }
    .top-goods {
      font-size: 0;
      .item-swipe {
        display: inline-block;
        padding: 0 8px;
        @include wh(215px, 318.75px);
        .swipe-image {
          width: 100%;
          height: 170px;
        }
        .swipe-title {
          padding: 8px 0;
          font-size: 16px;
          span {
            color: darkred;
          }
        }
        .swipe-detail {
          overflow: hidden;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 0 8px;
          font-size: 14px;
          color: #9c9c9c;
        }
      }
    }
    .cate-goods {
      .cate-title {
        @include wh(42.7px);
        font-size: 16px;
        background: #f5f5f9;
        text-align: center;
        line-height: 42.7px;
      }
      .goods-list {
        padding-bottom: 10px;
        text-align: center;
        display: inline-block;
        width: 50%;
        border: .5PX solid #eeeeee;
        img {
          @include wh(160px, 100%);
        }
        .name {
          overflow: hidden;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 15px;
        }
        .price {
          margin-top: 15px;
          color: darkred;
          font-size: 15px;
        }
      }
      .more-list {
        float: right;
        .item {
          height: 217px;
          vertical-align: middle;
          text-align: center;
          display: table-cell;
          width: 187.5px;
          border: .5PX solid #eeeeee;
          font-size: 15px;
          img {
            margin-top: 20px;
            @include wh(30px,30px);
          }
        }
      }
    }
  }
</style>
