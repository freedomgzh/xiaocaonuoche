// pages/paynow.js
var app = getApp();
var pay = require('../../../utils/pay.js');
var url = require("../../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isclicksure: false, //判断是否是点击确定按钮
    payList: ["微信支付"],// "货到付款"],
    payCode: ["WECHAT_PAY"]//, "CASH_PAY"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option", options)
    this.data.orderTransactionId = options.orderTransactionId;
    this.data.orderSn = options.order_sn;
    this.data.formPage = options.formPage;
    this.data.order_id = options.order_id;
    this.setData({
      orderSn: this.data.orderSn
    })
    console.log(this.data.orderSn)
    const ctx = wx.createCanvasContext('erweima')
    const imgPath = '../../../images/paynowQR.png';
    var res = wx.getSystemInfoSync();
    var screenWidth = res.windowWidth;
    var imgwidth = 400 / (750 / screenWidth);
    var imgheight = 400 / (750 / screenWidth);
    this.data.imgwidth = imgwidth;
    this.data.imgheight = imgheight;
    this.data.top = 20 / (750 / screenWidth);
    this.data.left = 20 / (750 / screenWidth);
    // wx.downloadFile({
    // 	url:"" ,
    // 	success: function (sres) {
    // 		console.log(sres);
    // 		var tempFilePath = sres.tempFilePath
    // ctx.drawImage(tempFilePath, 0, 0, 200, 200);
    // 		ctx.draw()
    // 	},
    // 	fail: function (fres) {
    // 		wx.showModal({
    // 			title: '提示',
    // 			content: '',
    // 			success: function (res) {
    // 				if (res.confirm) {
    // 					console.log('用户点击确定')
    // 				} else if (res.cancel) {
    // 					console.log('用户点击取消')
    // 				}
    // 			}
    // 		})
    // 	}
    // })
    ctx.drawImage(imgPath, this.data.top, this.data.left, imgwidth, imgheight);
    ctx.draw()
  },
  drawImg: function () {
    var that = this
    wx.canvasToTempFilePath({
      x: that.data.left,
      y: that.data.left,
      width: that.data.imgwidth,
      height: that.data.imgwidth,
      destWidth: that.data.imgwidth,
      destHeight: that.data.imgwidth,
      canvasId: 'erweima',
      success: function (res) {
        var payImgSrc = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: payImgSrc,
          success(res) {
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#e50012',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                }
              }
            })
          }
        })

      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  copyTxt: function (e) {
    var self = this;
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success: function (res) {
        // self.setData({copyTip:true}),
      }
    });
  },
  confirm: function (e) {
    var that = this;
    var order_id = this.data.order_id; 
    console.log(order_id)
    wx.request({
      url: url.host + 'paysuccess',
      data: { order_id: order_id },
      success: (res2) => {
        console.log("1111",res2)
        that.data.isclicksure = true;
        if(res2.data.code==0){
          wx.switchTab({
            url: '/pages/tabbar/order/index'
          })
        }
     
        console.log("调用微信支付后", res2);
      }
    })
  },
  // backpay: function (e) {
  //   wx.navigateTo({
  //     url: '/pages/order/order-detail/index?orderTransactionId=' + this.data.orderTransactionId
  //   })

  // },
  changePay: function () {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.payList,
      success: function (res1) {
        wx.showLoading({
          title: '加载中',
        })
        that.setData({
          isbtnclick: true
        })
        wx.request({
          url: app.apiAddress + 'order/paynow/paytype/change',
          data: {
            "openId": app.globalData.openId,
            "orderTransactionId": that.data.orderTransactionId,
            "userId": app.globalData.userId,
            "payType": that.data.payCode[res1.tapIndex],
            "accessToken": app.globalData.accessToken
          },
          success: function (res) {
            wx.hideLoading();
            if (res.data.code == 1) {
              that.data.isclicksure = true;
              // 微信支付	
              if (res1.tapIndex === 0) {
                pay.wxpay2(res.data.data, app, function () {
                  that.setData({
                    isbtnclick: false
                  })
                });
              } else {
                wx.switchTab({
                  url: '/pages/order/index',
                })
              }
            } else
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
          }
        })
      }
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
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      isPaynowBack: true,
    })
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
    if (!this.data.isclicksure && this.data.formPage) {
      console.log("this.data.isclicksure", this.data.isclicksure);
      wx.navigateTo({
        url: '/pages/order/order-detail/index?orderTransactionId=' + this.data.orderTransactionId
      })
    }
  },
  comeback:function(){
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    wx.navigateBack({
      delta: 1
    })
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