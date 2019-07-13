// pages/userMessage/userMessage.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
        nickName:'',
        realName:'',
        grade:'',
        position:''
  },

  onLoad: function (options) {

    var that =this
      //读取数据
    db.collection('User').where({
      _openid: app.userdata.openid
    })
      .get({
        success: function (res) {
          //赋值并显示数据到页面
          console.log(res.data)
          that.setData({
            nickName: res.data[0].nickName,
            realName: res.data[0].realName,
            grade: res.data[0].grade,
            position: res.data[0].position
          })

        },
        fail: function (err) {
        }
      })
  },
  onShow: function () {
    this.onLoad();
  }

})