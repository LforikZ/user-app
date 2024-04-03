/**
 * 存储接口地址
 */
module.exports = {
  // baseUrl:"http://iwenwiki.com:3001",   
  baseUrl: "http://127.0.0.1:8019", // 公共地址
  banner: "/api/banner", // 轮播图
  goods: "/api/goods", // 商品列表
  hotSearch: "/api/keywords", // 热门搜索
  searchContest: "/api/keywords/add", // 记录搜索内容
  search: "/api/goods/search", // 搜索
  goodsDetails: "/api/goods/details", // 商品详情
  cart: "/api/cart/get", // 购物车查询
  addCart: "/api/cart/add", // 添加购物车
  delCart: "/api/cart/del", // 删除购物车
  categoryList: "/api/category/list", // 获取分类列表
  categoryGoods: "/api/category/goods", // 获取分类下的所有商品
  buy: "/api/buy", // 购买
  login: "/api/login", // 登录
}