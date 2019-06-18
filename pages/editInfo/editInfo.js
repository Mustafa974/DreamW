// pages/editInfo/editInfo.js

const app = getApp()

Page({
  data: {
    // input userInfo
    input: {},

    //gender picker
    genders:['男','女'],
    ages:[18,19,20,21,22,23,24,25,26,27,28,29,30],
  },

  // when pages loads
  onShow: function() {
    var that = this
    that.setData({
      input: app.globalData.userInfo
    })
  },

  // page functions

  // modify info
  changeInfo: function(e) {
    console.log("获取的事件信息：", e)
    var that = this
    console.log("表单信息：", app.globalData.openId, that.data.input)
    // 判断表单信息是否完善
    if (that.data.input.name != '' && that.data.input.gender != '' && that.data.input.age != ''  && that.data.input.selfInfo != '') {
      console.log(app.globalData.openId)
      console.log(that.data.input)
      var gender = "female"
      // app.globalData.userInfo = that.data.input
      if(that.data.input.gender=="男"){
        gender = "male"
      }
      wx.request({
        url: 'http://47.101.148.55:1234/updateUserInfo',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          'wechat_id': app.globalData.openId,
          'name': that.data.input.name,
          'gender': gender,
          'age': that.data.input.age,
          'description': that.data.input.selfInfo
        },
        success: res => {
          console.log("successfully update");
          app.globalData.userInfo.name = that.data.input.name
          app.globalData.userInfo.gender = that.data.input.gender
          app.globalData.userInfo.age = that.data.input.age
          app.globalData.userInfo.selfInfo = that.data.input.selfInfo
          wx.showToast({
            title: '修改信息成功',
            icon: 'success',
            duration: 1300
          });
        }
      });
    } 
    else {
      wx.showToast({
        title: '请完善信息哦',
        icon: 'none',
        duration: 1300
      });
      console.log("信息不完善")
    }
  },

  // onChanges
  onChange01: function(e) {
    this.setData({
      'input.name': e.detail
    })
  },

  onChange02: function(e) {
    this.setData({
      'input.gender': this.data.genders[e.detail.value]
    })
  },

  onChange03: function (e) {
    this.setData({
      'input.age': this.data.ages[e.detail.value]
    })
  },

  onChange04: function(e) {
    this.setData({
      'input.phone': e.detail
    })
  },

  onChange05: function (e) {
    this.setData({
      'input.email': e.detail
    })
  },

  onChange06: function (e) {
    this.setData({
      'input.selfInfo': e.detail
    })
  },
  
})