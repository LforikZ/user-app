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
  onSubmit() {
    wx.showToast({
      title: '购买完成',
      icon: "success"
    })
  }
})