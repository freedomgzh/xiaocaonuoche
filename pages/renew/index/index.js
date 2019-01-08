// pages/renew/index/index.js
var url = require("../../../config.js")
var wxPay = require("../../../utils/pay.js")
var app  = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//年费获取
getNf:function(){
  wx.request({
    url: url.nianfei,
    success:(res)=>{
      console.log(res)
      this.setData({
        nianfei:res.data.data
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNf()
  },
  payNow:function(){
    wxPay.wxpay1(app, app.globalData.userId,this.data.nianfei, "/pages/tabbar/index/index")
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