<template>
  <div class="fullScreen" id="goods" v-if="dataGet">
	<van-nav-bar :z-index="2" :title="allGoodsData.info.name" left-arrow @click-left="back" :fixed="true"/>
	<Banner v-if="allGoodsData.gallery.length" :banner="allGoodsData.gallery" image_url="img_url" :image_height="340"/>
	<ul class="service-list">
	  <li>
		<span>★</span>
		30天无忧退货
	  </li>
	  <li>
		<span>★</span>
		48小时快速退款
	  </li>
	  <li>
		<span>★</span>
		满88元免邮费
	  </li>
	</ul>
	<div class="message onePx_bottom">
	  <div class="title">{{allGoodsData.info.name}}</div>
	  <div class="subtitle">{{allGoodsData.info.goods_brief}}</div>
	  <div class="price">￥{{allGoodsData.productList[0].retail_price}}</div>
	</div>
	<div class="choices thickBottom" @click="showChoices">
	  <div>{{goodName}}</div>
	  <div>x {{buyingCount}}</div>
	  <div>
		选择规格<i class="iconfont icon-right"></i>
	  </div>
	</div>
	<div class="comment-title" v-if="commentData.length > 0">
	  <div>评论 ({{allGoodsData.comment.count}})</div>
	  <div>
		查看全部<i class="iconfont icon-right"></i>
	  </div>
	</div>
	<div class="comment-item thickBottom" v-if="commentData.length > 0">
	  <comment-tpl :all-comment-data="commentData"/>
	</div>
	<div class="goods-attribute" v-if="allGoodsData.attribute.length > 0">
	  <div class="title">
		<span>商品参数</span>
	  </div>
	  <div class="item" v-for="(item, index) in allGoodsData.attribute" :key="index">
		<div class="label">{{item.name}}</div>
		<div class="content">{{item.value}}</div>
	  </div>
	</div>
	<div v-if="allGoodsData.info.goods_desc.length > 0" v-html="allGoodsData.info.goods_desc" class="detail-img thickBottom"></div>
	<div class="issue thickBottom">
	  <div class="title">
		<span>常见问题</span>
	  </div>
	  <div class="problem" v-for="item in allGoodsData.issue" :key="item.id">
		<div class="question">
		  <span>√</span>
		  {{item.question}}
		</div>
		<div class="answer">{{item.answer}}</div>
	  </div>
	</div>
	<div class="related">
	  <div class="title">
		<span>大家都在看</span>
	  </div>
	  <small-goods-tpl :goods-list="goodsRelated"/>
	</div>
	<div class="bottom-cart">
	  <div :class="[allGoodsData.userHasCollect===1 ? 'is-like like': 'is-like']" @click="changeLikes">
		{{allGoodsData.userHasCollect===1?'★': '☆'}}
	  </div>
	  <div class="cart-num" @click="goToCart">
		<i class="iconfont icon-Add-Cart"></i>
		<span>{{goodsCount}}</span>
	  </div>
	  <div class="add-cart" @click="addToCartNow">加入购物车</div>
	  <div class="pay-goods" @click="buyNow">立即购买</div>
	</div>
	<add-goods-tpl @getNum="getCartNum" @goodName="getGoodName" ref="buyIt" :product-list="allGoodsData.productList"
				   :specification-list="allGoodsData.specificationList" :gallery="allGoodsData.gallery"/>
  </div>
</template>

