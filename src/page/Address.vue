<template>
  <div id="address" class="fullScreen">
    <van-nav-bar title="地址管理" left-arrow @click-left="back" :fixed="true"/>
    <div class="address-list">
      <div :class="['item', 'onePx_bottom']" v-for="(item, index) in allAddress" :key="index">
        <div :class="['name', activeNum === index ? 'active' : '']">{{item.name}}</div>
        <div class="tel">
          {{item.tel}}
          <div class="detail">{{item.province}}{{item.city}}{{item.county}}{{item.addressDetail}}</div>
        </div>
        <div class="del-icon" @click="deleteAddress(index)">
          <img :src="icon" alt="delAddress" />
        </div>
      </div>
    </div>
    <div class="bottom" @click="addAddress">新建地址</div>
    <router-view @getAgain="getAllData"/>
  </div>
</template>

<script>
  import goback from '../assets/js/mixins/goback'
  export default {
    name: 'Address',
    mixins: [goback],
    data() {
      return {
        allAddress: [],
        activeNum: -1,
        icon: require('@/assets/img/del-address.png'),
      }
    },
    created() {
      this.getAllData()
    },
    methods: {
      deleteAddress(index) {
        this.$dialog.confirm({
          title: '删除',
          message: '您确定删除该地址吗？'
        }).then(() => {
          let data = localStorage.getItem('ShopUserAddress')
          let arr = JSON.parse(data)
          if(this.activeNum === index) {
            this.activeNum = -1
          }
          arr.splice(index, 1)
          let str = JSON.stringify(arr)
          localStorage.setItem('ShopUserAddress', str)
          this.allAddress = arr
        })
      },
      addAddress() {
        this.$router.push({
          path: '/mine/address/addAddress'
        })
      },
      getAllData() {
        if(localStorage.getItem('ShopUserAddress') === null) {
          localStorage.setItem('ShopUserAddress', '[]')
        } else {
          let data = localStorage.getItem('ShopUserAddress')
          console.log(JSON.parse(data))
          this.allAddress = JSON.parse(data)
          this.allAddress.forEach((item, index) => {
            if (item.isDefault === true) {
              this.activeNum = index
            }
          })
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #address {
    position: fixed;
    z-index: 52;
    padding-top: 46px;
    .address-list {
      padding-top: 5px;
      overflow: hidden;
      background: url('../assets/img/line.png') repeat-x;
      background-size: auto 5px;
      .item {
        padding: 4PX 0;
        @include wh(88px);
        display: table;
        div {
          display: table-cell;
        }
        .name {
          width: 60px;
          vertical-align: top;
          padding-top: 8px;
          padding-left: 4px;
          font-size: 16px;
        }
        .tel {
          width: 270px;
          color: orange;
          vertical-align: top;
          padding-top: 8px;
          padding-left: 20px;
          font-size: 14px;
          .detail {
            color: black;
            font-size: 13px;
          }
        }
        .del-icon {
          width: 40px;
          vertical-align: middle;
          img {
            height: 30px;
            width: 30px;
          }
        }
        .active {
          border-left: 5PX solid $color-text;
        }
      }

    }
    .bottom {
      @include wh(60px);
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      color: white;
      background: $color-text;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>
