//用户再次授权页面
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:''
  },

  //点击授权
  onGotUserInfo:function(e){
    //把用户信息赋值到全局js
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    console.log(this.data.nickName)
    app.userdata.nickName=this.data.nickName
    app.userdata.avatarUrl = this.data.avatarUrl
    // wx.setStorageSync('nickName', app.userdata.nickName)
    // wx.setStorageSync('avatarUrl', app.userdata.avatarUrl)



  //解决页面跳转数据不刷新问题
    wx.switchTab({
      url: '../../pages/user/user',
      success:function(e){
        var page =getCurrentPages().pop();
        if(page==undefined || page ==null)
        return;
        page.onLoad();
      }
    })
  },
 
  onLoad: function (options) {
  },

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