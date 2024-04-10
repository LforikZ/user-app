const {
  getCart,
  delGoodsCart
} = require("../../api/index.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData: [],
    selectedIds: [], // 存储选中项的 id
    isAllSelected: false // 是否全选标志
  },

  // 全选
  selectAllHandle() {
    if (this.data.isAllSelected) {
      const cartData = this.data.cartData;
      // 将每个商品的 isCheck 属性设置为 false
      const modifiedCartData = cartData.map(item => {
        return {
          ...item,
          isCheck: false
        };
      });
      this.setData({
        cartData: modifiedCartData,
        selectedIds: [],
        isAllSelected: false
      });
    } else {
      const cartData = this.data.cartData;
      const selectedIds = cartData.map(item => item.cart_id);

      // 将每个商品的 isCheck 属性设置为 true
      const modifiedCartData = cartData.map(item => {
        return {
          ...item,
          isCheck: true
        };
      });
      this.setData({
        cartData: modifiedCartData,
        selectedIds,
        isAllSelected: true
      });
    }
  },
  // 切换选中状态
  toggleSelectHandle(e) {
    const id = e.currentTarget.dataset.id;
    const cartData = this.data.cartData;
    const selectedIds = this.data.selectedIds;
    const index = selectedIds.indexOf(id);

    // 切换选中状态
    if (index === -1) {
      selectedIds.push(id);
    } else {
      selectedIds.splice(index, 1);
    }

    // 更新商品对象的 isCheck 属性
    const modifiedCartData = cartData.map(item => {
      if (item.cart_id === id) {
        item.isCheck = !item.isCheck; // 切换 isCheck 属性的值
        console.log(item)
      }
      return item;
    });

    // 更新页面数据
    this.setData({
      cartData: modifiedCartData,
      selectedIds,
      isAllSelected: selectedIds.length === modifiedCartData.length
    });
    console.log(this.data.cartData)
  },

  // 删除选中项
  // deleteSelectedHandle() {
  //   const selectedIds = this.data.selectedIds;
  //   const cartData = this.data.cartData.filter(item => !selectedIds.includes(item.id));
  //   this.setData({
  //     cartData,
  //     selectedIds: [],
  //     isAllSelected: false
  //   });
  // },
  // 删除单个商品
  delCartHandle(e) {
    const itemId = e.currentTarget.dataset.id;
    console.log(itemId)
    delGoodsCart({
      id: e.currentTarget.dataset.id
    }).then(res => {
      console.log(res.data.F_responseNo)
      if (res.data.F_responseNo === 10000) {
        wx.showToast({
          title: '删除成功',
        })
        // 删除成功后重新加载购物车数据
        this.http(); // 假设这是重新加载购物车数据的函数
      } else {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
  },

  // 增加数量的函数
  increaseQuantity(event) {
    const itemId = event.currentTarget.dataset.id;
    const cartData = this.data.cartData.map(item => {
      if (item.cart_id === itemId) {
        item.good_num++; // 增加当前商品数量
      }
      return item;
    });
    this.setData({
      cartData: cartData
    });
  },

  // 减少数量的函数
  decreaseQuantity(event) {
    const itemId = event.currentTarget.dataset.id;
    const cartData = this.data.cartData.map(item => {
      if (item.cart_id === itemId && item.good_num > 1) {
        item.good_num--; // 减少当前商品数量
      }
      return item;
    });
    this.setData({
      cartData: cartData
    });
  },

  // 提交订单
  onSubmit() {
    console.log(this.data.goodsData)
    const good = this.data.goodsData;
    postDirectBuy({
      open_id: wx.getStorageSync("loginID"),
      good_id: good.good_id,
      price: good.price * good.num,
      tag_id: good.tag_id,
      tag_name: good.tag_name,
      good_num: good.num
    }).then(res => {
      console.log(res)
    })

    wx.showToast({
      title: '购买完成',
      icon: "success"
    })
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
  },


  /**
   * 每次打开页面，都会执行
   */
  onShow() {
    this.http();
  },

  // 请求购物车数据
  http() {
    console.log("获取购物车数据")
    getCart({
      open_id: wx.getStorageSync("loginID")
    }).then(res => {
      // 获取购物车数据
      const temp = res.data.data.F_result;

      // 遍历购物车数据，为每个对象添加 isCheck 属性，默认为 false
      const modifiedCartData = temp.map(item => {
        return {
          ...item,
          isCheck: false
        };
      });
      this.setData({
        cartData: modifiedCartData
      })
      console.log(this.data.cartData)
    })
  }
})