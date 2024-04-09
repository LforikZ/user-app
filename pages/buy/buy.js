const {
  getBuy,
  getGoodsDetails
} = require("../../api/index.js")

Page({
  data: {
    goodsData: {}
  },
  onLoad(options) {
    console.log(options.id)
    getGoodsDetails({
      id: options.id
    }).then(res => {
      console.log(res.data.data);
      const result = res.data.data.result;
      result.num = 1; // 如果num字段不存在，则设置默认值为1
      this.setData({
        goodsData: result
      })
      console.log(this.data.goodsData)
    })
  },
  // 增加数量的函数
  increaseQuantity() {
    const { goodsData } = this.data;
    goodsData.num++; // 增加数量
    this.setData({
      goodsData: goodsData
    });
  },
  // 减少数量的函数
  decreaseQuantity() {
    const { goodsData } = this.data;
    if (goodsData.num > 1) { // 确保数量不小于1
      goodsData.num--; // 减少数量
      this.setData({
        goodsData: goodsData
      });
    }
  },
  onSubmit() {
    wx.showToast({
      title: '购买完成',
      icon: "success"
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})
