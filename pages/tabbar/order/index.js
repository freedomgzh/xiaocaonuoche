// pages/order/index.js
var wxpay = require('../../../utils/pay.js');
var url = require("../../../config.js");
var utils = require("../../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // orderList: [{
    //     orderStatusDesc: "等待成团",
    //     orderTransactionId: 1,
    //     orderStatus: 2,
    //     deliveryAddress: "山东青岛",
    //     orderAcceptTime: "10:11:15",
    //     // deliveryTime:"10:11:15",
    //     consignee: "王 (先生)",
    //     mobile: "1111545454",
    //     deliveryAddress: "山东省青岛市黄岛区光谷软件园",
    //     orderSn: 8125,
    //     orderTime: "2018-10-11  10:45",
    //     orderTimeHHmm: "08:13:45",
    //     deliveryTime: "2018-10-20  10:45"
    //   }, {
    //     orderStatusDesc: "已发货",
    //     orderTransactionId: 1,
    //     orderStatus: 4,
    //     deliveryAddress: "山东青岛",
    //     orderAcceptTime: "10:11:15",
    //     deliveryTime: "2018-10-20  10:45",
    //     orderPickedUpTime: "11:20:30",

    //     consignee: "王 (先生)",
    //     mobile: "1111545454",
    //     deliveryAddress: "山东省青岛市黄岛区光谷软件园",
    //     orderSn: 5041,
    //     orderTime: "2018:10:11:45",
    //     orderTimeHHmm: "08:13:45"
    //   },
    //   {
    //     orderStatusDesc: "正在配送",
    //     orderTransactionId: 1,
    //     orderStatus: 5,
    //     deliveryAddress: "山东青岛",
    //     orderAcceptTime: "10:11:15",
    //     deliveryTime: "2018-10-20  10:45",
    //     orderPickedUpTime: "11:20:30",

    //     consignee: "王 (先生)",
    //     mobile: "1111545454",
    //     deliveryAddress: "山东省青岛市黄岛区光谷软件园",
    //     orderSn: 8745,
    //     orderTime: "2018:10:11:45",
    //     orderTimeHHmm: "08:13:45"
    //   },


    // ],
    payTypes: {
      WECHAT_PAY: "微信支付",
      CASH_PAY: "货到付款",
      PAY_NOW: "PayNow支付"
    },
  },
  getOrderList: function() {
    var that = this;
    wx.showLoading()
    console.log(app.globalData.userId)
    if (!app.globalData.userId) {
      wx.showToast({
        title: '登陆失败，请重试',
        icon: "none"
      })
      return
    }
    wx.request({
      url: url.orderlist,
      data: {
        user_id: app.globalData.userId
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("订单列表", res);
        if (res.data.code == "0") {
          var orderList = res.data.data.orderList
          orderList.forEach(function(item, index) {
            orderList[index].add_time = utils.formatTime2(new Date(item.add_time * 1000))
          })
          that.setData({
            orderList: orderList
          })
          console.log(orderList)
          wx.hideLoading()
        } else {
          that.showError()
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toPay: function(e) {
    console.log(e)
    var paytype = e.currentTarget.dataset.paytype
    var order_id = e.currentTarget.dataset.id
    console.log(order_id)
    // if (paytype == "wx") {
    //   wxpay.wxpay(app, 0, order_id, "/pages/tabbar/order/index?order_status=2");
    // }
    // else {
      wx.showActionSheet({
        itemList: ["微信支付", "paynow支付"],
        success(res) {
          console.log(res)
          if (res.tapIndex == 0) {
            wxpay.wxpay(app, 0, order_id, "/pages/tabbar/order/index?order_status=2");

          } else if (res.tapIndex == 1) {
            var order_sn = e.currentTarget.dataset.sn
            wx.navigateTo({
              url: '/pages/paynow/to-paynow/index?order_sn=' + order_sn + "&order_id=" + order_id,
            })
          }
        }
      })
    // }
  },
  onLoad: function(options) {
    var newDate = new Date().getTime()
    this.setData({
      newDate: newDate
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //接口报错
  showError: function() {
    wx.showLoading({
      title: '接口返回错误',
      icon: "none"
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})