//app.js
//all by guanzhihao 
// not  a perfect program
//but a practical  program
var url = require("config.js");
// 引入SDK核心类
var QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'XRWBZ-H7JLS-H37O7-6S45H-SEJRK-FJB7R' // 必填
});
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // this.globalData.hasUserInfo = false;
    var user_id = wx.getStorageSync("user_id");
    var userInfo = wx.getStorageSync("userInfo")
    if (user_id && userInfo) {
      this.globalData.userId = user_id;
      this.globalData.userInfo = userInfo;
      // this.getUserInfo()
    } else this.login();
  },
  // 登录
  login: function() {
    wx.login({
      success: res1 => {
        console.log("res1", res1)
        var userInfo = wx.getStorageSync("userInfo")
        this.getUserInfo(res1);

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getUserInfo: function(res1) {
    // var userInfo = wx.setStorageSync("userInfo",userInfo)
    // console.log(userInfo)
    // if (!userInfo) {
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("res.authSetting['scope.userInfo']", res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          this.globalData.hasUserInfo = true
          console.log(222222222222222222)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框		
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log("已经授权 用户信息res", res)
              this.globalData.userInfo = res.userInfo
              this.globalData.code = res1.code

              var userInfo = wx.setStorageSync("userInfo", res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              console.log(this.userInfoReadyCallback)
              if (this.userInfoReadyCallback) {
                console.log("callback获取授权 用户信息res", res)
                this.userInfoReadyCallback(res, res1)
                // this.globalData.hasUserInfo = false;

              } else {
                this.userLogin(res.userInfo.nickName, res.userInfo.avatarUrl, res1.code);
              }
            }
          })
        } else {
          console.log("提示获取用户信息");
          console.log(1111111111111)
          this.globalData.hasUserInfo = false;
          
        }
      },
      fail: res => {
        console.log(333333333333333333)
        this.getUserInfo(res1)
        this.globalData.hasUserInfo = false;

      }
    })
    console.log(4444444444444444444444);
    // }
    // else{
    //   this.userLogin(userInfo.nickName, userInfo.avatarUrl, res1.code);

    // }
  },
  getArea: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("定位latitude：", res.latitude)
        console.log("定位longitude：", res.longitude)
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log("定位：", res)
            let address_info = res.result.ad_info //.address_component
            let address = res.result.formatted_addresses.recommend
            //.address_component
            wx.setStorageSync('address_info', address_info);
            wx.setStorageSync('address_address', address);
            // wx.request({
            //   url: 'https://lmbge.com/wxapi/jicai/quyu',
            //   data: {
            //     region_type: 3,
            //     region_name: address_info.district
            //   },
            //   success: function (res) {
            //     if (res.data.code == 0) {
            //       wx.setStorageSync('region_id', res.data.data.region_id);
            //     }
            //   }
            // })
            // wx.request({
            //   url: 'https://lmbge.com/wxapi/jicai/quyu',
            //   data: {
            //     region_type: 2,
            //     region_name: address_info.city
            //   },
            //   success: function (res) {
            //     if (res.data.code == 0) {
            //       wx.setStorageSync('city_id', res.data.data.region_id);
            //     }
            //   }
            // })
            // wx.request({
            //   url: 'https://lmbge.com/wxapi/jicai/quyu',
            //   data: {
            //     region_type: 1,
            //     region_name: address_info.province
            //   },
            //   success: function (res) {
            //     if (res.data.code == 0) {
            //       wx.setStorageSync('province_id', res.data.data.region_id);
            //     }
            //   }
            // })
          },
          fail: function (res) {
            //console.log(res);
          },
          complete: function (res) {
            //console.log(res);
          }
        });

      }
    })
  },
  userLogin: function(user_name, avatar, weixin, callBack) {
    var that = this
    wx.request({
      url: url.login,
      data: {
        user_name,
        avatar,
        weixin,
    
      },
      success: function(res) {
        console.log("返回用户数据", res.data.data)
        wx.setStorageSync("user_id", res.data.data.user_id)
        console.log("that.globalData", that.globalData)
        that.globalData.userId = res.data.data.user_id

        if (callBack) callBack(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    hasUserInfo:true
  }
})