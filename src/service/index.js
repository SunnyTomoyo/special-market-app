import HttpUtils from "./network"

export const postLogin = parmas => HttpUtils.post('/auth/loginByMobile', parmas)
//获取首页数据
export const getHomeData = parmas => HttpUtils.post('/', parmas)

/*
   * 根据制造商ID获取制造商详情
   * parmas:
   *   id: 制造商Id
   * */
export const getBrandDetail = parmas => HttpUtils.get('/brand/detail', parmas)

  /*
   * 根据制造商ID获取制造商相关商品（同根据分类ID获取商品）
   * parmas:
   *   brandId: 制造商Id
   *   page: 当前页数
   *   size: 每页数据量
   * */
export const getBrandGoods = parmas => HttpUtils.get('/brand/detail', parmas)
/*
   *  获取专题数据
   *  parmas:
   *   page: 当前页数
   *   size: 每页数据量
   * */
export const getTopicData = parmas => HttpUtils.get('/topic/list', parmas)


  /*
   * 分类页初始化信息获取
   * */
export const getCatalogInitData = parmas => HttpUtils.get('/catalog/index', parmas)
// 传id
export const getCatalogMsg = parmas => HttpUtils.get('/catalog/current', parmas)
/*
   * 获取分类ID分类Nav数据
   * params:
   *   id: 当前分类Id
   * */
export const getCategoryNavData = parmas => HttpUtils.get('/goods/category', parmas)

/*
   *  根据分类Id或者制造商Id获取商品
   *  parmas:
   *   brandId: 制造商Id（非必填）
   *   categoryId: 分类Id（非必填）
   *   sort: id(默认排序)、price(价格排序)
   *   order: 排序方式
   *   page: 当前页数
   *   size: 每页数据量
   * */
export const getGoodsData = parmas => HttpUtils.get('/goods/list', parmas)

 /*
   * 获取商品详情
   * /api/goods/detail
   * parmas:
   *   id: 商品id
   * */
export const getGoodsDetail = (parmas = {}) => HttpUtils.get('/goods/detail', parmas)

  /*
   * 相关商品
   * /api/goods/related
   * parmas:
   *   id: 商品id
   * */
export const getGoodsRelated = (parmas = {}) => HttpUtils.get('/goods/related', parmas)

 /*
   * 是否添加到收藏栏
   * /api/collect/addordelete
   * parmas:
   *   typeId: 0：是 、1:否（商品状态）
   *   valueId: 商品Id
   * */
export const postDoLikes = parmas => HttpUtils.post('/collect/addordelete', parmas)

export const getLikes = parmas => HttpUtils.get('/collect/list', parmas)

export const getCartNum = (parmas = {}) => HttpUtils.get('/cart/goodscount', parmas)
/*
   * 根据专题ID或者商品ID获取评论获取相关专题
   * parmas:
   *   valueId: 专题id、商品id
   *  typeId：1:专题id、0:商品id
   *  page:
   *  size:
   * */
export const getCommentList = parmas => HttpUtils.get('/comment/list', parmas)

export const getTopicDetailRelated = parmas => HttpUtils.get('/topic/related', parmas)

export const getTopicDetail = parmas => HttpUtils.get('/topic/detail', parmas)
  /*
   * 获取用户地址数据
   * /api/address/list
   * */
export const getAddressList = (parmas = {}) => HttpUtils.get('/address/list', parmas)

  /*
   * 新增地址
   * /api/address/save
   * parmas:
   * id: 地址ID
   * */
export const postAddAddress = (parmas = {}) => HttpUtils.post('/address/save', parmas)

  /*
   * 添加到购物车
   * /api/cart/add
   * parmas:
   *   goodsId: 商品Id
   *   number: 数量
   *   productId: 产品价格ID
   * */
export const postAddCart = parmas => HttpUtils.post('/cart/add', parmas)
/*
   * 获取用户购物车数据
   * /api/cart/index
   * parmas:
   * */
export const getCartData = (parmas = {}) => HttpUtils.get('/cart/index', parmas)

  /*
   * 购物车商品是否选中
   * /api/cart/checked
   * parmas:
   *   isChecked: 是否选中(1:是，0否)
   *   productIds： 商品产品Id
   * */
export const postCartCheck = (parmas = {}) => HttpUtils.post('/cart/checked', parmas)
/*
   * 删除购物车商品
   * /api/cart/delete
   * parmas:
   *   productIds： 商品产品Id
   * */
export const postCartDelete = (parmas = {}) => HttpUtils.post('/cart/delete', parmas)
export const postCartUpdate = (parmas = {}) => HttpUtils.post('/cart/update', parmas)
