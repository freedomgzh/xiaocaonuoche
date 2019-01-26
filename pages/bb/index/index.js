// pages/bb/index/index.js
var url = require("../../../config.js");
var util = require("../../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //接口报错
  showError: function () {
    wx.showLoading({
      title: '接口返回错误',
      icon: "none"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      bangding: Number(options.bangding)
    })
    console.log(options)
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code: function (id) {
    var that = this;
    if (that.data.bangding) {
      wx.showModal({
        title: '提示',
        content: '您已绑定过二维码，如需再次绑定请先解绑',
        showCancel: true,//是否显示取消按钮
        cancelText: "暂不",//默认是“取消”
        confirmText: "解绑",//默认是“确定”
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
            return false
          } else {
            //点击确定
            wx.request({
              url: url.jiebang,
              data:{
                user_id:app.globalData.userId
              },
              success:(res)=>{
                wx.showToast({
                  title: '解绑成功，请重新绑定',
                  icon:"none",
                  duration:2000
                })
              }
            })
            that.setData({
              bangding:0
            })
            return false
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { 
        },//接口调用结束的回调函数（调用成功、失败都会执行）

      })
      return
    }
    if (that.checkPhone(that.data.phone)) {
      wx.request({
        url: url.bdshouji,
        data: {
          user_id: app.globalData.userId,
          mobile: that.data.phone,
          qrcodeid: that.data.id
        },
        success: (res) => {
          console.log("erweima", res)
          if (res.data.code == 0) {
            console.log(res.data.data.id)
            wx.showToast({
              title: '绑定成功',
              icon: "none"
            })
            wx.switchTab({
              url: '/pages/tabbar/index/index?id=' + that.data.id,
            })
          } else {
            wx.showToast({
              title: res.data.data.message,
            })
          }
        }
      })
    }
  },
  //检查输入的手机号
  checkPhone: function (param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if (phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
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
  onShareAppMessage: function (res) {
  }
})