<template>
  <div id="topic-detail" class="fullScreen">
    <van-nav-bar :z-index="2" :title="topicDetail.title" left-arrow @click-left="back" :fixed="true"/>
    <div v-html="topicDetail.content" class="detail-img thickBottom"></div>
    <div class="comment">
      <div class="title onePx_bottom">
        <div>精选留言</div>
        <div><i class="iconfont icon-pencil" aria-hidden="true"></i></div>
      </div>
      <comment-tpl :all-comment-data="commentList"/>
      <div class="more" @click="goToMoreComment">查看更多评论</div>
    </div>
    <div class="recommend">
      <div class="title">推荐专题</div>
      <div v-for="item in recommendList" :key="item.id" class="item">
        <img :src="item.scene_pic_url" alt="none">
        <div>{{item.title}}</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import CommentTpl from '../components/common/CommentTpl'
  import goback from '../assets/js/mixins/goback'
  import * as Https from '../service'
  export default {
    name: 'TopicDetail',
    mixins: [goback],
    data() {
      return {
        topicDetail: {},
        commentList: [],
        recommendList: []
      }
    },
    created() {
      this.getAllData()
    },

    methods: {
      async getAllData() {
        let id = this.$route.query.id
        this.topicDetail = await Https.getTopicDetail({id})
        let {data} = await Https.getCommentList({valueId: id, typeId: 1, size: 5, page: 1})
        this.recommendList = await Https.getTopicDetailRelated({id})
        this.commentList = data
      },
      goToMoreComment() {
        let valueId = this.$route.query.id
        this.$router.push({
          path: '/topic/topicDetail/moreComment',
          query: {
            valueId,
            typeId: 1,
            page: 1,
            size: 100
          }
        })
      }
    },
    components: {
      CommentTpl
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../assets/css/mixin";

  #topic-detail {
    position: fixed;
    z-index: 52;
    padding-top: 46px;
    .detail-img {
      /deep/ img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .comment {
      .title {
        display: flex;
        @include wh(48px);
        padding: 0 12px;
        font-size: 16px;
        align-items: center;
        div:first-child {
          flex: 1 1;
        }
        div:last-child {
          i {
            text-align: right;
            font-size: 22px;
          }
        }
      }
      .more {
        @include wh(44px);
        line-height: 44px;
        text-align: center;
        font-size: 16px;
      }
    }
    .recommend {
      background: #f5f5f9;
      padding: 12px;
      .title {
        @include wh(34px);
        line-height: 34px;
        text-align: center;
      }
      .item {
        @include wh(222px);
        padding: 10px;
        background: white;
        img {
          @include wh(171px);
        }
        div {
          font-size: 16px;
          line-height: 36px;
          color: gray;
        }
      }
    }
  }
</style>
