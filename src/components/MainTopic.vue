<template>
  <div class="home-topic">
    <div class="topic-item" v-for="item in channel" :key="item.id" @click="toCategorys(item.id)">
      <img :src="item.icon_url" alt="none" />
      <div class="text">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainTopic',
    props: {
      channel: Array
    },
    methods: {
      toCategorys(id) {
        this.$router.push({
          path: '/categorys',
          query: {id}
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .home-topic {
    border-bottom: 8px solid whitesmoke;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    .topic-item {
      flex: 1;
      text-align: center;
      width: 19%;
      img {
        width: 26px;
        height: 26px;
      }
      .text {
        margin-top: 5px;
      }
    }
  }
</style>
