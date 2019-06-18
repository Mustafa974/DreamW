// pages/main/main.js

//获取应用实例
const app = getApp()

Page({
  // initial datas
  data: {

    // select
    selectOrder: '筛选方式 ▼',
    show: 0,
    index: 0,

    // 我的团队
    groupInfo:[],
    // 所有团队
    groups:[],

  },

  //  pages functions
  onShow: function(options) {
    var that = this
    wx.request({
      url: 'http://47.101.148.55:1234/getUserClasses',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        'wechat_id': app.globalData.openId
      },
      success: res => {
        console.log("get user classes");
        if (res.statusCode == 200) {
          console.log("success")
          if (res.data){
            var list = []
            console.log(res.data)
            for(var idx in res.data){
              var info = {}
              var data = res.data[idx]
              info.id = data.id
              info.name = data.name
              if(data.label.length==0){
                console.log("班级无标签")
                info.label = "无"
              }
              else{
                info.label = data.label
              }
              info.leaderId = data.leaderId
              info.leaderName = data.leaderName
              info.memberNum = data.memberNum
              info.startTime = data.startTime.substring(0,10)
              var i = parseInt(idx)+1
              info.picUrl = '../../assets/logo/'+i+'.png'
              list.push(info)
            }
            console.log(list)
            that.setData({
              groupInfo: list
              // groups: app.globalData.groups
            })
          }
          else{
            console.log("failed")
            wx.showToast({
              title: '没有用户团队数据',
              icon: 'success',
              duration: 1300
            });
          }
        }
        else {
          console.log("No Get User Classes Status")
          wx.showToast({
            title: '请求用户团队数据失败',
            icon: 'success',
            duration: 1300
          });
        }
      }
    })
    wx.request({
      url: 'http://47.101.148.55:1234/getAllClasses',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
      },
      success: res => {
        console.log("get all classes");
        if (res.statusCode == 200) {
          console.log("success")
          if (res.data) {
            var list = []
            console.log(res.data)
            for (var idx in res.data) {
              var info = {}
              var data = res.data[idx]
              info.id = data.id
              info.name = data.name
              if (data.label.length == 0) {
                console.log("班级无标签")
                info.label = "无"
              }
              else {
                info.label = data.label
              }
              info.leaderId = data.leaderId
              info.leaderName = data.leaderName
              info.memberNum = data.memberNum
              info.startTime = data.startTime.substring(0, 10)
              var i = 9 - parseInt(idx)
              info.picUrl = '../../assets/logo/' + i + '.png'
              list.push(info)
            }
            console.log(list)
            that.setData({
              groups: list
            })
          }
          else {
            console.log("failed")
            wx.showToast({
              title: '没有全局团队数据',
              icon: 'success',
              duration: 1300
            });
          }
        }
        else {
          console.log("No Get User Classes Status")
          wx.showToast({
            title: '请求全局团队数据失败',
            icon: 'success',
            duration: 1300
          });
        }
      }
    })
  },

  // wxml functions end
})