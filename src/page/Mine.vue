<template>
  <div id="mine" class="fullScreen">
	<div class="user-msg">
	  <div class="logo"></div>
	  <div class="text">
		<div>{{userPhone}}</div>
		<div>普通用户</div>
	  </div>
	</div>
	<div class="main-content thickBottom">
	  <template v-for="(item, index) in userPower" >
		<div :class="['item', index < 2 ? 'active' : '']" @click="goToChoices(item.link)">
		  <i class="iconfont" :class="item.icon"></i>
		  <div class="text">
			{{item.name}}
		  </div>
		</div>
		<br v-if="index%3 === 2" />
	  </template>
	</div>
	<div class="login-out thickBottom">
	  退出登录
	</div>
	<router-view />
  </div>
</template>

<script>
  export default {
    name: 'Mine',
	data() {
      return {
        userPhone: '',
		userPower: [
      {
        icon: 'icon-shoucang',
        name: '我的收藏',
        link: '/collect'
      },
      {
        icon: 'icon-iconfontdizhi',
        name: '地址管理',
        link: '/address'
      },
      {
        icon: 'icon-order',
        name: '我的订单'
      },
      {
        icon: 'icon-rili',
        name: '周末拼单'
      },
      {
        icon: 'icon-youhuiquan',
        name: '优惠券'
      },
      {
        icon: 'icon-youxuan',
        name: '优选购'
      },
      {
        icon: 'icon-hongbao',
        name: '我的红包'
      },
      {
        icon: 'icon-huiyuan',
        name: '会员plus'
      },
      {
        icon: 'icon-yaoqing',
        name: '邀请返利'
      },
      {
        icon: 'icon-yijianfankui',
        name: '意见反馈'
      },
      {
        icon: 'icon-kefu',
        name: '客服咨询'
      },
      {
        icon: 'icon-baohu',
        name: '账户安全'
      }
    ]
	  }
	},
	created() {
      this.userPhone = localStorage.getItem('ShopUser')
	},
	methods: {
      goToChoices(address) {
        let link = '/mine' + address
        this.$router.push({
		  path: link
		})
	  }
	}
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #mine {
	padding-bottom: 60px;
	.user-msg {
	  @include wh(166px);
	  padding: 39px 22.5px;
	  display: flex;
	  background: url("http://yanxuan.nosdn.127.net/d069279e5834bbca17065a9855a014bf.png") no-repeat;
	  background-size: 100%;

	  .logo {
		@include wh(100%, 88px);
		background: url("http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png") no-repeat;
		background-size: 100%;
		border-radius: 50%;
		margin-right: 15px;
	  }
	  .text {
		flex: 1 1;
		color: white;
		font-size: 16px;
		div {
		  display: flex;
		  height: 50%;
		  align-items: center;
		}
	  }
	}
	.main-content {
	  width: 100%;
	  font-size: 0;
	  .active {
		color: rgb(33, 150, 243);
	  }
	  .item {
		display: table-cell;
		@include wh(117px, 125px);
		text-align: center;
		vertical-align: middle;
		border: .5PX solid #dcdcdc;
		i {
		  font-size: 26px;
		}

		.text {
		  font-size: 16px;
		  margin-top: 10px;
		}
	  }
	}
	.login-out {
	  @include wh(51px);
	  line-height: 43px;
	  font-size: 14px;
	  text-align: center;
	}
  }
</style>
