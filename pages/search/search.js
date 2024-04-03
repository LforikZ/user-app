const {
  getHotSearch,
  getSearch,
  addSearchContest
} = require("../../api/index.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    hotSearch: [],
    value: "",
    goodsData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(wx.getStorageSync("loginID"))
    getHotSearch({
      user_id: wx.getStorageSync("loginID")
    }).then(res => {
      console.log(res.data.data)
      this.setData({
        hotSearch: res.data.data.result
      })
    })
  },
  // 内容改变
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },

  /**
   *  展示搜索数据，在goods页面展示
   *      1. 在搜索页面通过网络请求获取数据，传递到goods页面显示
   *      2. 在搜索页面将搜索的关键字传递到goods页面，在goods页面做网络请求
   */

  // 实现搜索
  onSearch() {
    this.http(this.data.value)
  },
  onSearchCliclk() {
    this.http(this.data.value)
  },
  /**
   * 获取热门关键字
   */
  clickGetKeyWords(e) {
    this.http(e.currentTarget.dataset.hotkey)
  },
  http(search) {
    // 获取用户ID
    const userID = wx.getStorageSync("loginID");
    // 获取搜索内容
    const searchContent = this.data.value;
    // 发起请求到后端接口，传递用户ID和搜索内容作为参数
    if (searchContent != "") {
      addSearchContest({
        user_id: userID,
        content: searchContent
      }).then(res => {
        console.log(searchContent)
        if (res.data.status_code === 200 && res.data.code === 10000) {
          console.log(res.data.data)
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      })
    }
   
    wx.navigateTo({
      url: '/pages/goods/goods?search=' + search,
    })
  }
})