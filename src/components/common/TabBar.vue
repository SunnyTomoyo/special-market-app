<template>
  <div class="tab-bar">
    <router-link tag="div" exact :to="item.url" class="tab-item" v-for="(item, index) in tabList" :key="index">
      <div class="tab-icon">
        <i :class="item.icon"></i>
      </div>
      <div class="tab-name">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    props: {
      tabList: Array
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .tab-bar {
    background: white;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 52px;
    box-shadow: 0 -3px 10px 0 rgba(0,0,0,.2);
    z-index: 51;
    display: flex;
    .tab-item {
      flex: 1;
      text-align: center;
      .tab-icon {
        i {
          font-size: 22px;
        }
      }
      .tab-name {
        font-size: 13px;
        line-height: 30px;
      }
      &.router-link-active {
        color: #2196f3;
        font-weight: bolder;
        .tab-icon {
          animation: bounceTo 0.5s;
          transition: all 0.5s ease-in-out;
        }
      }
    }
  }
  @keyframes bounceTo {
    from, 20%, 40%, 60%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    to {
        transform: scale(1);
    }
  }
</style>
