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

  // 判断是否被选中
  isSelected(id) {
    console.log("执行判断是否被选中函数")
    return this.data.selectedIds.includes(id);
  },

  // 全选
  selectAllHandle() {
    if (this.data.isAllSelected) {
      console.log("取消全选");
      this.setData({
        selectedIds: [],
        isAllSelected: false
      });
    } else {
      console.log("全选");
      const cartData = this.data.cartData;
      const selectedIds = cartData.map(item => item.id);
      this.setData({
        selectedIds,
        isAllSelected: true
      });
      console.log(selectedIds); // 检查 selectedIds 数组的内容
    }
  },

  // 切换选中状态
  toggleSelectHandle(e) {
    const id = e.currentTarget.dataset.id;
    const selectedIds = this.data.selectedIds;
    const index = selectedIds.indexOf(id);

    if (index === -1) {
      selectedIds.push(id);
    } else {
      selectedIds.splice(index, 1);
    }

    this.setData({
      selectedIds,
      isAllSelected: selectedIds.length === this.data.cartData.length
    });
  },
  // 删除选中项
  deleteSelectedHandle() {
    const selectedIds = this.data.selectedIds;
    const cartData = this.data.cartData.filter(item => !selectedIds.includes(item.id));
    this.setData({
      cartData,
      selectedIds: [],
      isAllSelected: false
    });
  },
  delCartHandle(e) {
    console.log(e.currentTarget.dataset.id);
    delGoodsCart({
      currentID: e.currentTarget.dataset.id
    }).then(res => {
      if (res.data.status === 200) {
        wx.showToast({
          title: '删除成功',
        })
        this.http()
      } else {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
  },


  /**
   * 每次打开页面，都会执行
   */
  onShow() {
    this.http()
  },


  http() {
    getCart({
      open_id: wx.getStorageSync("loginID")
    }).then(res => {
      console.log(res.data.data.F_result);
      this.setData({
        cartData: res.data.data.F_result
      })
      console.log(this.cartData)
    })
  }
})