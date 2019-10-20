<template>
  <div id="more-comment" class="fullScreen">
    <van-nav-bar :z-index="2" title="查看更多评论" left-arrow @click-left="back" :fixed="true"/>
    <comment-tpl :all-comment-data="allComment"/>
  </div>
</template>

<script>
  import CommentTpl from '../components/common/CommentTpl'
  import goback from '../assets/js/mixins/goback'
  import * as Https from '../service'
  export default {
    name: 'MoreComment',
    mixins: [goback],
    data() {
      return {
        allComment: []
      }
    },
    created() {
      this.getAllData()
    },
    methods: {
      async getAllData() {
        let obj = this.$route.query
        let {data} = await Https.getCommentList(obj)
        this.allComment = data
      }
    },
    components: {
      CommentTpl
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  #more-comment {
    position: fixed;
    z-index: 54;
    padding-top: 46px;
  }
</style>
