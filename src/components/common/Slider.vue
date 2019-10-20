<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import {addClass} from '@/assets/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'Slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: false
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this._setSliderWidth()
      setTimeout(() => {
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 当浏览器尺寸发生变化的时候，重新计算它的宽度
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    destroyed() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        // 这里给组件创建了一个children
        this.children = this.$refs.sliderGroup.children

        let width = 0 // 总宽度
        let sliderWidth = this.$refs.slider.clientWidth
        // 设置总宽度和单个图片的宽度
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // 前后多加两张图
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          console.log(pageIndex)
          this.currentPageIndex = pageIndex
          console.log(this.autoPlay)
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _initDots() {
        console.log(this.children.length)
        this.dots = new Array(this.children.length)
      },
      _play() {

        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .slider {
    width: 318.75px;
    min-height: 1px;
    position: relative;
    transform: translate3d(28.125px, 0px, 0px);
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
    }
      /*.slider-item*/
      /*  float: left;*/
      /*  box-sizing: border-box;*/
      /*  overflow: hidden;*/
      /*  text-align: center;*/
      /*  a*/
      /*    display: block;*/
      /*    width: 100%;*/
      /*    overflow: hidden;*/
      /*    text-decoration: none;*/
      /*  img*/
      /*    display: block;*/
      /*    width: 100%;*/
  }
</style>




