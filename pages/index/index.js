const { getBanner,getGoods } = require("../../api/index.js")

Page({
    data: {
        value: "",
        swiperOptions:{
            indicatorDots:true,
            autoplay:true,
            interval:3000,
            duration:1000,
            swiperData:[]
        },
        // 分类命名
        navData:[
            {
                text:"数码",
                icon:"like",
                color:"#ff0000"
            },
            {
                text:"生鲜",
                icon:"star",
                color:"#ff0000"
            },
            {
                text:"会员",
                icon:"fire",
                color:"#ff0000"
            },
            {
                text:"优惠",
                icon:"gift",
                color:"#ff0000"
            },
            {
                text:"充值",
                icon:"phone",
                color:"#ff0000"
            },
            {
                text:"领券",
                icon:"gem",
                color:"#ff0000"
            },
            {
                text:"外卖",
                icon:"gift-card",
                color:"#ff0000"
            },
            {
                text:"美食",
                icon:"smile",
                color:"#ff0000"
            }
        ],
        page:1,
        goodsData:[]
    },
    onLoad() {
        getBanner().then(res =>{
            this.setData({
                indicatorDots:true,
                autoplay:true,
                interval:3000,
                duration:1000,
                swiperData:res.data.data.F_list
            })
            // console.log(res.data.data)
            // console.log(res.data.data.F_list)
        })
        this.http(this.data.page)
    },
    http(page){
        getGoods({ page: page, limit: 10 }).then(res =>{
          if (!res.data.msg) {
            console.log(res.data.data.F_list);
            // 如果 F_list 是非空数组，才进行数据处理
            if (Array.isArray(res.data.data.F_list) && res.data.data.F_list.length > 0) {
                const newData = page === 1 ? res.data.data.F_list : this.data.goodsData.concat(res.data.data.F_list);
                this.setData({
                    goodsData: newData
                });
            }
        }
        else{
                // 给出用户提示
                wx.showToast({
                  title: res.data.msg,
                  icon:"success",
                  duration:2000
                })
            }
        })
    },
    onReachBottom(){
        // 更改页码
        this.setData({
            page:this.data.page += 1
          
        })
        this.http(this.data.page)
    },
    /**
     * 点击搜索框获取焦点
     */
    clickSearch(){
        wx.navigateTo({
          url: '/pages/search/search',
        })
    }
})