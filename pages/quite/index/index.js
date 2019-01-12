// pages/quite/index/index.js
var url  =require("../../../config.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// xiangdui:function(){
//   wx.request({
//     url:url.xdmdr,
//     data:{
//       user_id:app.globalData.userId,
//       chepaihao:

//     }
//   })
// },
guanbi:function(){
  var that =this;
  wx.request({
    url: url.gxmdr,
    data:{
      user_id:app.globalData.userId
    },
    success:function(res){

    },
  })
},
  juedui: function () {
    wx.request({
      url: url.jdmdr,
      data: {
        user_id: app.globalData.userId,
    },
    success:(res)=>{
        console.log(res)
    }
    })
  },
  getduanxinfei:function(){
    wx.request({
      url: url.duanxinfei,
      data:{

      },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            feiyong:res.data.data
          })
        }else{
          wx.showToast({
            title: '数据错误',
          })
        }
      }
    })
  },
getUserInfo:function(){
  var that =this;
  wx.request({
    url:url.userinfo,
    data:{
      user_id:app.globalData.userId
    },
    success:(res)=>{
      console.log(res)
      if(res.data.code==0){
        if (res.data.data.miandarao==1){
          this.setData({
            ra:true
          })
        } else if (res.data.data.miandarao==2){
          this.setData({
            ab: true
          })
        }else{
          this.setData({
            ab: false,
            ra:false
          })
        }
  
      }
    }
  })
},

  switch1Change(e) {
    var that =this;
    if (e.detail.value){
      that.juedui()
    }
    else{
      that.userinfo();
    }
  },
  switch2Change(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    wx.showModal({
      title: '提示',
      content: '',
    })
    if (e.detail.value){

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getUserInfo()
    this.getduanxinfei()
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