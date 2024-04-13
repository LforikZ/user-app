const { request } = require("../utils/request.js")
const { login,baseUrl,banner,goods,hotSearch,search,goodsDetails,cart,addCart,delCart,categoryGoods,buy,directBuy, categoryList,searchContest,expirationGoods,adjust } = require("./base")
/**
 * 网络请求方法
 */

/**
 * get banner data
 */
function getBanner(data){
    return request(baseUrl + banner,"GET",data)
}

/**
 * get goods list data
 */

function getGoods(data){
    return request(baseUrl + goods,"GET",data)
}

/**
 * hot search keywords
 */
function getHotSearch(data){
    return request(baseUrl + hotSearch,"GET",data)
}

/**
 * search 
 */
function getSearch(data){
    return request(baseUrl + search,"GET",data)
}

/**
 * goods details
 */
function getGoodsDetails(data){
    return request(baseUrl + goodsDetails,"GET",data) 
}

/**
 * cart select
 */
function getCart(data){
    return request(baseUrl + cart,"GET",data) 
}

/**
 * cart add
 */
function addGoodsCart(data){
    return request(baseUrl + addCart,"PUT",data) 
}

/**
 * cart del
 */
function delGoodsCart(data){
    return request(baseUrl + delCart,"PUT",data) 
}

/**
 * categoryList 获取分类列表
 */
function getCategoryList(data){
    return request(baseUrl + categoryList,"GET",data) 
}

/**
 * categoryGoods 获取类下的所有商品
 */
function getCategoryGoods(data){
  return request(baseUrl + categoryGoods,"GET",data) 
}

/**
 * buy 购物车购买
 */
function postBuy(data){
    return request(baseUrl + buy,"POST",data) 
}
/**
 * direct 直接购买结算
 */
function postDirectBuy(data){
  return request(baseUrl + directBuy,"POST",data) 
}


function getLogin(data){
    return request(baseUrl + login,"POST",data) 
}

/**
 * 存储搜索记录
 */
function addSearchContest(data){
  return request(baseUrl + searchContest,"POST",data) 
}

/**
 * 获取临期食品列表
 */
function getExpirationGoods(data){
  return request(baseUrl + expirationGoods,"GET",data) 
}

/**
 * 批量上架或者下架，临期或过期食品
 */
function adjustmentExpirationFood(data){
  return request(baseUrl + adjust,"PUT",data) 
}


module.exports = {
    getBanner,
    getGoods,
    getHotSearch,
    getSearch,
    getGoodsDetails,
    getCart,
    addGoodsCart,
    delGoodsCart,
    getCategoryList,
    getCategoryGoods,
    postBuy,
    postDirectBuy,
    getLogin,
    addSearchContest,
    getExpirationGoods,
    adjustmentExpirationFood,
}