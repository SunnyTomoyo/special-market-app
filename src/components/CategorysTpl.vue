<template>
  <div class="template">
    <div class="title">
      <div>{{title}}</div>
      <div class="little">{{frontName}}</div>
    </div>
    <small-goods-tpl :goods-list="pageData" v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>

<script>
  import SmallGoodsTpl from './SmallGoodsTpl'
  export default {
    name: 'CategorysTpl',
    props: {
      title: String,
      frontName: String,
      pageData: Array,
    },
    components: {
      SmallGoodsTpl
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .template {
    .title {
      font-size: 16px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      width: 375px;
      height: 64px;
      background: #f5f5f9;
      .little {
        font-size: 13px;
        margin-top: 8px;
        color: #9c9c9c;
      }
    }
  }
</style>
