// pages/details/index.js
var url = require("../../../config.js");
var utils = require("../../../utils/util.js");
var wxpay = require('../../../utils/pay.js');
var app = getApp();
var intervals;
var that;
var progressNum = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    items: [],
    imgPath:[],
    array: ["普通货", "敏感货"],
    
    index: 0,
    pay: [{
        name: 'wx',
        value: '微信支付'
      },
      {
        name: 'paynow',
        value: 'paynow支付'
      }
    ],
    thistime: {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    }
  },
  // 获取wx收货地址
  getWxAddress: function() {
    var that = this;
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting)
        if (res.authSetting["scope.address"] == undefined || res.authSetting["scope.address"]) {
          wx.chooseAddress({
            success(res) {
              var address = {
                region: res.provinceName + res.cityName + res.countyName,
                address: res.detailInfo,
                mobile: res.telNumber,
                consignee: res.userName,
              }
              that.setData({
                addressInfo: res,
                address: address
              })
            }
          })
          return;
        }
        if (!res.authSetting["scope.address"]) {
          that.showModal("获取地址权限失败，点击确定重新获取");
        }
      }
    })
  },
  getOrder: function (e) {
    console.log("attrname", e)
    var value = e.detail.value;
    var i = e.currentTarget.dataset.index;
    this.data.items[i].order_num = value
    this.setData({
      items: this.data.items
    })
    console.log("arrrrrrr", this.data.items)
  },
  getChange: function () {
    var that =this
      wx.request({
        url: 'http://www.lmbge.com/wxapi/tuangou/huilv',
        data:{
          gby_id: that.data.gby_id
        },
        success: res=>{
            if(res.data.code==0){
              console.log(res)
                that.setData({
                  rmb:res.data.data
                })
            }else{
             that.showError()
            }
        },
      })


   },
  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.items.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      items: this.data.items

    })

  },

  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.items.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      items: that.data.items

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {
    console.log("idnex", e)
    this.data.items.splice(e.currentTarget.dataset.index, 1)

    this.setData({

      items: this.data.items,

    })
    console.log("删除后arr", this.data.items)
    if (this.data.items.length == 0) {
      this.setData({
        isShowPriceAndNum: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    console.log("1",options)
    this.setData({
      types: options.type,
      gby_id: options.gby_id,
      start_time_t: utils.formatTime(new Date(parseInt(options.start_time) * 1000)),
      money: options.money == "undefined" ? "" : Number(options.money)
    })
    this.setDaojishi(parseInt(options.start_time), parseInt(options.end_time));
    this.changeTitle(options.type)
   this.getChange()
    this.address(app.globalData.userId )
  },
  setDaojishi: function(start_time,end_time) {
    clearInterval(intervals);
    var daojishi = end_time * 1000 - new Date().getTime();
    var time = utils.gettime(daojishi);
    this.setData({
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
      wx.navigateBack({})
      return
    }
  var that =this
    intervals = setInterval(function() {
      var daojishi = end_time * 1000 - new Date().getTime();
      var time = utils.gettime(daojishi);
      that.setData({
        thistime: time
      })
      // console.log(time);
      // var 
    }, 1000);
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
  //获取地址列表
  address: function (user_id){
    var that =this;
    wx.request({
      url: url.address,
      data:{
        user_id: user_id
      },
      success:function(res){
        console.log("dizhi",res)
        if(res.data.code=="0"){
          that.setData({
            address_details:res.data.data[0]
        })
        }else{
          that.showError();
        }
    
      },
    })
  },
  formsubmit: function(res) {
    console.log("form内容", res)
    var that =this
    var goods_type = res.detail.value.goods_type //=="1"?"敏感货":"普通货"
    var goods_kind = res.detail.value.goods_kind ? res.detail.value.goods_kind:""
    var address = res.detail.value.address
    var goods_num = res.detail.value.goods_num ? res.detail.value.goods_num:""
    var consignee = res.detail.value.consignee
    var goods_worth = res.detail.value.goods_worth ? res.detail.value.goods_worth:""
    var mobile = res.detail.value.mobile
    var paytype = res.detail.value.paytype

    var paytype = res.detail.value.paytype
    var order_gallery = that.data.imgPath
     that.data.items.push({order_num:res.detail.value.order_num})
    var order_sns = that.data.items
    console.log("order_sns", order_sns, "o", that.data.items)
    if (that.data.types!=1){
      paytype=1
}
    console.log("type",paytype)
    var user_id = app.globalData.userId
    var gby_id = that.data.gby_id
    var order_amount =that.data.rmb
    var order_sn = that.data.order_sn ? that.data.order_sn:0
    var order_id = that.data.order_id ? that.data.order_id : 0

    
    // console.log("money", order_amount)
    // console.log("paytype", res.detail.value.paytype)

    if (!user_id || !gby_id) {
      wx.showToast({
        title: '登陆失败，请重试',
        icon: "none"
      })
      return
    }
    // if (goods_kind == "") {
    //   wx.showToast({
    //     title: '货品种类不能为空',
    //     icon: "none"
    //   })
    //   return;
    // }
    // if (goods_worth == "") {
    //   wx.showToast({
    //     title: '货品价值不能为空',
    //     icon: "none"
    //   })
    //   return;
    // }
    // if (goods_num == "") {
    //   wx.showToast({
    //     title: '货品数量不能为空',
    //     icon: "none"
    //   })
    //   return;
    // }
    if (mobile == "") {
      wx.showToast({
        title: '电话不能为空',
        icon: "none"
      })
      return;
    }
    if (consignee == "") {
      wx.showToast({
        title: '收货人姓名不能为空',
        icon: "none"
      })
      return;
    }


    if (address == "") {
      wx.showToast({
        title: '收货地址不能为空',
        icon: "none"
      })
      return;
    }
    if (paytype == "") {
      console.log(paytype)
      wx.showToast({
        title: '支付方式不能为空',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交数据中',
    })
    wx.request({
      url: url.order,
      data: {
        user_id,
        order_amount,
        goods_type,
        goods_kind,
        goods_worth,
        goods_num,
        consignee,
        mobile,
        address,
        gby_id,
        paytype,
        order_sn,
        order_sns,
        order_id,
        order_gallery,
      },
      success: res => {
        wx.hideLoading()
        console.log("提交", res);
        if (res.data.code === "0") {
          wx.showToast({
            title: '提交成功',
          })
          that.setData({
            order_sn: res.data.data.order_sn,
            order_id: res.data.data.order_id
          })
          if (that.data.types ==1){
            if (paytype == "wx") {
              wxpay.wxpay(app, order_amount, res.data.data.order_id, "/pages/tabbar/order/index?order_status=2");
            } else if (paytype == "paynow") {
              wx.navigateTo({
                url: '/pages/paynow/to-paynow/index?order_sn=' + res.data.data.order_sn + "&order_id=" + res.data.data.order_id,
              })
            }
          }else{
            wx.navigateTo({
              url: '/pages/order/finish-details/index?orderId=' + res.data.data.order_id+ "&type=" +  that.data.type+ "&end_time=" + res.data.data.end_time
            })
          }
   
          // wx.switchTab({
          //   url: '/pages/tabbar/order/index',
          // })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "none"
          })
        }
      }
    })

  },
  addFormat: function () {
    this.data.items.push({
     order_num:""
    });
    this.setData({
      items: this.data.items,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  search:function(res){
    console.log(res.detail.value.length * 25 + "rpx")
      this.setData({
        width: res.detail.value.length <=2 ? "50rpx" : 50 + (res.detail.value.length-2)*25 +  "rpx"
      })
  },
  onReady: function() {
    var totalSecond = 1296000;
    console.log(totalSecond)
    var interval = setInterval(function() {
      // 秒数
      var second = totalSecond;

      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(intervals);
        wx.showToast({
          title: '活动已结束',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  del:function(e){
      console.log("e",e)
    var index = e.currentTarget.dataset.index
    this.data.imgPath.splice(index,1)
    this.setData({
      imgPath:this.data.imgPath
    })
  },
  clickUp: function () {
    var clickUpthis = this;
    if (clickUpthis.data.imgPath.length > 9) {
      wx.showToast({
        title: '截图数量最大为9！',
        icon: "none"
      })
      return;
    }
    progressNum=0
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("本地图片地址", res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // clickUpthis.data.imgSrc = tempFilePaths;
        console.log("tempFilePaths", tempFilePaths)
        // clickUpthis.setData({
        //   imgPath: tempFilePaths
        // })
        if (clickUpthis.data.imgPath.length + tempFilePaths.length  > 9) {
          wx.showToast({
            title: '截图数量最大为9！',
            icon: "none"
          })
          return;
        }
        console.log(1111111)
        var num = tempFilePaths.length;
        var i =0
        var progressNum =0
        wx.showLoading({
          title: '努力上传中',
        })

        clickUpthis.file(i, tempFilePaths, num, progressNum)
      }
      ,
      fail: function () {
        wx.hideLoading()
      }
    })
    
  },

  file: function (i, tempFilePaths, num, progressNum){
  var that =this
  wx.uploadFile({
    url: 'https://lmbge.com/wxapi/tuangou/upload',

    filePath: tempFilePaths[i] + '',
    name: 'file',
    header: {
      'Accept': 'application/json'
    },
    success: function (res) {
      console.log("背景图", res)
      var resData = JSON.parse(res.data.trim())
      console.log("背景图", resData)
      if (resData.code == 0) {
        if (i > num) {
          i = 10
          console.log("11", i, "0000", num)
        } else {
          i++
        }

        console.log("progressNum", progressNum)
        wx.hideLoading()
        console.log(11111111111)
            // that.setData({
     
        that.data.imgPath.push(resData.data.pic_url)
        that.setData({
          imgPath: that.data.imgPath
        })
        //当进度条为100时清除定时任务
        // var fuck = that.file(i, tempFilePaths, num, progressNum)
        // console.log("fuck", fuck)
        if(i=10){
          console.log("progressNum", progressNum)
          var timer = setInterval(function () {
            console.log(progressNum)
            console.log("num", num)

            console.log("progressNum", progressNum)

            progressNum += Math.ceil(100 / num);

            console.log("progressNum", progressNum)
            //并且把当前的进度值设置到progress中
            that.setData({
              progress: progressNum
            })

          }, 1000)
          // })
          that.file(i, tempFilePaths, num, progressNum)

        }
          if (progressNum >= 100) {
            console.log(33333)

            clearInterval(timer)
          }

        

        console.log("imgPath", that.data.imgPath)
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  toPay: function(e) {
    wx.navigateTo({
      url: '/pages/finish-details/index?type=' + this.data.types,
    })
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
//接口报错
showError:function(){
  wx.showLoading({
    title: '接口返回错误',
    icon:"none"
  })
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
  onShareAppMessage: function() {

  }
})