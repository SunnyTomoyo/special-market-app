<template>
  <div id="topic" class="fullScreen">
    <div v-for="item in topicData" :key="item.id" class="topic-item thickBottom" @click="goToNewPage(item.id)">
      <img v-lazy="item.scene_pic_url" alt="none" />
      <div class="item-title">{{item.title}}</div>
      <div class="item-subtitle">{{item.subtitle}}</div>
      <div class="item-price">{{item.price_info}}元起</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import * as Https from '../service'
  export default {
    name: 'Topic',
    data() {
      return {
        topicData: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        let {data} = await Https.getTopicData({ page: 1, size: 12 })
        this.topicData = data
        // this.$toast.clear()
        // this.showHome = true
      },
      goToNewPage(id) {
        this.$router.push({
          path: '/topic/topicDetail',
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

  #topic {
    .topic-item {
      width: 100%;
      text-align: center;
      img {
        @include wh(171px);
      }
      .item-title {
        font-size: 16px;
        margin-top: 13px;
      }
      .item-subtitle {
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 13px 10px;
        font-size: 14px;
        color: #9c9c9c;
      }
      .item-price {
        margin-bottom: 13px;
        font-size: 16px;
        color: red;
      }
    }
  }
</style>
