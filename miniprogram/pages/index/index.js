var util =require('../../utils/util.js')
const app =getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localLatitude: '',
    localLongitude: '',
    juli: '',
    time:'',  //时间
    week:'', //星期几
    realName:''
  },


  //距离计算
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s
    console.log("计算结果千米", s)

  },

  onGotUserInfo:function(e){
    //把用户信息赋值到全局js
    app.userdata.avatarUrl=e.detail.userInfo.avatarUrl
    app.userdata.nickName =e.detail.userInfo.nickName
    // wx.setStorageSync('nickName', app.userdata.nickName)
    // wx.setStorageSync('avatarUrl', app.userdata.avatarUrl)
  },


  onLoad: function () {
   
    //距离签到位置判断
    var that = this
    wx.getLocation({
      type: 'gcj02 ',
      altitude: true,
      success(res) {
        that.setData({ localLatitude: res.latitude })
        that.setData({ localLongitude: res.longitude })
        console.log("经度:" + that.data.localLongitude)
        console.log("纬度:" + that.data.localLatitude)
        console.log(res)
      var jl = that.distance(that.data.localLongitude, that.data.localLatitude, 113.16939544677734, 23.430904388427734)
        that.setData({ juli: jl })
        app.userdata.juli=that.data.juli
        console.log(that.data.juli)
      }
    })

    wx.cloud.init({
      env: 'joseph - 84dzw'
    })



  },


  signinClick:function()
  {
      

    var there = this

    //判断是否存在此用户
    db.collection('User').where({
      _openid: app.userdata.openid
    })
      .get({
            success: function (res) {
              // console.log(res.data.length)
              if (res.data.length==0){
                //若无此用户  则写入数据库
                db.collection('User').add({
                  data: {
                    _id: app.userdata.openid,
                    nickName: app.userdata.nickName,
                    realName: '',
                    grade: '',
                    position: ''
                  }
                })
                  .then(res => {
                    console.log(res)
                  })
              }
            },
            fail:function(err){}
        })




    //判断是否已完善个人信息
    db.collection('User').where({
      _openid: app.userdata.openid
    })
      .get({
        success: function (res) {
          if (res.data[0].grade == '' || res.data[0].position == ''
            || res.data[0].realName == '') {
            wx.showModal({
              title: '请先完善个人信息',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/register/register',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        },
        fail: function (err) { }
      })


    //成功后获取真实姓名
    db.collection('User').where({
      _openid: app.userdata.openid
    }).get({
      success: function (res) {
        app.userdata.realName = res.data[0].realName
        console.log(app.userdata.realName)
        if (res.data[0].realName!='')
        {
          wx.getSetting({
            success: res => {
              //判断是否启用地理接口和授权用户信息
              if (res.authSetting['scope.userLocation']) {
                console.log(there.data.juli)
                if (there.data.juli < 0.2) {
                  console.log(there.data.juli)
                  wx.showLoading({
                    title: '签到中',
                  })
                  setTimeout(function () {
                    wx.hideLoading()
                    wx.showToast({
                      title: '签到成功',
                      icon: 'success',
                      duration: 1000
                    })
                  }, 2000)
                  //成功后把数据写入数据库
                  //获取时间
                  let timetest = util.formatDate(new Date());
                  let date = util.getDates(1, timetest);

                  var time2 = util.nowtime()

                  //获取第一天时间  最多获取七天
                  there.setData({ time: time2 })
                  there.setData({ week: date[0].week })
                  console.log(date);
                  db.collection('zb_table').add({
                    data: {
                      _id2:'',
                      time: there.data.time,
                      nickName: app.userdata.nickName,
                      realName: app.userdata.realName,
                      openid: app.userdata.openid,
                      week: there.data.week,
                    }
                  })
                    .then(res => {
                      console.log(res)
                    })
                } else {
                  wx.showToast({
                    title: '签到失败',
                    icon: 'none',
                    duration: 1000
                  })
                }

              } else {
                wx.showModal
                ({
                  title: '获取位置失败',
                  content: '是否开启定位',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success(res) {
                          console.log(res.authSetting)
                          res.authSetting = {
                            //   "scope.userInfo": true,
                            "scope.userLocation": true
                          }
                        }
                      })
                    } else if (res.cancel) { }
                  }
                })
              }
            }
          })
        } else {console.log("真实姓名为空")}
      }
    })
  }
})