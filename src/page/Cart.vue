<template>
  <div id="cart" class="fullScreen">
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
	<div v-if="cartList.length > 0">
	  <van-checkbox-group v-model="result" ref="checkboxGroup" class="all-item">
		<div v-for="item in cartList" :key="item.id" class="cart-item onePx_bottom">
		  <div class="check">
			<div class="box">
			  <van-checkbox :name="item.product_id" checked-color="#ab2b2b"
							@click="checkCartGoods(item)"></van-checkbox>
			</div>
		  </div>
		  <img :src="item.list_pic_url" alt="none">
		  <div class="message">
			<div>{{revise ? '已选择' : item.goods_name}}</div>
			<div v-if="item.goods_specifition_name_value.length!==0">{{item.goods_specifition_name_value}}</div>
			<div>
			  ￥ {{item.retail_price}}
			  <div>
				<van-stepper @change="addOrCutGoodsNum(item)" v-model="item.number" v-if="revise"/>
			  </div>
			</div>
		  </div>
		  <div class="number" v-if="!revise">x {{item.number}}</div>
		</div>
	  </van-checkbox-group>
	  <div class="cart-choices onePx_top">
		<div class="all-check">
		  <van-checkbox v-model="checked" checked-color="#ab2b2b" @click="selectAll"></van-checkbox>
		</div>
		<div class="has-choose">
		  {{this.checked ? '全选' : '已选'}}（{{revise ? result.length : cartTotal.checkedGoodsCount}}）
		  <span class="all-money" v-show="!revise">￥ {{cartTotal.checkedGoodsAmount}}</span>
		</div>

		<div class="change" @click="changeMode">{{revise ? '完成' : '编辑'}}</div>
		<div class="btn" @click="order">{{revise ? '删除所选' : '下单'}}</div>
	  </div>
	</div>
	<div v-else class="none-goods fullScreen">
	  <img :src="image_no_goods" alt="none">
	  <div>去添加点什么吧~</div>
	</div>

  </div>
</template>

<script>
  import * as Https from '../service';
  export default {
    name: 'Cart',
    data() {
      return {
        checked: false,
        revise: false,
        deleteArr: [],
        result: [],
        cartList: [],
        cartTotal: {},
        image_no_goods: require('@/assets/img/noGoods.png'),
      }
    },
    activated() {
      this.getAllData();
    },
    methods: {
      async getAllData() {
        let {cartList, cartTotal} = await Https.getCartData();
        this.cartTotal = cartTotal;
        this.cartList = cartList;
        console.log({cartList, cartTotal});
        this.$toast.clear();
        this.resetResult(1);
        this.initAll();
      },
      resetResult(num) {
        this.clearResult()
        this.cartList.forEach(item => {
          if (item.checked === num) {
            this.result.push(item.product_id);
          }
        });
      },
      initAll() {
        this.checked = this.cartList.length === this.result.length;
      },
      checkCartGoods(item) {
        if (this.revise) {
          if (this.result.filter(it => it === item.product_id).length > 0) {
            let index = this.result.indexOf(item.product_id);
            this.result.splice(index, 1);
          } else {
            this.result.push(item.product_id);
          }
          this.initAll();
        } else {
          this.chooseCart(item, 1);
        }
      },
      async chooseCart(item, num) {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          mask: true,
          message: '加载中...',
        });
        if (num === 1) {
          var isChecked = item.checked === 1 ? 0 : 1, productIds = item.product_id;
        } else {
          var isChecked = this.checked ? 0 : 1;
          this.clearResult()
          this.cartList.forEach(it => {
            this.result.push(it.product_id)
          })
          var productIds = this.result.join(',');
        }
        let {errno, data} = await Https.postCartCheck({
          isChecked,
          productIds,
        });
        if (errno === 0) {
          this.cartTotal = data.cartTotal;
          this.cartList = data.cartList;
        } else {
          this.$toast.fail('勾选失败');
        }
        this.$toast.clear();
        this.initAll();
      },
      selectAll() {
        if(!this.revise) {
          if (!this.checked) {
            this.$refs.checkboxGroup.toggleAll(true);
            console.log(this.result) //点击全局按钮会帮你实现视觉勾选但不会操作数组本身
            this.chooseCart('item', 0);
          } else {
            this.$refs.checkboxGroup.toggleAll();
            this.chooseCart('item', 0);
          }
        } else {
          this.clearResult();
          !this.checked ?
          this.cartList.forEach(item => {
            this.result.push(item.product_id)
          }) : ''
        }

      },
      changeMode() {
        this.revise = !this.revise;
        if (this.revise) {
          this.clearResult();
          this.checked = false
        } else {
          this.resetResult(1);
        }
      },
      order() {
        if (!this.revise) {
          this.$toast('下单功能正在完善中！');
        } else {
          this.deleteAll();
        }
      },
      async deleteAll() {
        let productIds = this.result.join(',');
        const {errno, errmsg, data} = await Https.postCartDelete({productIds});
        console.log({errno, errmsg, data});
        if (errno === 0) {
          this.cartTotal = data.cartTotal;
          this.cartList = data.cartList;
          this.clearResult()
        } else {
          this.$toast.fail('删除失败');
        }
      },
      clearResult() {
        this.result = [];
      },
      async addOrCutGoodsNum(item) {
        let goodsId = item.goods_id
        let id = item.id
        let number = item.number
        let productId = item.product_id

        const {errno, errmsg, data} = await Https.postCartUpdate({productId,id,number,goodsId});
        console.log({errno, errmsg, data});
        if (errno === 0) {
          this.cartTotal = data.cartTotal;
          this.cartList = data.cartList;
        } else if (errno === 400){
          this.$toast.fail('库存不足');
          let index = this.cartList.indexOf(item)
          this.cartList[index].number = number - 1
        } else{
          this.$toast.fail('修改失败');
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #cart {
	.none-goods {
	  background: #f5f5f9;
	  top: 40px;

	  img {
		margin: 100px auto 24px;
		display: block;
	  }

	  div {
		font-size: 16px;
		text-align: center;
		color: #afafaf;
	  }
	}

	.service-list {
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
	.all-item {
	  position: fixed;
	  top: 40px;
	  left: 0;
	  right: 0;
	  bottom: 107px;
	  overflow-y: scroll;
	  .cart-item {
		@include wh(110px);
		display: flex;
		padding: 10px 8px 10px 0;
		font-size: 15px;

		.check {
		  @include wh(110px, 40px);
		  line-height: 110px;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}

		img {
		  @include wh(90px, 90px);
		}

		.message {
		  display: flex;
		  justify-content: space-between;
		  flex-direction: column;

		  div:last-child {
			color: red;

			div {
			  display: inline-block;
			  margin-left: 35px;
			}
		  }
		}

		.number {
		  flex: 1 1;
		  text-align: right;
		}
	  }
	}

	.cart-choices {
	  position: fixed;
	  left: 0;
	  bottom: 52px;
	  z-index: 52;
	  width: 100%;
	  height: 55px;
	  background: white;
	  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, .2);
	  display: flex;
	  align-items: center;
	  padding: 0 0 0 12px;
	  font-size: 16px;

	  .has-choose {
		margin-left: 10px;
		flex: 1 1;
	  }

	  .change {
		width: auto;
		margin-right: 10px;
	  }

	  .btn {
		width: 111px;
		height: 100%;
		background: #ab2b2b;
		color: white;
		line-height: 55px;
		text-align: center;
	  }
	}
  }
</style>
