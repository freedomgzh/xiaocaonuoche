// pages/my/index.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {
    //   avatarUrl: app.globalData.userInfo.avatarUrl,
    //   nickName: app.globalData.userInfo.nickName,
    //   show:false,
    // },
    menulist: [
      {
        imgPath: '/images/order.png',
        text: '我的订单',
        url: "/pages/tabbar/order/index"
      },
      {
        imgPath: '/images/quite.png',
        text: '勿扰模式',
        url: "/pages/quite/index/index"
      },
      {
        imgPath: '/images/phone.png',
        text: '管理手机号',
        url: "/pages/mPhone/index/index"
      },
      {
        imgPath: '/images/address.png',
        text: '我的地址',
        url: "/pages/address/index/index"
      },
      {
        imgPath: '/images/quite.png',
        text: '二维码续费',
        url: "/pages/renew/index/index"
      },

    ],
    list:[
      {
        imgPath: '/images/help.png',
        text: '使用说明',
        url: "/pages/help/index/index"
      },
      {
        imgPath: '/images/kefu.png',
        text: '联系客服',
        url: ""
      },
    ]


  },
  join:function(){
    wx.navigateTo({
      url: '/pages/join/index/index',
    })
  },
  makePhone:function(){
    wx.makePhoneCall({
      phoneNumber: '17169661011',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo")
    that.setData({
      userInfo: userInfo
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            show:true
          })
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              that.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
              console.log(that.data.userInfo)
            }
          })
        }
      }
    })
    /**
     * 获取用户信息
     */
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log("111",res);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]: res.userInfo.nickName,
    //     })
    //   }
    // })
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