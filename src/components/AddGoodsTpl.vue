<template>
  <van-popup v-model="show" position="bottom" class="choose-goods">
    <div class="base-msg">
      <img :src="gallery[0].img_url" alt="none" v-if="gallery.length > 0">
      <div class="message">
        <div>单价: <span>￥{{choicesGoods.retail_price}}</span></div>
        <div>库存: <span>{{choicesGoods.goods_number}}件</span></div>
        <div>已选择:<br/>{{goodName}}</div>
      </div>
      <div class="close" @click="show = false">
        <i class="iconfont icon-cc-close-square"></i>
      </div>
    </div>
	<div v-if="specificationList.length !== 0">
	  <div class="good-size" v-for="(item, index) in specificationList" :key="index">
		<div class="name">
		  {{item.name}}
		</div>
		<div class="list">
		  <div :class="['sizes', choicesArr[index] === i ? 'sizes-active' : '']" v-for="(ele, i) in item.valueList" :key="ele.id" @click="chooseSize(index, i)">
			{{ele.value}}
		  </div>
		</div>
	  </div>
	</div>

    <div class="good-size" >
      <div class="name">数量</div>
      <div v-if="choicesGoods.goods_number > 0"><van-stepper v-model="value" :max="choicesGoods.goods_number" input-width="60px" button-size="40px"/></div>
	  <div v-else class="name">已售罄</div>
    </div>
    <div class="btn-group">
      <div class="add" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buyRightNow">立即下单</div>
    </div>
  </van-popup>
</template>

<script>
  import * as Https from '../service'
  export default {
    name: 'AddGoodsTpl',
    data() {
      return {
        value: 1,
        activeId: '',
		choicesGoods: {},
		goodName: '',
		choicesArr: [0,0],
		show: false
      }
    },
    props: {
      gallery: Array,
      imgUrl: String,
      specificationList: Array,
	  productList: Array
    },
	created() {
      if(this.specificationList.length !== 0) {
        this.initData()
	  } else {
        this.simpleData()
	  }
	},
	watch: {
      value(newV, oldV) {
        if(newV !== oldV) {
          this.$emit('goodName', this.goodName, this.value)
		}
	  }
	},
	methods: {
      simpleData() {
		this.choicesGoods = this.productList[0]
		this.goodName = '本商品'
		this.$emit('goodName', this.goodName, this.value)
	  },
      async addToCart() {
        console.log(this.choicesGoods)
        let goodsId = this.choicesGoods.goods_id
		let productId = this.choicesGoods.id
		let number = this.value
        let {errno, errmsg} = await Https.postAddCart({goodsId,number,productId})
		console.log({errno, errmsg})
		if(errno === 0){
			this.$toast.success({
			  message: '添加成功！',
			  onClose: () => {
				this.$emit('getNum')
              }
			})
		} else {
		  this.$toast.fail({
			message: `添加失败！${errmsg}`,
		  })
		}
	  },
      buyRightNow() {
        this.$toast('下单功能正在完善中！')
	  },
      showSelf() {
        this.show = true
	  },
      initData() {
        let str = '', name = ''
		this.specificationList.forEach((item, index) => {
		  str = str + item.valueList[this.choicesArr[index]].id
		})
		this.activeId = str[0] + '_' + str[1]
		console.log(this.activeId)
		this.choicesGoods = this.productList.find(item => item.goods_specification_ids === this.activeId)
	  	this.specificationList.forEach((item, index) => {
		  if(index === 0) {
		    let id = +this.activeId[0]
		    let obj = item.valueList.find(item => item.id === id)
			name = obj.value
		  } else {
		    let id = +this.activeId[2]
		    let obj = item.valueList.find(item => item.id === id)
			name = name + '、' + obj.value
		  }
		})
		this.goodName = name
		this.$emit('goodName', this.goodName, this.value)
	  },
	  chooseSize(index, i) {
		this.choicesArr[index] = i
		this.initData()
		if(this.value > this.choicesGoods.goods_number) {
          this.value = this.choicesGoods.goods_number
		}
	  }
	}
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  .choose-goods {
    .base-msg {
      display: flex;
      padding: 15px 10px 5px;
      font-size: 16px;
      img {
        @include wh(100px, 100px);
        display: block;
        margin-right: 4px;
      }
      .message {
        color: gray;
        flex: 1 1;
        div {
          line-height: 22px;
          span {
            color: red;
          }
        }
      }
      .close {
        i {
          color: red;
        }
      }
    }
    .good-size {
      padding: 0 10px 10px;
      .name {
        font-size: 18px;
        margin-bottom: 10px;
      }
      .list {
        font-size: 16px;
        display: flex;
        .sizes {
          margin-right: 4px;
          padding: 5px;
          border: 1PX solid gray;
          color: gray;
        }
		.sizes-active {
		  border: 1PX solid #2196f3;
          color: #2196f3;
		}
      }
    }
    .btn-group {
      @include wh(43px);
      line-height: 43px;
      font-size: 0;
      color: white;
      text-align: center;
      div {
        display: inline-block;
        width: 50%;
        font-size: 16px;
      }
      .add {
        background: linear-gradient(90deg,#ff9500,#ff5e3a);
      }
      .buy {
        background: linear-gradient(90deg,#1d62f0,#19d5fd);
      }
    }
  }
</style>
