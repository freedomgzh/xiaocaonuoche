// pages/mPhone/index/index.js
var url = require("../../../config.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changeData: function () {

    var options = {  }

    this.onLoad(options);//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low

  },
  addPhone:function(){
    wx.navigateTo({
      url: '/pages/addphone/index/index',
    })

  },
  del:function(e){
    console.log(e)
    var that =this
    if (e.currentTarget.dataset.moren==1){
      wx.showToast({
        title: '默认电话能不删除',
        icon:"none"
      })
      return
    }
    wx.request({
      url: url.delshouji,
      data: {
        mobile_id: e.currentTarget.dataset.id
      },
      success:(res)=>{
          console.log(res)
          wx.showToast({
            title: '删除成功',
          })
        that.getList()
      }
    })
  },
  edit:function(){
    wx.navigateTo({
      url: '/pages/addphone/edit/index',
    })
    // wx.request({
    //   url: url.editshouji,
    //   data:{

    //   }
    // })
  },
  selectTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;

    if (index !== "" && index != null) {
      list[parseInt(index)].moren = !list[parseInt(index)].moren;
      console.log(list[parseInt(index)].goods_id)
      this.setData({
        list: this.data.list,
      })

    }
    this.noSelect();
  },
  noSelect: function () {
    this.setData({
      noSelect: true
    })
    var list = this.data.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].moren) {
        this.setData({
          noSelect: false
        })
        break;
      }
    }
  },
  getList:function(){
  var that =this;
  wx.request({
    url: url.shouji,
    data:{
      user_id: app.globalData.userId
    },
    success:(res)=>{
      console.log(res)
      if(res.data.code==0){
      that.setData({
        list:res.data.data
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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