// pages/history/history.js 
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    //入队申请
    ordersInfo: [],
    //发帖申请
    orderList0: [],
    //上传申请
    orderList1: [],

    orderId: 0,
    show01: false,
    show02: false,
  },

  //load group list
  onShow:function(e){
    var that = this
    wx.request({
      url: 'http://47.101.148.55:1234/getAllArticle',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        'wechat_id': app.globalData.openId
      },
      success: res => {
        console.log("get all articles");
        if (res.statusCode == 200) {
          // 如果用户已经完成注册，设置已登陆标识
          if (res.data) {
            console.log(res.data)
            var list = []
            for (var idx in res.data) {
              var info = {}
              var data = res.data[idx]
              info.appliId = idx
              info.aid = data.articleInfo.id
              info.time = data.articleInfo.time.substring(0, 10) + ' ' + data.articleInfo.time.substring(11, 19)
              var articleInfo = {}
              articleInfo.id = data.articleInfo.classId
              articleInfo.title = data.articleInfo.title
              articleInfo.type = data.articleInfo.type
              articleInfo.url = "http://" + data.articleInfo.content
              var i = parseInt(idx) + 1
              articleInfo.picUrl = '../../assets/logo/' + i + '.png'
              info.articleInfo = articleInfo
              var userInfo = {}
              userInfo.id = data.user.id
              userInfo.name = data.userInfo.name
              if (data.userInfo.gender == "female") {
                userInfo.gender = "女"
              }
              else {
                userInfo.gender = "男"
              }
              userInfo.age = data.userInfo.age
              userInfo.phone = data.user.phone
              userInfo.email = data.user.email
              userInfo.selfInfo = data.userInfo.description
              info.userInfo = userInfo
              list.push(info)
            }
            console.log(list)
            that.setData({
              ordersInfo: list
            })
          }
          else {
            console.log("No loginStatus")
            wx.getUserInfo({
              success(res) {
                console.log("获取信息：", res.userInfo)
                // 储存用户头像
                app.globalData.avatarUrl = res.userInfo.avatarUrl
              }
            })
          }
        }
        else {
          console.log("获取发帖申请信息请求失败！错误状态码：" + res.statusCode)
        }
      }
    })
    wx.request({
      url: 'http://47.101.148.55:1234/getArticlesToConfirm',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        'wechat_id': app.globalData.openId
      },
      success: res => {
        console.log("get article request info");
        if (res.statusCode == 200) {
          // 如果用户已经完成注册，设置已登陆标识
          if (res.data) {
            console.log(res.data)
            var list = []
            for (var idx in res.data) {
              var info = {}
              var data = res.data[idx]
              info.appliId = idx
              info.aid = data.articleInfo.id
              info.type = 1
              info.time = data.articleInfo.time.substring(0, 10) + ' ' + data.articleInfo.time.substring(11, 19)
              var articleInfo = {}
              articleInfo.id = data.articleInfo.classId
              articleInfo.title = data.articleInfo.title
              articleInfo.type = data.articleInfo.type
              articleInfo.url = "http://"+data.articleInfo.content
              var i = parseInt(idx) + 1
              articleInfo.picUrl = '../../assets/logo/' + i + '.png'
              info.articleInfo = articleInfo
              var userInfo = {}
              userInfo.id = data.user.id
              userInfo.name = data.userInfo.name
              if (data.userInfo.gender == "female") {
                userInfo.gender = "女"
              }
              else {
                userInfo.gender = "男"
              }
              userInfo.age = data.userInfo.age
              userInfo.phone = data.user.phone
              userInfo.email = data.user.email
              userInfo.selfInfo = data.userInfo.description
              info.userInfo = userInfo
              list.push(info)
            }
            console.log(list)
            that.setData({
              orderList0: list
            })
          }
          else {
            console.log("No loginStatus")
            wx.getUserInfo({
              success(res) {
                console.log("获取信息：", res.userInfo)
                // 储存用户头像
                app.globalData.avatarUrl = res.userInfo.avatarUrl
              }
            })
          }
        }
        else {
          console.log("获取发帖申请信息请求失败！错误状态码：" + res.statusCode)
        }
      }
    })
  },

  //jump to article
  toAriticle:function(e) {
    console.log("to article")
    var that = this
    var url = e.target.dataset.id
    console.log(e.target.dataset)
    var data = JSON.stringify(url)
    wx.navigateTo({
      url: '../ariticle/ariticle?data='+data,
    })
  },

  //pass application
  passApplication:function(e){
    var that = this
    var id = e.target.dataset.id
    var type = e.target.dataset.type
    // 获取要删除数据的id 
    console.log(id)
    console.log(type)
    wx.showModal({
      title: '提示',
      content: '是否确认通过该申请？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://47.101.148.55:1234/confirmArticle',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              'aid': id
            },
            success: res => {
              console.log("confirm article");
              if (res.statusCode == 200) {
                // 如果用户已经完成注册，设置已登陆标识
                if (res.data) {
                  console.log(res.data)
                  if(res.data=="success"){
                    wx.showToast({
                      title: '通过申请成功',
                      icon: 'success',
                      duration: 1300
                    });
                    var list = []
                    var index = 0
                    // 删除数组对应的数据内容 
                    if (type == 0) {
                      list = that.data.ordersInfo
                      for (var i = 0; i < list.length; i++) {
                        if (list[i] == id) {
                          index = i
                          break
                        }
                      }
                      list.splice(index, 1)
                      console.log(list)
                      that.setData({
                        ordersInfo: list
                      })
                      that.onShow()
                    }
                    else if (type == 1) {
                      list = that.data.orderList0
                      for (var i = 0; i < list.length; i++) {
                        if (list[i] == id) {
                          index = i
                          break
                        }
                      }
                      list.splice(index, 1)
                      console.log(list)
                      that.setData({
                        orderList0: list
                      })
                      that.onShow()
                    }
                    else if (type == 2) {
                      list = that.data.orderList1
                      for (var i = 0; i < list.length; i++) {
                        if (list[i] == id) {
                          index = i
                          break
                        }
                      }
                      list.splice(index, 1)
                      console.log(list)
                      that.setData({
                        orderList1: list
                      })
                      that.onShow()
                    }
                  }
                }
                else {
                  console.log("No network")
                  wx.getUserInfo({
                    success(res) {
                      console.log("获取信息：", res.userInfo)
                      // 储存用户头像
                      app.globalData.avatarUrl = res.userInfo.avatarUrl
                    }
                  })
                }
              }
              else {
                console.log("通过帖子请求失败！错误状态码：" + res.statusCode)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },

  // toPages
  // toPage: function (e) {
  //   var bookid = e.currentTarget.dataset.bookid
  //   console.log(bookid)
  //   wx.navigateTo({
  //     url: '../mainCard/mainCard?bookid=' + bookid
  //   })
  // },

})