import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/page/Login.vue')
const Home = () => import('@/page/Home.vue')
const CateLog = () => import('@/page/CateLog.vue')
const Topic = () => import('@/page/Topic.vue')
const Cart = () => import('@/page/Cart.vue')
const Mine = () => import('@/page/Mine.vue')
const Address = () => import('@/page/Address.vue')
const AddAddress = () => import('@/page/AddAddress.vue')
const Categorys = () => import('@/page/Categorys.vue')
const Brand = () => import('@/page/Brand.vue')
const Collect = () => import('@/page/Collect.vue')
const TopicDetail = () => import('@/page/TopicDetail.vue')
const MoreComment = () => import('@/page/MoreComment.vue')
const Goods = () => import('@/page/Goods.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: '/categorys',
        name: 'Categorys',
        component: Categorys,
        children: [{
          path: 'goods',
          name: 'Goods',
          component: Goods,
        }]
      },{
      path: '/brand',
      name: 'Brand',
      component: Brand
    }]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/cateLog',
      name: 'CateLog',
      component: CateLog,
      children: [{
        path: 'categorys',
        name: 'Category',
        component: Categorys
      }]
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic,
      children: [{
        path: 'topicDetail',
        name: 'TopicDetail',
        component: TopicDetail,
        children: [{
          path: 'moreComment',
          name: 'MoreComment',
          component: MoreComment,
        }]
      }]
    },
    {
      path: '/mine',
      name: 'Mine',
      children: [{
        path: 'address',
        component: Address,
        children: [{
          path: 'addAddress',
          component: AddAddress,
        }]
      }, {
        path: 'collect',
        name: 'Collect',
        component: Collect
      }],
      component: Mine
    }
  ]
})
