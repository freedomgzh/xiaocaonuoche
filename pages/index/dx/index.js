// pages/index/dx/index.js
var url = require("../../../config.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  data: {
    region: [],
    picURL:[]
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
  chepai: function (e) {
    this.setData({
      chepai: e.detail.value
    })
  },

  apply: function () {
    var name = this.data.name;
    var phone = this.data.phone;
    var chepai = this.data.chepai;
    var region = this.data.region;
    var picURL = this.data.picURL;




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
    if (!chepai || chepai.match(/^[ ]*$/)) {
      wx.showToast({
        title: '请输入车牌号',
        icon: "none"
      })
      return
    }
    // if (!picURL.length) {
    //   wx.showToast({
    //     title: '请上传图片',
    //     icon: "none"
    //   })
    //   return
    // }
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

  fuck: function (moren) {
    wx.request({
      url: url.tongzhi,
      data: {
        name: this.data.name,
        mobile: this.data.phone,
        chepai: this.data.chepai,
        img: this.data.picURL,
        sheng: this.data.region[0],
        shi: this.data.region[1],
        qu: this.data.region[2],
        id: this.data.id,
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '上传成功，等待审核',
          })
        wx.navigateTo({
          url: '/pages/index/call/index?id=' + this.data.id,
        })
        }
      }

    })
  },
  upImg: function () {
    var that = this;
    if(that.data.picURL.length==5){
          wx.showToast({
            title: '超过限制',
          })
          return
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.data.imgSrc = tempFilePaths;
        console.log('tempFilePaths', tempFilePaths);
        that.setData({
          imgPath: that.data.imgSrc
        })

        wx.showLoading({
          title: '上传中',
        })
        wx.getStorage({
          key: 'user_id',
          success: function (res) {
            console.log("传图user_id=" + res.data)
            wx.uploadFile({
              url: 'https://xiaocaonuoche.com/wxapi/nuoche/upload',
              filePath: that.data.imgPath + "",
              name: 'file',
              header: {
                'Accept': 'application/json'
              },
              success: function (res) {
                var resData = JSON.parse(res.data.trim())
                console.log('上传商品图片res.data.pic_url', resData.data.pic_url)

                if (resData.code == 0) {
                  wx.showToast({
                    title: '图片上传成功',
                  })
                  wx.hideLoading()
                  var picURLs = resData.data.pic_url;
                  var picURL = that.data.picURL;
                  picURL.push(picURLs);
                  that.setData({
                    picURL: picURL
                  })
                  wx.setStorageSync('goods_picURL', picURLs);
                  console.log('picURL', that.data.picURL);
                } else {
                  wx.hideLoading()
                  wx.showModal({
                    content: resData.message,
                    success: function (res) {
                      if (res.confirm) {

                      } else if (res.cancel) {

                      }
                    }
                  })
                }
              }
            })
          },
          fail: function (res) {
            wx.hideLoading()
            console.log(res.data)
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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