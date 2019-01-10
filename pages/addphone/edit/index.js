// pages/addphone/edit/index.js
var util = require("../../../utils/util.js")
var url = require("../../../config.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toAdd: function () {

    var that = this
    if (!that.data.mobile) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    if (this.checkPhone(that.data.mobile)) {
      wx.showModal({
        title: '提示',
        content: '是否修改手机号',
        cancelText: "否",//默认是“取消”
        cancelColor: '',//取消文字的颜色
        confirmText: "是",//默认是“确定”
        confirmColor: 'green',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            that.fuck()

          }
        },


      })

    }
  },
  fuck: function (moren) {
    wx.request({
      url: url.editshouji,
      data: {
        user_id: app.globalData.userId,
        mobile: this.data.mobile,
        mobile_id:this.data.mobile_id
      },
      success: (res) => {
        if (res.data.code == 0) {
          var pages = getCurrentPages();//当前页面栈
          var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
          var currPage = pages[pages.length - 1]; // 当前页面，若不对当前页面进行操作，可省去
          beforePage.changeData();//触发父页面中的方法
          wx.navigateBack({
            delta: 1
          })
        }
      }
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
  search: function (e) {
    this.setData({
      mobile: e.detail.value,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        mobile_id:options.id
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