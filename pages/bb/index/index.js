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
        id:options.id
      })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code: function (id) {
    var that = this;

    if (that.checkPhone(that.data.phone)) {
      wx.request({
        url: url.bdshouji,
        data: {
          user_id: app.globalData.userId,
          mobile: that.data.phone,
          qrcodeid:that.data.id
        },
        success: (res) => {
          console.log("erweima", res)
          if (res.data.code == 0) {
            console.log(res.data.data.id)
            // wx.navigateTo({
            //   url: '/pages/poster/index/index?url=' + res.data.data.url + "&id=" + res.data.data.id,
            // })
          } else {
            that.showError()
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