// pages/quite/index/index.js
var url  =require("../../../config.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showA:true,
    showB:false
  },
xiangdui:function(){
var that =this
      wx.request({
        url: url.xdmdr,
        data: {
          user_id: app.globalData.userId,
          duanxinfei:that.data.feiyong,
          chepaihao: that.data.chepaihao,

        },
        success: function (res) {
          console.log("下单", res)
          wx.hideLoading()
          if (res.data.code == 0) {
   

    that.getUserInfo();
        } else {
          // that.showError();
        }
      }
    })

},
  select:function(e){
    console.log(e)
    if (e.currentTarget.dataset.id==1){
      this.setData({
        showA: false,
        showB: !this.data.showB
      })

    }else {
      this.setData({
        showA: !this.data.showA,
        showB: false
      })

    }

  },

guanbi:function(){
  var that =this;
  wx.request({
    url: url.gxmdr,
    data:{
      user_id:app.globalData.userId
    },
    success:function(res){
      that.getUserInfo()
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
      this.getUserInfo()
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
          console.log(res)
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
      console.log("userinfo",res)
      this.setData({
        had:res.data.data.duanxinfei,
        chepaihao:res.data.data.chepaihao
      })
      if(res.data.code==0){
        if (res.data.data.miandarao==1){
          this.setData({
            ra:true,
            ab:false,
          })
        } else if (res.data.data.miandarao==2){
          this.setData({
            ab: true,
            ra:false
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
guan:function(){
  var that =this;
  wx.request({
    url:url.gxmdr,
    data:{
      user_id:app.globalData.userId,
    },
    success:(res)=>{
      that.getUserInfo()
    }
  })
},
  switch1Change(e) {
    var that =this;
    if (e.detail.value){
      that.juedui()
    }
    else{
      that.guan();
    }
  },
  switch2Change(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var that =this;
    console.log(this.data.had)
    if (!this.data.had && e.detail.value){
      wx.showModal({
        title: '提示',
        content: '开通免打扰需要交付2.00元每年短信费',
        confirmText:"确定",
       cancelText:"取消" ,
       success:(res)=>{
         if (res.cancel) {
           //点击取消,默认隐藏弹框
         } else {
           //点击确定
            wx.navigateTo({
              url: '/pages/carNumber/index/index?money=' + that.data.feiyong,
            })
         }

       }
      })
    } else if (this.data.had && e.detail.value){
      that.xiangdui()
    } else if (this.data.had && !e.detail.value){
      that.guanbi()
    }

    if (e.detail.value){
          this.setData({
            show:true
          })
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