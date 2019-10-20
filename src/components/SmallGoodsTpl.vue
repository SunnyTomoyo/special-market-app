<template>
  <div>
    <div class="goods-list" v-for="element in goodsList" :key="element.id" @click="getGoodDetail(element.id)">
      <img v-lazy="element.list_pic_url" alt="none"/>
      <div class="name">{{element.name}}</div>
      <div class="price">￥ {{element.retail_price}}元</div>
    </div>
  </div>
</template>

<script>
  import * as Https from '../service'
  export default {
    name: 'SmallGoodsTpl',
    props: {
      goodsList: Array
    },
    methods: {
      getGoodDetail(id) {
        this.$emit('goods', id)
        console.log(id)
        // let res = await Https.getGoodsDetail({id})
        // console.log(res)
        // this.$router.push({
        //   path: '/categorys/goods'
        // })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

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
</style>
