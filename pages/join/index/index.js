// pages/join/index/index.js
var url = require("../../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressDetail: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  suggest: function (e) {
    this.setData({
      suggest: e.detail.value
    })
  },
apply:function(){
  var name = this.data.name;
  var phone = this.data.phone;
  var address = this.data.address;
  var region = this.data.region;
  var suggest = this.data.suggest;



  if (!name || name.match(/^[ ]*$/)) {
    wx.showToast({
      title: '请输入姓名',
      icon: "none"
    })
    return
  }

  if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
    wx.showToast({
      title: '电话输入错误',
      icon: "none"
    })
    return
  }
  if (!region.length) {
    wx.showToast({
      title: '请选择城区',
      icon: "none"
    })
    return
  }

  if (!address || address.match(/^[ ]*$/)) {
    wx.showToast({
      title: '请输入地址',
      icon: "none"
    })
    return
  }
  var that = this
  wx.showLoading({
    title: '正在申请中',
  })
  wx.request({
    url: url.sqdl,
    data:{
      name:name,
      mobile:phone,
      address:address,
      content: suggest,
      sheng:region[0],
      shi: region[1],
      qu: region[2],
    },
    success:(res)=>{
      wx.hideLoading()
      console.log(res)
      if(res.data.code==0){
        wx.showToast({
          title: '申请成功',
        })
        wx.switchTab({
          url: '/pages/tabbar/index/index',
        })
      }
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})