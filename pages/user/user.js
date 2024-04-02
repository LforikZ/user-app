const {
  getLogin
} = require("../../api/index.js")

Page({
  data: {
    userInfo: {},
  },
  onLoad(options) {
    // 验证用户登录信息的状态是否处于有效期：增加一个接口，然后测试有效期
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: "展示用户信息",
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
        this.loginHandle()
        console.log(res.userInfo)
        wx.setStorageSync('userInfo', res.userInfo)
      },
      fail(err) {
        console.log(err);
      },
      complete() {
        console.log("获取完成");
      }
    })
  },
  loginHandle() {
    wx.login({
      success(response) {
        console.log(response)
        getLogin({
          code: response.code
        }).then(res => {
          console.log(res.data.data.result)
          wx.setStorageSync('loginID', res.data.data.result)
          console.log(wx.getStorageSync("loginID"))
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})