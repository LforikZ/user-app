import {
  getCategoryList,
  getCategoryGoods,
  getSearch,
  getExpirationGoods
} from "../../api/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    categoryData: [],
    sliderData: [],
    currentTag: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
      // 获取分类列表
    getCategoryList().then(res => {
      this.setData({
        sliderData: res.data.data.result
      })
    })
    this.http(this.data.currentTag);

  },
  clickItemNav(e) {
    this.http(e.currentTarget.dataset.title)
  },


  http(id) {
    console.log(id)
    getExpirationGoods({
      tag_id:id,
      flag:0,
    }).then(res => {
      console.log(id)
      console.log(res)
      if (res.data.status_code === 200 && res.data.code === 10000) {
        this.setData({
          categoryData: res.data.data.result
        })
        console.log(this.data.categoryData)
      } else {
        wx.showToast({
          title: '暂无数据',
          icon: "success"
        })
      }
    })
  },
  clickItem(e) {
    getSearch({
      search: e.currentTarget.dataset.tag
    }).then(res => {
      if (!res.data.msg) {
        // 序列化
        let goods = JSON.stringify(res.data.data)
        wx.navigateTo({
          url: '/pages/goods/goods?goodsData=' + goods,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },

})