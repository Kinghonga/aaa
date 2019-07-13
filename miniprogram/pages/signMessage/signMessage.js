// pages/signMessage/signMessage.js
const app =getApp()
const db = wx.cloud.database()
Page({

  data: {
        signMessage:{},
        text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
{
var that =this
    db.collection('zb_table').where({
      _openid: app.userdata.openid
    }).get({
      success: function (res) {
        console.log(res)
        if (res.data.length==0){
          that.setData({
            text:'暂无签到记录喔~'
          })
        }
      
        //数组按最新的排序 因为查询只返回20条
        var newArray= res.data
        var s = "";
        for (var i = 1; i < newArray.length; i++) {
          for (var j = i; j > 0; j--) {
              s = newArray[j];
              newArray[j] = newArray[j - 1];
              newArray[j - 1] = s;
          }
        }
        
        //排序后赋值
        that.setData({
          signMessage: newArray
          })
      },
      fail: function (err) {}
    })
},



})