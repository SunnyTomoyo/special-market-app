<template>
  <div id="login">
    <div class="logo">
      <img src="http://yanxuan.nosdn.127.net/bd139d2c42205f749cd4ab78fa3d6c60.png" alt="none"/>
    </div>
    <div class="login-main">
      <div class="input-wrap onePx_bottom">
        <input v-model="mobile" type="text" placeholder="请输入手机号码" />
      </div>
      <div class="input-wrap onePx_bottom">
        <input v-model="password" type="password" placeholder="请输入登录密码" />
      </div>
      <div class="login-btn">
        <van-button @click="login" type="primary" size="large" color="linear-gradient(to right, #4bb0ff, #6149f6)">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Https from '../service'
  export default {
    name: 'Login',
    data() {
      return {
        mobile: '15323807318',
        password: '123456'
      }
    },
    methods: {
      async login() {
        let mobile = this.mobile
        let password = this.password
        let {errno, errmsg, data} = await Https.postLogin({mobile, password})
        if (errno === 1000) {
          this.$toast.fail(errmsg)
        } else {
          localStorage.setItem('ShopToken', data.sessionKey)
          localStorage.setItem('ShopUser', data.mobile)
          this.$emit('showTab')
          this.$router.push({
            path: '/'
          })
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #login {
    @include wh(100%);
    padding-top: 20px;
    .logo {
      @include wh(70px, 50%);
      margin: 0 auto 50px;
      img {
        @include imgBase();
      }
    }
    .login-main{
      padding: 30px 20px 0 20px;
      .input-wrap{
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
          display: block;
          height: 80%;
          border: none;
          width: 100%;
          font-size: 16px;
        }
      }
      .login-btn{
        margin-top: 40px;
      }
    }
  }
</style>
