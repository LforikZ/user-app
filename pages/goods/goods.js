const {
  getSearch
} = require("../../api/index.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.search)
    getSearch({
      search: options.search
    }).then(res => {
      if (res.data.status_code === 200 && res.data.code === 10000) {
        console.log(res.data.data)
        this.setData({
          goodsData: res.data.data.F_list
        })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  }
})