// pages/carNumber/index/index.js
var url = require("../../../config.js");
var wxpay = require('../../../utils/pay.js');

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
  },
  // getPrice: function () {
  //   wx.request({
  //     url: url.jiage,
  //     success: (res) => {
  //       console.log(res)
  //       if (res.data.code == 0) {
  //         this.setData({
  //           price: res.data.data
  //         })
  //       } else {
  //         wx.showToast({
  //           title: '接口错误',
  //           icon: "none"
  //         })
  //       }

  //     }
  //   })
  // },


  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //buy
  toBuy: function () {
    //组建信息
  
    var phone = this.data.phone;
  

    if (!phone) {
      wx.showToast({
        title: '请输入车牌号',
        icon: "none"
      })
      return
    }


    var that = this
    wx.showLoading({
      title: '正在生成订单',
    })
    that.create(that)

    // wx.request({
    //   url: url.getQRCode,
    //   data:{
    //     user_id:app.globalData.userId,
    //     path:"pages/index/call",
    //     mobile:phone
    //   },
    //   success:(res)=>{
    //     console.log("erweima",res)
    //     if(res.data.code==0){
    //       console.log(res.data.data.id)
    //       that.create(price, name, phone, address, res.data.data.id,that)
    //     }else{
    //       that.showError()
    //     }
    //   }
    // })


  },
  showError: function () {
    wx.showToast({
      title: '接口错误',
      icon: "none"
    })
  },
  //提交订单
  create: function (that) {
  //   wx.request({
  //     url: url.xdmdr,
  //     data: {
  //       user_id: app.globalData.userId,
  //       duanxinfei:that.data.price,
  //       chepaihao: that.data.phone,

  //     },
  //     success: function (res) {
  //       console.log("下单", res)
  //       wx.hideLoading()
  //       if (res.data.code == 0) {
          wxpay.wxpay2(app, app.globalData.userId, that.data.price, that.data.phone,"/pages/quite/index/index");
         
    //       wx.navigateTo({
    //         url: '/pages/tabbar/order/index',
    //       })
    //     } else {
    //       that.showError();
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      price: options.money
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})