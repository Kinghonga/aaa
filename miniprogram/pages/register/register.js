 const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Idpicker: ['成员', '组长','部长','主席'],
    Gradepicker:['2016','2017','2018','2019'],
    position:'',
    grade:'',
    realName:'',
    index:'',
    index2:''
  },

  realName:function(e){
      this.setData({
        realName:e.detail.value
      })
      console.log(this.data.realName)
  },
  PickerIdChange(e){
    // console.log(e.detail.value);
    this.setData({
      index: e.detail.value
    })
    // console.log(this.data.Idpicker[this.data.index])
    this.setData({
      position: this.data.Idpicker[this.data.index]
    })
  },
  PickerGradeChange(e){
    // console.log(e.detail.value);
    this.setData({
      index2: e.detail.value
    })
    // console.log(this.data.Gradepicker[this.data.index2])
    this.setData({
      grade: this.data.Gradepicker[this.data.index2]
    })
  },

  formSubmit: function (e) {

    if(this.data.realName==''){
        wx.showToast({
          title: '请填入真实姓名',
          icon:'none'
        })
    }
    if (this.data.position==''){
      console.log(this.data.Idpicker[0])
          this.setData({
            position: this.data.Idpicker[0]
          })
    }
    if (this.data.grade==''){
      console.log(this.data.Gradepicker[0])
      this.setData({
        grade: this.data.Gradepicker[0]
      })
    }

    if(this.data.grade!=''&&this.data.position!=''
    &&this.data.realName!='')
    {
            wx.showLoading({
              title: '提交中',
            })
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000
              })
            }, 2000)
            // console.log(e.detail.value)
            //写入数据
      
            var that = this
      console.log(that.data.position)
            db.collection('User').doc(app.userdata.openid).update({
              // data 传入需要局部更新的数据
              data: {
                position: that.data.position,
                grade: that.data.grade,
                realName: that.data.realName,
              },
              success: function (res) {
                console.log(res)
                //返回上一层页面
                wx.navigateBack({
                  delta: 1,
                })
              },
              fail:function(err){
                console.log("数据提交失败！")
              }

            })

    }else{
      wx.showToast({
        title: '请填入正确信息',
        icon: 'none'
      })
    }
}


})