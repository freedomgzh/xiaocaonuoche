// pages/change/index/index.js
var url =require("../../../config.js")
var util = require("../../../utils/util.js")
let app = getApp()
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
    console.log(options)
    this.setData({
      phone: options.chepai,
      id: options.id,
      mobile: options.mobile
    })
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
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  isVehicleNumber: function (vehicleNumber) {
    var result = false;
    result = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(vehicleNumber);

      console.log(vehicleNumber)

      console.log(result)

  },
  xiugai:function(){
    var that = this
    var phone = this.data.phone;
    // if (that.checkPhone(phone)){
    wx.request({
      url: url.xgchepai,
      data:{
        user_id:app.globalData.userId,
        chepaihao:that.data.phone,
        qrcode_id:that.data.id
      },
      success:(res)=>{
        console.log(res)
        wx.showToast({
          title: '修改成功',
        })
        wx.switchTab({
          url: '/pages/tabbar/index/index',
        })
      }
    })
    // }

  },
  wurao:function(){
wx.navigateTo({
  url: '/pages/quite/index/index',
})
  },
  xufei: function () {
    wx.navigateTo({
      url: '/pages/renew/index/index',
    })
  },
  shenqing: function () {
    wx.navigateTo({
      url: '/pages/index/apply/index',
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