// pages/adddizhi/edit/index.js
var util = require("../../../utils/util.js")
var url = require("../../../config.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: []
  },
  toAdd: function () {

    var that = this
    if (!that.data.mobile) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    if (this.checkPhone(that.data.mobile)) {
      that.fuck(that)

    }
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  addressDetail: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  getList: function () {
    var that = this;
    wx.request({
      url: url.dizhi,
      data: {
        user_id: app.globalData.userId
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            list: res.data.data
          })
          var data = res.data.data
          for (var i = 0; i < data.length; i++) {
            if (data[i].address_id == that.data.address_id) {
              var region = []



              region[0] = data[i].sheng
              region[1] = data[i].shi
              region[2] = data[i].qu
              that.setData({
                detail: data[i],
                mobile: data[i].mobile,
                region: region,
                address: data[i].address,
                name:data[i].consignee
              })
              console.log(that.data.region)

              break;
            }
          }

        } 
      }
    })
  },
  fuck: function (that) {
    wx.request({
      url: url.editdizhi,
      data: {
        user_id: app.globalData.userId,
        mobile: that.data.mobile,
        address_id: that.data.address_id,
        sheng: that.data.region[0],
        shi: that.data.region[1],
        qu: that.data.region[2],
        address: that.data.address,
        consignee: that.data.name
      },
      success: (res) => {
        console.log(that.data.region)
        if (res.data.code == 0) {
          var pages = getCurrentPages();//当前页面栈
          var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
          var currPage = pages[pages.length - 1]; // 当前页面，若不对当前页面进行操作，可省去
          beforePage.changeData();//触发父页面中的方法
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  //检查输入的手机号
  checkPhone: function (param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if (phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  search: function (e) {
    this.setData({
      mobile: e.detail.value,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address_id: options.id
    })
    this.getList();
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