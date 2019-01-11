// pages/adddizhi/index/index.js
var url = require("../../../config.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[]
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

  apply: function () {
    var name = this.data.name;
    var phone = this.data.phone;
    var address = this.data.address;
    var region = this.data.region;



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
    that.fuck();
    // wx.showModal({
    //   title: '提示',
    //   content: '是否将地址设置为默认',
    //   showCancel:true,
    //   cancelText:"确定",
    //   confirmText:"取消",
    //   success:function(res){
    //     if (res.confirm) {
    //       that.fuck(1)
    //     } else if (res.cancel) {
    //       that.fuck(0)
    //     }
    //   },
    // })
    
  },

  fuck:function(moren){
    wx.request({
      url: url.adddizhi,
      data: {
        consignee: this.data.name,
        mobile: this.data.phone,
        address: this.data.address,
        sheng: this.data.region[0],
        shi: this.data.region[1],
        qu: this.data.region[2],
        user_id: app.globalData.userId,
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '添加成功成功',
          })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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