//app.js
var url = require("config.js");
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
  userLogin: function(user_name, avatar, weixin, callBack) {
    var that = this
    wx.request({
      url: url.login,
      data: {
        user_name,
        avatar,
        weixin
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