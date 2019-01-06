//app.js
// 引入SDK核心类
//var QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
// var qqmapsdk = new QQMapWX({
//   key: 'XRWBZ-H7JLS-H37O7-6S45H-SEJRK-FJB7R' // 必填
// });
var app = getApp()
//const hostName = "https://dec.tastecn.com/";
//const hostName = "https://ac.tastecn.com/";
const hostName = "https://ac.tastecn.com/";
App({
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs);
    app = this;
    //调用微信定位
    wx.getLocation({
      success: function (res) {
        app.markers.latitude = res.latitude;
        app.markers.longitude = res.longitude;
        console.log("纬度：" + app.markers.latitude);
        console.log("经度：" + app.markers.longitude);
        app.appLogin()
      },
      fail: function () {
        console.log("获取位置失败");
        wx.showModal({
          title: '登录失败',
          content: '无法获取定位信息',
          success: function () {
            app.isReady = true;
          }
        })
      }
    })
  },
  appLogin: function () {
    console.log("//开始登录流程")
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
        var unionId = res.data;
        var openId = wx.getStorageSync("openId")
        console.log("unionId&openId:", unionId, openId)
        if (openId && unionId)
          app.login("", openId, unionId);
        else
          wx.login({
            success: function (rrs) {
              console.log("common-login-code", rrs.code)
              app.login(rrs.code, "", "");
            }
          })
      },
      fail: function (res) {
        // 调用微信登录
        wx.login({
          success: function (res) {
            console.log("common-login-code--", res.code)
            app.login(res.code, "", "");
          },
          fail: function (e) {
            wx.hideLoading()
            wx.showModal({
              title: '错误',
              content: '无法登录小程序，请检查网络并重试！',
              confirmText: "重试",
              success: function (r) {
                if (r.confirm) {
                  wx.showLoading({
                    title: '请稍候...'
                  })
                  app.appLogin()
                }
              }
            })
          }
        })
      }
    })
  },
  login: function (loginCode, openId, unionId) {
    console.log("net-login", loginCode, openId)
    wx.request({
      url: app.loginAddress + 'order/login',
      method: 'POST',
      data: '{"weixin":"' + loginCode + '","openId":"' + openId + '","unionId":"' + unionId + '"}',
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 1) {
          console.log("登录成功", res.data.data)
          //保存user_id
          app.globalData.userId = res.data.data.userId;
          app.globalData.accessToken = res.data.data.accessToken;
          app.globalData.accessTokenRestaurant = res.data.data.accessTokenRestaurant;
          app.globalData.openId = res.data.data.openid;
          if (res.data.data.session_key)
            app.globalData.sessionKey = res.data.data.session_key;
          if (res.data.data.unionId)
            app.globalData.unionId = res.data.data.unionId;
          app.globalData.isNewUser = res.data.data.isNewUser;
          app.globalData.isIdentityAuth = res.data.data.isIdentityAuth;
          app.globalData.invitateCount = res.data.data.invitateCount;
          if (res.data.data.countryCode) {
            app.globalData.currency = res.data.data.currencySign;
            app.globalData.exchange = res.data.data.exchangeRate;
            app.globalData.consumeFeeRate = res.data.data.consumeFeeRate;
            app.markers.countryCode = res.data.data.countryCode;
            app.markers.city = res.data.data.city;
          } else
            app.getGoogleGeoLocation();
          if (res.data.data.isNewUser === false) {
            wx.setStorageSync("openId", app.globalData.openId)
            app.getUserInfo();
          } else {
            app.isReady = true;
            wx.removeStorageSync("openId")
          }
          if (res.data.data.unionId) {
            app.globalData.unionId = res.data.data.unionId;
            wx.setStorageSync("unionId", res.data.data.unionId);
          } else
            wx.removeStorageSync("unionId")
        } else {
          console.log("登录失败", res.data)
          wx.removeStorageSync("openid")
          wx.hideLoading()
          wx.showModal({
            title: '错误',
            content: '无法登录小程序，请退出重试！\r\n错误信息：' + res.data.message,
            showCancel: false,
            success: function () {
              //app.login();
              app.isReady = true;
            }
          })
        }
      },
      fail: function (e) {
        console.log("登录失败fail", e)
        wx.hideLoading()
        wx.showModal({
          title: '错误',
          content: '无法登录小程序，请检查网络并重试！',
          confirmText: "重试",
          success: function (r) {
            if (r.confirm) {
              wx.showLoading({
                title: '请稍候...'
              })
              app.appLogin()
            }
          }
        })
      }
    })
  },
  getUserInfo: function (cb) {
    if (app.globalData.userId != -1) {
      wx.request({
        url: app.apiAddress + 'user/info/get',
        method: 'GET',
        data: {
          "userId": app.globalData.userId,
          "accessToken": app.globalData.accessToken
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('获取个人信息：', res.data.data);
          if (res.data.code == 1) {
            app.globalData.userInfo = res.data.data;
            app.getCouponList();
          }
        },
        complete: function () {
          app.isReady = true;
        }
      })
    }
  },
  getGoogleGeoLocation: function () {
    var urlX = 'https://maps.google.cn/maps/api/geocode/json?latlng=' + app.markers.latitude + ',' + app.markers.longitude + '&sensor=true&language=EN';
    wx.request({
      url: urlX,
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        if (res.data.status === "OK" && res.data.results.length > 0) {
          for (var i = 0; i < res.data.results.length; i++) {
            var result = res.data.results[i];
            if (result.types[0] === "locality" && result.types[1] && result.types[1] === "political") {
              if (result.address_components.length == 2) {
                app.markers.country = result.address_components[1].long_name;
                //app.markers.countryCode = result.address_components[1].short_name;
                app.markers.province = result.address_components[0].long_name;
                app.markers.city = result.address_components[0].long_name;
                break;
              } else if (result.address_components.length == 3) {
                app.markers.country = result.address_components[2].long_name;
                app.markers.countryCode = result.address_components[2].short_name;
                app.markers.province = result.address_components[1].long_name;
                app.markers.city = result.address_components[0].long_name;
                break;
              }
            }
          }
          console.log("获取位置信息成功-Google", app.markers);
          app.updateLocation(true);
        } else {
          app.updateLocation(false);
        }
      }
    })
  },
  openStreetMapGeocodeLogin: function () {
    //console.log("google geocode 失败, 尝试open street map API");
    var openStreetMapUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + app.markers.latitude + '&lon=' + app.markers.longitude + '&zoom=18&addressdetails=1';
    wx.request({
      url: openStreetMapUrl,
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        //console.log("openStreetMap 定位", res);
        if (!res.data.error && res.data.address) {
          app.markers.country = res.data.address.country;
          app.markers.countryCode = res.data.address.country_code;
          if (res.data.address.state)
            app.markers.province = res.data.address.state;
          else
            app.markers.province = res.data.address.country;
          if (res.data.address.state_district)
            app.markers.city = res.data.address.state_district;
          else
            app.markers.city = res.data.address.country;
          /*console.log("国家：" + app.markers.country);
          console.log("国家：" + app.markers.countryCode);
          console.log("省：" + app.markers.province);
          console.log("城市：" + app.markers.city);
          console.log("获取位置信息成功,登录","open street map");*/
          app.updateLocation(true);
        } else {
          console.log("openStreetMap 定位失败:");
          // wx.showModal({
          // 	title: '登录失败',
          // 	content: '无法定位信息',
          // 	success: function () {

          // 	}
          // })
        }
      }
    })
  },
  //更新位置信息
  updateLocation: function (status) {
    wx.request({
      url: app.apiAddress + 'common/user/location/update',
      data: {
        "userId": app.globalData.userId,
        "markers": app.markers,
        "locateSuccess": status,
        "accessToken": app.globalData.accessToken
      },
      success: res => {
        //console.log("更新用户位置信息", res)
        if (res.data.code == 1) {
          if (res.data.data.currencySign) {
            app.globalData.currency = res.data.data.currencySign;
            app.globalData.exchange = res.data.data.exchangeRate;
            app.globalData.consumeFeeRate = res.data.data.consumeFeeRate;
          }
          if (res.data.data.countryCode)
            app.markers.countryCode = res.data.data.countryCode;
        }
      },
      complete: function () {
        app.isReady = true;
      }
    })
  },
  onShow: function (options) {
    //console.log('App Show1111111111111111111',options.scene);
    //获取场景值
    //wx.setStorageSync('scene', options.scene);
    if (app.isHide) {
      wx.getLocation({
        success: function (res) {
          app.markers.latitude = res.latitude;
          app.markers.longitude = res.longitude;
          console.log("纬度：" + app.markers.latitude);
          console.log("经度：" + app.markers.longitude);
          app.appLogin()
        }
      })
      app.isHide = false;
    }
  },
  onHide: function () {
    console.log('App Hide')
    app.isHide = true;
  },
  //购物车相关
  setShopCart: function (ldata, restId) {
    var skey = "TempShopCart";
    if (restId)
      skey += restId
    if (ldata.length > 0) {
      wx.setStorage({
        key: skey,
        data: ldata
      })
    } else
      wx.removeStorage({
        key: skey,
        success: function (res) { },
      })
  },
  addShopCart: function (ldata, restId, callback) {
    var skey = "TempShopCart";
    if (restId)
      skey += restId;
    wx.getStorage({
      key: skey,
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var _d = res.data[i];
          if (_d.dishId === ldata.dishId && ldata.type !== "FREE_COMBINATION" && ldata.dishExtra === "") {
            _d.dishCount += 1;
            _d.dishPrice = ldata.dishPrice;
            _d.totalAmount = parseFloat((_d.dishPrice * _d.dishCount).toFixed(2));
            _d.payAmount = _d.totalAmount;
            _d.dishName = ldata.dishName;
            _d.image = ldata.image;
            _d.restaurantName = ldata.restaurantName;
            _d.restaurantId = ldata.restaurantId;
            _d.prepareTime = ldata.prepareTime;
            wx.setStorage({
              key: skey,
              data: res.data,
              success: function () {
                if (callback)
                  callback()
              }
            })
            return;
          }
        }
        ldata.totalAmount = ldata.dishPrice;
        ldata.payAmount = ldata.totalAmount;
        res.data.push(ldata);
        wx.setStorage({
          key: skey,
          data: res.data,
          success: function () {
            if (callback)
              callback()
          }
        })
        return;
      },
      fail: function () {
        var cartData = new Array();
        ldata.totalAmount = ldata.dishPrice;
        ldata.payAmount = ldata.totalAmount;
        cartData.push(ldata);
        wx.setStorage({
          key: skey,
          data: cartData,
          success: function () {
            if (callback)
              callback()
          }
        })
        return;
      }
    })
  },
  getShopCart: function (back) {
    var skey = "TempShopCart";
    if (back.restaurantId)
      skey += back.restaurantId;
    wx.getStorage({
      key: skey,
      success: function (res) {
        back.success(res.data)
      },
      fail: function () {
        if (back.fail)
          back.fail()
      }
    })
  },
  getShopCartSync: function (reid) {
    var skey = "TempShopCart";
    if (reid)
      skey += reid;
    return wx.getStorageSync(skey);
  },
  getShopCartCount: function (data, reid) {
    if (data.length > 0) {
      var scount = 0
      for (var i = 0; i < data.length; i++) {
        if (reid) {
          if (data[i].restaurantId == reid)
            scount += data[i].dishCount;
        } else
          scount += data[i].dishCount;
      }
      return scount;
    }
    return 0;
  },
  getCouponList: function (back) {
    wx.request({
      url: app.walletAddress + 'wallet/user/summary/couponcard',
      data: {
        userId: app.globalData.userId,
        accessToken: app.globalData.accessToken
      },
      success: function (res) {
        console.log("获取钱包", res)
        if (res.data.code === "1" && res.data.data) {
          app.couponCardList = res.data.data.couponCardList ? res.data.data.couponCardList : [];
          app.walletBalance = res.data.data.walletBalanceAmount ? res.data.data.walletBalanceAmount.toFixed(2) : "0.00";
        }
        if (back) back()
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '优惠券获取超时，请刷新重试',
        })
      }
    })
  },
  isPay: function (callback) {
    wx.request({
      url: app.apiAddress + 'order/paynow/waitpay',
      data: {
        "userId": app.globalData.userId,
        "accessToken": app.globalData.accessToken
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === "1") {
          console.log("是否有未支付订单", res.data)
          if (callback) callback(res.data.data);
        }
      },
      fail: function () {

      },
    })
  },
  isReady: false,
  markers: {
    latitude: 35.95995,
    longitude: 120.19653,
    countryCode: ""
  },
  globalData: {
    userInfo: {},
    userId: -1,
    currency: "$"
  },
  imgAddress: hostName,
  restaurantAddress: hostName + "decrestaurant/wxapi/",
  hbAddress: hostName + "dectechmarket/wxapi/",
  apiAddress: hostName + "decorder/wxapi/",
  walletAddress: hostName + "decwallet/wxapi/",
  loginAddress: hostName + "shopbuy/wxapi/"
})