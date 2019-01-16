// pages/paynow.js
var app = getApp();
var pay = require('../../../utils/pay.js');
var url = require("../../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:options.url,
      id:options.id
    })
// this.getCode();
  },

  confirm: function (e) {
    var that = this;
    var order_id = this.data.order_id; 
    console.log(order_id)
    wx.request({
      url: url.host + 'paysuccess',
      data: { order_id: order_id },
      success: (res2) => {
        console.log("1111",res2)
        that.data.isclicksure = true;
        if(res2.data.code==0){
          wx.switchTab({
            url: '/pages/tabbar/order/index'
          })
        }
     
        console.log("调用微信支付后", res2);
      }
    })
  },
  toApply:function(){
    wx.navigateTo({
      url: '/pages/index/apply/index',
    })
  },
  toDelete:function(){
    wx.request({
      url: url.delqrcode,
      data:{
        id:this.data.id
      },
      success:(res)=>{
        console.log("res",res)
        if(res.data.code==0){
          wx.showLoading({
            title: '删除成功',
          })
          wx.switchTab({
            url: '/pages/tabbar/index/index',
            success:()=>{
              wx.hideLoading()
            }
          })
        }
      }
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
  comeback:function(){

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