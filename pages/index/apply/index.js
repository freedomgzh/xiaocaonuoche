// pages/index/apply/index.js
var url = require("../../../config.js");
var wxpay = require('../../../utils/pay.js');

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
num:1,
  },
  getPrice:function(){
    wx.request({
      url: url.jiage,
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          this.setData({
            price: res.data.data
          })
        }else{
          wx.showToast({
            title: '接口错误',
            icon:"none"
          })
        }
     
      }
    })
  },
  increase:function(){
    var num = this.data.num;
    num ++
    this.setData({
      num:num,
      price: num * 18

    })
  },
  reduce: function () {
    var num = this.data.num;
    num--
    if(num == 0)
    return
    this.setData({
      num: num,
      price:num *18
    })
  },
  nameInput:function(e){
      this.setData({
        name: e.detail.value
      })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //buy
  toBuy:function(){
    //组建信息
    var price = this.data.price;
    var name = this.data.name;
    var phone  = this.data.phone;
    var address= this.data.address;

    if (!name || name.match(/^[ ]*$/)){
    wx.showToast({
      title: '请输入姓名',
      icon:"none"
    })
    return
  }

  if(!phone){
    wx.showToast({
      title: '请输入电话',
      icon:"none"
    })
    return
  }

    if (!address || address.match(/^[ ]*$/)){
      wx.showToast({
        title: '请输入地址',
        icon:"none"
      })
      return
    }
    var that =this
    wx.showLoading({
      title: '正在生成订单',
    })
    that.create(price, name, phone, address, that)

    // wx.request({
    //   url: url.getQRCode,
    //   data:{
    //     user_id:app.globalData.userId,
    //     path:"pages/index/call",
    //     mobile:phone
    //   },
    //   success:(res)=>{
    //     console.log("erweima",res)
    //     if(res.data.code==0){
    //       console.log(res.data.data.id)
    //       that.create(price, name, phone, address, res.data.data.id,that)
    //     }else{
    //       that.showError()
    //     }
    //   }
    // })

    
  },
showError:function(){
  wx.showToast({
    title: '接口错误',
    icon:"none"
  })
},
  //提交订单
  create: function (price, name, phone, address,that){
    wx.request({
      url: url.order,
      data: {
        user_id: app.globalData.userId,
        order_amount: price,
        consignee: name,
        mobile: phone,
        address: address,
        // qrcode_id: qrcode_id,
        content:"二维码挪车码*2",
        number:that.data.num
      },
      success: function (res) {
        console.log("下单", res)
        wx.hideLoading()
        if(res.data.code==0){
          wxpay.wxpay(app, 0, res.data.data.id, "/pages/tabbar/order/index?order_status=2");

          // wx.navigateTo({
          //   url: '/pages/tabbar/order/index',
          // })
        }else{
          that.showError();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPrice()
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