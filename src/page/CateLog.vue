<template>
  <div id="cate-log" class="fullScreen">
    <van-sidebar v-model="activeKey" @change="changeSideTab">
      <van-sidebar-item :title="item.name" v-for="item in categoryList" :key="item.id"/>
    </van-sidebar>
    <div class="cate-content">
      <div class="top-img" :style="{backgroundImage:`url(${currentCategory.wap_banner_url})`}">
        {{currentCategory.front_name}}
      </div>
      <div class="cate-title">
        <span>
          {{currentCategory.name}}分类
        </span>
      </div>
      <div v-for="item in currentCategory.subCategoryList" :key="item.id" class="cate-item" @click="goToNextPage('/cateLog/categorys', item.id)">
        <img :src="item.wap_banner_url" alt="none">
        <div>{{item.name}}</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import * as Https from '../service'
  export default {
    name: 'CateLog',
    data() {
      return {
        activeKey: 0,
        categoryList: [],
        currentCategory: {}
      }
    },
    created() {
      this.getAllData()
    },
    methods: {
      async getAllData() {
        let {categoryList, currentCategory} = await Https.getCatalogInitData()
        this.categoryList = categoryList
        this.currentCategory = currentCategory
      },
      async changeSideTab(index) {
        console.log(index)
        let { id } = this.categoryList[index]
        let {currentCategory} = await Https.getCatalogMsg({id})
        this.currentCategory = currentCategory
      },
      goToNextPage(nextPage, id) {
        this.$router.push({
          path: nextPage,
          query: {
            id
          }
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #cate-log {
    /deep/ .van-sidebar-item--select {
      border-color: $color-text;
      color: $color-text;
    }
    /deep/ .van-sidebar {
      @include wh(667px, 100px);
      position: fixed;
      top: 0;
      left: 0;
      background: #fafafa;
      text-align: center;
    }
    .cate-content {
      padding-bottom: 60px;
      overflow-x: hidden;
      overflow-y: scroll;
      position: fixed;
      top: 0;
      left: 100px;
      right: 0;
      bottom: 0;
      font-size: 0;
      .top-img {
        text-align: center;
        color: white;
        font-size: 16px;
        @include wh(100px);
        line-height: 100px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .cate-title {
        text-align: center;
        color: $color-text;
        padding: 10px;
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
      .cate-item {
        text-align: center;
        padding: 5px;
        display: inline-block;
        width: 50%;
        img {
          @include wh(128px);
        }
        div {
          margin-top: 9px;
          font-size: 14.5px;
        }
      }
    }
  }
</style>

