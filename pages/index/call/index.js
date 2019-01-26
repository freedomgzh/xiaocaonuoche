// pages/index/call/index/index.js
var url = require("../../../config.js")
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false
  },
  // changeData:function(){
  //   wx.switchTab({
  //     url: '/pages/tabbar/index/index',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that =this;
    var userInfo = wx.getStorageSync("userInfo")

    if (userInfo){
      that.setData({
        hasUserInfo: true
      })
      this.getCode(id)

    }

    this.setData({
      id: options.id
    })
    if (app.globalData.userInfo) {
      // 不显示权限

      // that.getIndexList();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("没有userinfo，callback赋值");
      app.userInfoReadyCallback = (res, res1) => {
        console.log("getuserinfo，获取用户信息", res, "res1", res1);
        app.userLogin(res.userInfo.nickName, res.userInfo.avatarUrl, res1.code, function () {
          console.log(2222)
          that.getCode(id)
        });
      }
    }
  },
  getCode: function (id) {
    var that = this
    wx.request({
      url: url.codeInfo,
      data: {
        id: id,
        user_id:app.globalData.userId
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          if (res.data.data.mobile == "") {
              
            wx.navigateTo({
              url: '/pages/bb/index/index?id=' + id  +  "&bangding=" + res.data.data.bangding, 
            })
          } else if (res.data.data.mobile1 == "xdmdr"){
            wx.navigateTo({
              url: '/pages/index/dx/index?id=' + id,
            })
          } else if (res.data.data.mobile1 == "jdmdr"){
            wx.navigateTo({
              url: '/pages/index/nocall/index?id=' + id,
            })
          }
          else if (res.data.data.mobile1 == "myself") {
            wx.navigateTo({
              url: '/pages/change/index/index?id=' + id  + "&mobile=" + res.data.data.mobile + "&chepai=" + res.data.data.chepaihao,
            })
          }
          else{
            console.log(111)
            wx.navigateTo({
              url: '/pages/index/tocall/index?id=' + id + "&mobile=" + res.data.data.mobile,
            })
          }
        } else {
          wx.showToast({
            title: '数据错误',
            icon: "none"
          })
        }
      }
    })

  },
  toone:function(){
    wx.switchTab({
      url: '/pages/tabbar/index/index',
    })
  },
  tosecond: function () {
    wx.switchTab({
      url: '/pages/tabbar/my/index',
    })
  },
  getUserInfo: function (e) {
    console.log("e", e)
    var that =this
    if (e.detail.userInfo) {
      console.log("授权成功");
      app.globalData.userInfo = e.detail.userInfo;
      var userInfo = e.detail.userInfo;
      wx.setStorageSync("userInfo", app.globalData.userInfo)


        app.login(function () {
          console.log(2222)
          that.getCode(that.data.id)
        });
      wx.showLoading({
        title: '加载中',
      })
      wx.hideLoading()
      this.setData({
        hasUserInfo: true
      })
    } else {
      console.log("授权失败");
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
  onShareAppMessage: function () {

  }
})