const {
  getLogin
} = require("../../api/index.js")

Page({
  data: {
    userInfo: {},
    isMerchant: false // 默认不是商家
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
      success: (response) => { // 使用箭头函数
        console.log(response)
        getLogin({
          code: response.code
        }).then(res => {
          console.log(res.data.data.result)
          wx.setStorageSync('loginID', res.data.data.result)
          console.log(wx.getStorageSync("loginID"))
          // 检查 loginID 是否为商家标识
          if (wx.getStorageSync("loginID") === 'oSLGA6p9a_8EonTJCfYvwz1GatPw') {
            this.setData({
              isMerchant: true
            });
            wx.setStorageSync('isMerchant', this.isMerchant)
          }
        })
        console.log("登录成功")
      },
      fail: (err) => { // 使用箭头函数
        console.log(err);
      }
    })
  },
  // 查看临期商品
  viewExpiringProducts() {
    wx.navigateTo({
      url: '/pages/expiring-products/expiring-products'
    });
  },
   // 查看过期商品
   viewExpiredProducts() {
    wx.navigateTo({
      url: '/pages/expired-products/expried-products'
    });
  },

  logout() {
    // 清除本地存储的登录信息
    wx.removeStorageSync('loginID');
    wx.removeStorageSync('isMerchant');
    console.log("退出登录")
    // 可选：向服务器发送请求通知退出登录（如果需要）
    /*
    wx.request({
      url: 'https://your-api.com/logout', // 替换为你的后端退出登录接口地址
      method: 'POST', // 或者其他请求方法，根据你的后端接口要求来定
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'), // 将用户认证信息传递给后端
      },
      success: function(res) {
        console.log('Logout success:', res);
      },
      fail: function(error) {
        console.error('Logout failed:', error);
      }
    });
    */
    // 清除本地存储的登录信息后，更新页面数据以显示登录按钮
    this.setData({
      userInfo: {
        nickName: '',
      },
      isMerchant: false // 将 isMerchant 设置为 false
    });
    console.log(this.isMerchant)
  }
})