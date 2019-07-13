const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
  },


  onLoad: function (options) {
    this.setData({
      nickName: app.userdata.nickName,
      avatarUrl: app.userdata.avatarUrl
    })


    // var nickName = wx.getStorageSync('nickName')
    // var avatarUrl = wx.getStorageSync('avatarUrl')
    // this.setData({
    //   nickName: nickName,
    //   avatarUrl: avatarUrl
    // })

    console.log(this.data.nickName)
    console.log(this.data.avatarUrl)

    if (this.data.nickName == '')
    {
      wx.showModal({
        title: '获取用户信息失败',
        content: '是否授权获取',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../pages/login/login',
            })
          }
        }
      })
    }



    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }


  var that =this
    // 获取用户信息
    wx.cloud.init({
      env: 'joseph-84dzw'
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})