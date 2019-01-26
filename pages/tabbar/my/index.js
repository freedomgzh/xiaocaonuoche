// pages/my/index.js
const app= getApp();
var url =require("../../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    menulist: [
      {
        imgPath: '/images/order.png',
        text: '我的订单',
        url: "/pages/tabbar/order/index"
      },
      {
        imgPath: '/images/quite.png',
        text: '勿扰模式',
        url: "/pages/quite/index/index"
      },
      {
        imgPath: '/images/phone.png',
        text: '管理手机号',
        url: "/pages/mPhone/index/index"
      },
      {
        imgPath: '/images/address.png',
        text: '我的地址',
        url: "/pages/address/index/index"
      },
      {
        imgPath: '/images/quite.png',
        text: '二维码续费',
        url: "/pages/renew/index/index"
      },

    ],
    list:[
      {
        imgPath: '/images/help.png',
        text: '使用说明',
        url: "/pages/help/index/index"
      },
      {
        imgPath: '/images/kefu.png',
        text: '联系客服',
        url: ""
      },
    ]


  },
  join:function(){
    wx.navigateTo({
      url: '/pages/join/index/index',
    })
  },

  makePhone:function(){
    console.log(url)
    wx.request({
      url: url.bindAxn,
      data: {
        Amobile: "17685706085",

      },
      success: (res) => {
        wx.setStorageSync("phone", res.phoneNumber)
        console.log("1111", res)
        if (res.statusCode == 200) {
          wx.makePhoneCall({
            phoneNumber: String(res.data),
          })
        } else {
          wx.showToast({
            title: '号码已用完',
          })
        }
      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

console.log(11111)
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            show:true
          })
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              that.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
              console.log(that.data.userInfo)
            }
          })
        }
      }
    })
    /**
     * 获取用户信息
     */
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log("111",res);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]: res.userInfo.nickName,
    //     })
    //   }
    // })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getfuck:function(){
  var that =this;
  console.log(2222)
  wx.request({
    url: 'https://xiaocaonuoche.com/wxapi/nuoche/userinfo',
    data:{
      user_id: app.globalData.userId
    },
    success:(res)=>{
      if(res.data.code==0){
        that.setData({
          types:res.data.data
        })
        console.log("1223",that.data.types)
        if (!res.data.data.bangding  && that.data.menulist.length==5){
          that.data.menulist.splice(1,1)
          that.data.menulist.splice(3,1)
          that.setData({
            menulist:that.data.menulist
          })
        }
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getfuck();

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