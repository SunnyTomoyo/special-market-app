<template>
  <div id="collect" class="fullScreen">
    <van-nav-bar :z-index="2" title="我的收藏" left-arrow @click-left="back" :fixed="true"/>
    <div class="collect-item-wrap onePx_bottom" v-for="(item, index) in collectGoods" :key="index">
      <img :src="item.list_pic_url" alt="none">
      <div class="content">
        <div class="name">{{item.name}}</div>
        <div class="detail">{{item.goods_brief}}</div>
        <div class="price">￥{{item.retail_price}}</div>
      </div>
      <div class="del-icon" @click="deleteAddress(index)">
        <img :src="icon" alt="delAddress" />
      </div>
    </div>
  </div>
</template>

<script>
  import goback from '../assets/js/mixins/goback'
  import * as Https from '../service'
  export default {
    name: 'Collect',
    mixins: [goback],
    data() {
      return {
        collectGoods: [],
        icon: require('@/assets/img/del-address.png'),
      }
    },
    created() {
      this.loadingStart()
      this.getAllData()
    },
    methods: {
      deleteAddress(index) {
        this.$dialog.confirm({
          title: '取消收藏',
          message: '您确定取消该收藏吗？'
        }).then(async () => {
          let typeId = 0;
          let valueId = this.collectGoods[index].value_id
          await Https.postDoLikes({typeId, valueId})
          this.collectGoods.splice(index, 1)
        })
      },
      async getAllData() {
        this.collectGoods = await Https.getLikes({typeId: 0})
        this.$toast.clear()
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #collect {
    z-index: 52;
    position: fixed;
    padding-top: 46px;
    .collect-item-wrap {
      @include wh(117px);
      padding: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      img {
        width: auto;
        height: 100%;
      }
      .content {
        height: 100%;
        flex: 1 1;
        font-size: 15px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .detail {
          font-size: 13px;
          color: #a9a9a9;
        }
        .price {
          color: red;
        }
      }
      .del-icon {
        img {
          @include wh(30px,30px)
        }
      }
    }
  }
</style>