<script>
  import * as Https from '../service';
  import goback from '../assets/js/mixins/goback';
  import Banner from '../components/common/Banner';
  import SmallGoodsTpl from '../components/SmallGoodsTpl';
  import AddGoodsTpl from '../components/AddGoodsTpl';
  import CommentTpl from '../components/common/CommentTpl';
  export default {
    name: 'Goods',
    mixins: [goback],
    data() {
      return {
        buyingCount: 0,
        goodName: '',
        singleGood: {},
        goodsCount: 0,
        commentData: [],
        allGoodsData: {},
        goodsRelated: [],
        dataGet: false,
      };
    },
    created() {
      this.getAllData();
      console.log('this.$route.query.id')
    },
	activated() {
      this.getAllData();
      console.log('this.$route.query.111id')
	},
    methods: {
      showChoices() {
        this.$refs.buyIt.showSelf();
      },
      getGoodName(name, value) {
        this.goodName = name;
        this.buyingCount = value;
      },
      goToCart() {
        this.$router.push({
          path: '/cart',
        });
      },
	  addToCartNow() {
        this.$refs.buyIt.addToCart();
      },
      buyNow() {
        this.$refs.buyIt.buyRightNow();
      },
      async changeLikes() {
        var typeId = 0;
        let valueId = this.$route.query.gid;
        let {data: {type}} = await Https.postDoLikes({typeId, valueId});
        if (type === 'add') {
          this.allGoodsData.userHasCollect = 1;
        } else {
          this.allGoodsData.userHasCollect = 0;
        }
      },
      async getAllData() {
        let id = this.$route.query.gid;
        this.allGoodsData = await Https.getGoodsDetail({id});
        console.log(this.allGoodsData);
        this.dataGet = true;
        if (this.allGoodsData.comment.data.hasOwnProperty('content')) {
          this.commentData.push(this.allGoodsData.comment.data);
        }
        let {goodsList} = await Https.getGoodsRelated({id});
        this.goodsRelated = goodsList;
        console.log(this.allGoodsData);
        this.getCartNum();
      },
      async getCartNum() {
        let {cartTotal: {goodsCount}} = await Https.getCartNum({});
        this.goodsCount = goodsCount;
      },
    },
    components: {
      Banner,
      CommentTpl,
      SmallGoodsTpl,
      AddGoodsTpl,
    }
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #goods {
	overscroll-behavior: contain;
	position: fixed;
	z-index: 53;
	padding: 46px 0;

	.service-list {
	  transform: translateY(-2px);
	  @include wh(40px);
	  background: #f4f4f4;
	  text-align: center;
	  display: flex;
	  justify-content: space-around;

	  li {
		line-height: 40px;

		span {
		  color: red;
		}
	  }
	}

	.message {
	  padding: 15px 0;
	  width: 100%;
	  text-align: center;

	  .title {
		font-size: 20px;
	  }

	  .subtitle {
		padding: 12px 0;
		color: #444;
		font-size: 14px;
	  }

	  .price {
		color: red;
		font-size: 18px;
	  }
	}

	.choices {
	  @include wh(53px);
	  font-size: 15px;
	  display: flex;
	  line-height: 53px;
	  padding: 0 15px;
	  align-items: center;

	  div {
		i {
		  font-size: 18px;
		}

		&:nth-child(1) {
		  color: cornflowerblue;
		  flex: 1 1;
		}

		&:nth-child(2) {
		  color: red;
		}
	  }
	}

	.comment-title {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 50px;
	  padding: 0 20px;
	  border-bottom: 1PX solid #dcdcdc;
	  font-size: 16px;

	  div:first-child {
		flex: 1 1;
		text-align: left;
	  }

	  div:last-child {
		i {
		  font-size: 16px;
		}

		width: auto;
		text-align: right;
	  }
	}

	.goods-attribute {
	  width: 100%;
	  padding: 15px;

	  .title {
		text-align: center;
		margin-bottom: 12px;
		color: $color-text;
		font-size: 16px;
		width: 100%;

		span {
		  position: relative;

		  &:before {
			content: "";
			position: absolute;
			top: 50%;
			left: 0;
			width: 20px;
			border-top: 1PX solid $color-text;
			transform: translate3d(-150%, -50%, 0);
		  }

		  &:after {
			content: "";
			position: absolute;
			top: 50%;
			right: 0;
			width: 20px;
			border-top: 1PX solid $color-text;
			transform: translate3d(150%, -50%, 0);
		  }
		}
	  }

	  .item {
		display: flex;
		align-items: center;
		background: #dcdfe6;
		margin-top: 2PX;

		.label {
		  /*width: 25%;*/
		  width: 75px;
		  color: grey;
		  font-size: 16px;
		  text-align: center;
		}

		.content {
		  flex: 1 1;
		  font-size: 15px;
		  line-height: 19px;
		  padding: 5px;
		}
	  }
	}

	.detail-img {
	  /deep/ p {
		margin: 0;
		padding: 0;
		-webkit-margin-before: 0;
		-webkit-margin-after: 0;

		img {
		  width: 100%;
		  height: auto;
		  display: block;
		}
	  }
	}

	.issue {
	  width: 100%;
	  padding: 15px;

	  .title {
		text-align: center;
		margin-bottom: 12px;
		color: $color-text;
		font-size: 16px;
		width: 100%;

		span {
		  position: relative;

		  &:before {
			content: "";
			position: absolute;
			top: 50%;
			left: 0;
			width: 20px;
			border-top: 1PX solid $color-text;
			transform: translate3d(-150%, -50%, 0);
		  }

		  &:after {
			content: "";
			position: absolute;
			top: 50%;
			right: 0;
			width: 20px;
			border-top: 1PX solid $color-text;
			transform: translate3d(150%, -50%, 0);
		  }
		}
	  }

	  .problem {
		.question {
		  font-size: 16px;
		  padding: 10px 0;

		  span {
			color: red;
		  }
		}

		.answer {
		  font-size: 14px;
		  color: gray;
		  line-height: 18px;
		}
	  }
	}

	.related {
	  .title {
		@include wh(55px);
		line-height: 55px;
		text-align: center;
		color: $color-text;
		font-size: 16px;

		span {
		  position: relative;

		  &:before {
			content: "";
			position: absolute;
			top: 50%;
			left: 0;
			width: 20px;
			border-top: 1PX solid $color-text;
			transform: translate3d(-150%, -50%, 0);
		  }

		  &:after {
			content: "";
			position: absolute;
			top: 50%;
			right: 0;
			width: 20px;
			border-top: 1PX solid $color-text;
			transform: translate3d(150%, -50%, 0);
		  }
		}
	  }
	}

	.bottom-cart {
	  text-align: center;
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  @include wh(42px);
	  background: #fff;
	  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, .2);
	  display: flex;

	  .is-like {
		@include wh(42px, 20%);
		line-height: 42px;
		font-size: 26px;
		text-align: center;
		font-weight: bolder;
		border-right: 1PX solid ghostwhite;
	  }

	  .like {
		color: gold;
	  }

	  .cart-num {
		@include wh(42px, 20%);
		line-height: 42px;
		text-align: center;
		color: #2196f3;
		position: relative;

		i {
		  font-size: 26px;
		}

		span {
		  position: absolute;
		  font-size: 16px;
		  right: 18px;
		  top: -8px;
		  color: red;
		  font-weight: bolder;
		}
	  }

	  .add-cart {
		@include wh(42px, 30%);
		color: white;
		line-height: 42px;
		background: linear-gradient(90deg, #ff9500, #ff5e3a);
	  }

	  .pay-goods {
		@include wh(42px, 30%);
		color: white;
		line-height: 42px;
		background: linear-gradient(90deg, #1d62f0, #19d5fd);
	  }
	}
  }
</style>
