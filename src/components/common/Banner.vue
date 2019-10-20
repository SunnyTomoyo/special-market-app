<template>
  <div class="banner">
    <swiper :options="swipeOption" v-if="banner.length!==0 && isKeep">
      <swiper-slide v-for="item in banner" :key="item.id">
        <img :src="item[image_url]" alt="none" :style="swipeImage">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
    data() {
      return {
        swipeImage: {
          width: '100%',
          height: '209px'
        },
        isKeep: true,
        swipeOption: {
          observe: true,
          loop: true,
          autoplay: {
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
          }
        }
      }
    },
    props: {
      banner: Array,
      image_url: String,
      image_height: Number
    },
    created() {
      console.log(document.body.clientWidth)
      let rem = this.image_height/375
      rem = rem.toFixed(2)
      let len = document.body.clientWidth*rem
      this.swipeImage.height = `${len}px`
    },
    activated() {
      this.isKeep = true
    },
    deactivated() {
      this.isKeep = false
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

</style>
