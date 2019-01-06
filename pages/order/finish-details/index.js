// pages/finish-details/index.js
var url = require("../../../config.js");
var utils = require("../../../utils/util.js");
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    show: false,
    transfer: {
      city: "上海保山地区",
      zone: "上海保山地区a发动机咖啡恒大华府",
      post: "315000",
      name: "恩恩额",
      phone: "158842659695"
    }
  },
  transfer: function (order_id ) {
    var that = this;
    wx.request({
      url: 'https://lmbge.com/wxapi/tuangou/dizhi1',
      data: {
        order_id: order_id ,
        user_id: app.globalData.userId
      },
      success: function (res) {
        console.log("res", res)
        if (res.data.code == 0) {
          that.setData({
            transferDetails: res.data.data
          })
        } else {
          wx.showLoading({
            title: '接口错误',
          })
        }
        console.log(that.data.transferDetails)
      },
      fail: function (res) {
        console.log("res", res)

      }
    })
  },
  setDaojishi: function (end_time) {
    var that = this
    // console.log("开始", start_time)
    console.log("结束", end_time)

    clearInterval(this.data.interval);
    // this.setData({
    //   interval:''
    // })


    var daojishi = end_time * 1000 - new Date().getTime();
    console.log("daojishi", daojishi)
    var time = utils.gettime(daojishi);
    console.log("time", time)

    that.setData({
      thistime: time,
    })
    if (time.days < 0) {
      wx.showToast({
        title: '已结束',
        icon: "none"
      })
      time = {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      }
      that.setData({
        thistime: time
      })
      return
    }

    this.setData({
      interval: setInterval(function () {
        var newDate = new Date().getTime()
        var daojishi = end_time * 1000 - newDate;
        var time = utils.gettime(daojishi);

        that.setData({
          thistime: time,
          newDate: newDate,
        })
        // var 
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    that=this;
    that.data.orderId = options.orderId
    this.getOrderinfo(options.orderId)
    this.changeTitle(options.type)
    this.setDaojishi(Number(options.end_time))
    this.transfer(options.orderId)
    var arrival_time = options.arrival_time
    
  },
  showDetails: function() {
    this.setData({
      show: !this.data.show
    })
  },
  changeTitle: function(type) {
    var title = ''
    if (type == 1) {
      title = "快运bus"
    } else if (type == 2) {
      title = "海运bus"
    } else {
      title = "空运bus"
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },
  copy: function(e) {
    var that = this;
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success: function(res) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // var totalSecond = 1296000;
    // console.log(totalSecond)
    // var interval = setInterval(function() {
    //   // 秒数
    //   var second = totalSecond;

    //   // 天数位
    //   var day = Math.floor(second / 3600 / 24);
    //   var dayStr = day.toString();
    //   if (dayStr.length == 1) dayStr = '0' + dayStr;

    //   // 小时位
    //   var hr = Math.floor((second - day * 3600 * 24) / 3600);
    //   var hrStr = hr.toString();
    //   if (hrStr.length == 1) hrStr = '0' + hrStr;

    //   // 分钟位
    //   var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    //   var minStr = min.toString();
    //   if (minStr.length == 1) minStr = '0' + minStr;

    //   // 秒位
    //   var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
    //   var secStr = sec.toString();
    //   if (secStr.length == 1) secStr = '0' + secStr;

    //   this.setData({
    //     countDownDay: dayStr,
    //     countDownHour: hrStr,
    //     countDownMinute: minStr,
    //     countDownSecond: secStr,
    //   });
    //   totalSecond--;
    //   if (totalSecond < 0) {
    //     clearInterval(interval);
    //     wx.showToast({
    //       title: '活动已结束',
    //     });
    //     this.setData({
    //       countDownDay: '00',
    //       countDownHour: '00',
    //       countDownMinute: '00',
    //       countDownSecond: '00',
    //     });
    //   }
    // }.bind(this), 1000);
  },
  getOrderinfo: function (orderId){
    wx.request({
      url: url.orderinfo,
      data:{
        order_id: orderId
      },
      success:function(res){
        console.log("订单详情" + orderId,res.data)
        that.setData({
          orderinfo: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from == "button") {

    }
    return {
      title: "社区团购",
      path: "/pages/tabbar/index/index",
      success: function() {

      },
    }
  }
})