// pages/optionMessage/optionMessage.js
Page({

  data: {
    textareaAValue:''
  },

textareaAInput(e) 
{
    this.setData({
        textareaAValue: e.detail.value
      })
      console.log(this.data.textareaAValue)
},
  formSubmit: function (e) {
    if(this.data.textareaAValue==''){
        wx.showToast({
          title: '提交内容不能为空',
          icon:'none',
        })
      }else
      {
            wx.showLoading({
              title: '提交中',
            })
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
            }, 2000)

                wx.switchTab({
                  url: '../../pages/user/user',
                })
      }
    //处理提交数据逻辑

    
  },



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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})