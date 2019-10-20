<template>
  <div id="addAddress" class="fullScreen">
    <van-nav-bar title="新增地址" :fixed="true"/>
    <van-address-edit
            ref="setAddressDetail"
      :area-list="areaList"
      show-set-default
      @save="uploadMsg"
    />
    <div class="add-btn" @click="back">取消</div>
  </div>
</template>

<script>
  import areaList from '../assets/js/area'
  import goback from '../assets/js/mixins/goback'
  export default {
    name: 'AddAddress',
    data() {
      return {
        areaList: areaList
      }
    },
    mixins: [goback],
    methods: {
      uploadMsg(content) {
        let originStr = localStorage.getItem('ShopUserAddress')
        let arr = JSON.parse(originStr)
        if (content.isDefault === true) {
          arr.forEach(item => {
            item.isDefault = false
          })
        }
        arr.push(content)
        let str = JSON.stringify(arr)
        console.log(str)
        localStorage.setItem('ShopUserAddress', str)
        this.$emit('getAgain')
        this.back()
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #addAddress {
    position: absolute;
    z-index: 53;
    padding-top: 46px;
    /deep/ .van-button {
      background: $color-text;
      border: 1PX solid $color-text;
    }
    .add-btn {
      @include wh(44px,343px);
      background: $color-text;
      text-align: center;
      line-height: 44px;
      margin: 0 auto 38px;
      color: white;
      font-size: 14px;
      &:active {
        background: #2078CB;
      }
    }
  }
</style>
