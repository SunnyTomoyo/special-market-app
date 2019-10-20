<template>
  <div>
    <div class="comment-template onePx_bottom" v-for="(item, index) in allCommentData" :key="item.id">
      <div class="user-info">
        <div>匿名用户</div>
        <div class="add-time">{{item.add_time}}</div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="pic-list" v-if="item.pic_list.length !== 0">
        <img v-lazy="ele.pic_url" alt="none" v-for="ele in item.pic_list" :key="ele.id">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommentTpl',
    props: {
      allCommentData: Array
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .comment-template {
    width: 100%;
    color: grey;
    padding: 12px;
    .user-info {
      line-height: 30px;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & div:first-child {
        color: black;
      }
    }
    .content {
      margin: 12px 0;
      font-size: 16px;
      line-height: 20px;
    }
    .pic-list {
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
