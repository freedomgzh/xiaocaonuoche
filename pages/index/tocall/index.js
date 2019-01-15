// pages/index/call/index.js
var url = require("../../../config.js");
var utils = require("../../../utils/util.js");
//获取应用实例
const app = getApp()
let isclick = false;
var interval;
let that;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: true,
    phone:true,

  },
  //跳转申请
  toApply: function () {
    wx.navigateTo({
      url: '../../index/apply/index',
    })
  },
  //跳转体验
  toEx: function () {
    wx.navigateTo({
      url: '../../index/exp/index',
    })
  },
  copy: function (e) {
    var that = this;
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success: function (res) {
        // self.setData({copyTip:true}),
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('确定')
        //     } else if (res.cancel) {
        //       console.log('取消')
        //     }
        //   }
        // })
      }
    });
  },
  showDetails: function () {
    this.setData({
      show: !this.data.show
    })
  },
  onReady: function () {

  },

  onLoad: function (options) {
    var that = this;


    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { } else {
          that.setData({
            hasUserInfo: false
          })
        }
      }
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
          // that.getIndexList();
        });
      }
    }
  },
  onShow: function () {

  },
  getPhoneNumber: function (e) {
    app.login()

    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.request({
        url: url.wxphone,
        data:{
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          weixin:app.globalData.code
        },
        success:(res)=>{
          wx.setStorageSync("phone", res.phoneNumber)
          that.getPhone(res.phoneNumber)
        },
      })
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  },
  getPhone: function (Amobile){
    wx.request({
      url: url.bindAxB,
      data: {
        Amobile: Amobile,
        iv: e.detail.iv,
        weixin: app.globalData.code
      },
      success: (res) => {
        wx.setStorageSync("phone", res.phoneNumber)
      },
    })
  },
  getUserInfo: function (e) {
    console.log("e", e)
    if (e.detail.userInfo) {
      console.log("授权成功");
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync("userInfo", app.globalData.userInfo)

      // app.userLogin(e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl, e.detail.code);
      app.login()
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

})