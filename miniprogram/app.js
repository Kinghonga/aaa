//app.js
App({
 
  userdata:{
    avatarUrl: 'dadad', //用户头像路径
    nickName: '',     //用户昵称
    juli:'',        //距离签到地址的距离
    localLatitude:'',
    localLongitude:'',
    openid: '',
    realName:''
  },

  onLaunch: function () {
    
    var that = this

    wx.cloud.init({
      env: 'joseph-84dzw',
      traceUser: true
    })
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'joseph-84dzw',
        traceUser: true,
      })
    }

    // 调用云函数获取oppenid
    wx.cloud.callFunction({
      name: 'login',
      
      success: res => {
        console.log('[云函数] [login] user openid: ', 
        res.result.openid)
        that.userdata.openid = res.result.openid  
        console.log(that.userdata.openid)
        console.log(res)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })


 
  }
})
